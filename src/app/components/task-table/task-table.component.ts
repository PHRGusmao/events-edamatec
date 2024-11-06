import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule, DatePipe } from '@angular/common'; 
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, TaskDetailComponent, FormsModule],
  providers: [DatePipe],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  paginatedTasks: Task[] = [];
  selectedTask: Task | null = null;

  searchQuery: string = '';
  selectedStatus: string = '';

  sortColumn: keyof Task | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private toastService: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.setItemsPerPageBasedOnScreenSize();
    this.getTasks();
  }

  setItemsPerPageBasedOnScreenSize(): void {
    const screenWidth = window.innerWidth;
    this.itemsPerPage = screenWidth < 768 ? 5 : 15;
    this.applyFilters();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
        this.applyFilters();
      },
      error => {
        this.toastService.error('Erro ao carregar tarefas');
      }
    );
  }

  applyFilters(): void {
    const filteredByQueryAndStatus = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedStatus === '' ||
        (this.selectedStatus === 'concluída' && task.status) ||
        (this.selectedStatus === 'em processo' && !task.status))
    );

    this.filteredTasks = filteredByQueryAndStatus;
    this.sortTasks(this.sortColumn);
    this.paginatedTasks = this.getPaginatedTasks(this.filteredTasks);

    this.cdRef.detectChanges();
  }

  getPaginatedTasks(tasks: Task[]): Task[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return tasks.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTasks.length / this.itemsPerPage);
  }

  onSearchQueryChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onStatusChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  sortTasks(column: keyof Task | null): void {
    if (column === this.sortColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    if (this.sortColumn) {
      this.filteredTasks.sort((a, b) => {
        const aValue = a[this.sortColumn!];
        const bValue = b[this.sortColumn!];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          return this.sortDirection === 'asc'
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return this.sortDirection === 'asc'
            ? (aValue === bValue ? 0 : aValue ? 1 : -1)
            : (aValue === bValue ? 0 : aValue ? -1 : 1);
        }

        return 0;
      });
    }

    this.paginatedTasks = this.getPaginatedTasks(this.filteredTasks);
  }

  markAsCompleted(task: Task): void {
    task.status = !task.status;
    this.taskService.updateTask(task).subscribe(
      () => {
        this.toastService.info(task.status ? 'Tarefa marcada como concluída' : 'Tarefa marcada como não concluída');
        this.applyFilters();
        this.cdRef.detectChanges();
      },
      error => {
        this.toastService.error('Erro ao atualizar tarefa');
      }
    );
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.applyFilters();
        this.toastService.success('Tarefa excluída com sucesso');
      },
      error => {
        this.toastService.error('Erro ao excluir tarefa');
      }
    );
  }

  navigate(): void {
    this.router.navigate(['createtask']);
  }

  openDetail(task: Task): void {
    this.selectedTask = task;
  }

  onTaskUpdated(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.applyFilters();
      this.cdRef.detectChanges();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }
}
