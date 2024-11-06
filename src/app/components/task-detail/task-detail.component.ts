import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Importando o ToastrService

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  @Output() updateTask = new EventEmitter<Task>();

  constructor(private taskService: TaskService, private toastService: ToastrService) {}

  onClose() {
    this.close.emit(); 
  }

  onSubmit(): void {
    this.taskService.updateTask(this.task).subscribe(
      (updatedTask: Task) => {
        this.updateTask.emit(updatedTask);
        this.toastService.success('Tarefa atualizada com sucesso');
  

        setTimeout(() => {
          this.onClose();
          window.location.reload();
        }, 1500);
      },
      error => {
        this.toastService.error('Erro ao atualizar tarefa');
      }
    );
  }
  
}
