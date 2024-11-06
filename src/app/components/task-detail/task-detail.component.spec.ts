import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  @Input() task!: Task; // Recebe a tarefa como Input
  @Output() close = new EventEmitter<void>(); // Emite o evento de fechamento
  @Output() updateTask = new EventEmitter<Task>(); // Emite a tarefa atualizada

  constructor(private taskService: TaskService) {}

  // Método para fechar o modal
  onClose() {
    this.close.emit(); // Emite o evento para o componente pai
  }

  // Método para enviar as alterações da tarefa
  onSubmit(): void {
    this.taskService.updateTask(this.task).subscribe(
      (updatedTask: Task) => {
        this.updateTask.emit(updatedTask); // Emite a tarefa atualizada para o componente pai
        console.log('Tarefa atualizada com sucesso');
        this.onClose(); // Fecha o modal após salvar

        // Realiza o reload da página após atualizar
        window.location.reload();  // Isso fará o "reload" da página
      },
      error => console.error('Erro ao atualizar tarefa:', error)
    );
  }
}
