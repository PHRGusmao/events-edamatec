import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { TaskTableComponent } from '../../components/task-table/task-table.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewtasks',
  standalone: true,
  imports: [CommonModule, TaskTableComponent],
  templateUrl: './viewtasks.component.html',
  styleUrls: ['./viewtasks.component.scss']
})
export class ViewTasksComponent implements OnInit {
  tasks: Task[] = []; // Armazena as tarefas

  constructor(
    private taskService: TaskService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
  }  

  getTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => this.tasks = data,
      (error) => {
        this.toastService.error('Erro ao carregar tarefas');
        console.error('Erro ao carregar tarefas:', error);
      }
    );
  }

  onTaskCompleted(task: Task): void {
    this.taskService.updateTask(task).subscribe(
      () => {
        this.toastService.success(task.status ? 'Tarefa marcada como concluída' : 'Tarefa desmarcada como concluída');
      },
      (error) => {
        this.toastService.error('Erro ao atualizar tarefa');
        console.error('Erro ao atualizar tarefa:', error);
      }
    );
  }

  onTaskDeleted(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== id); // Remove a tarefa excluída
        this.toastService.success('Tarefa excluída com sucesso');
      },
      (error) => {
        this.toastService.error('Erro ao excluir tarefa');
        console.error('Erro ao excluir tarefa:', error);
      }
    );
  }
}
