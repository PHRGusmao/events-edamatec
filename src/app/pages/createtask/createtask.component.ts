import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { Task } from '../../models/task';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createtask',
  standalone: true,
  imports: [TaskFormComponent],
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss']
})
export class CreatetaskComponent {
  constructor(
    private router: Router,
    private taskService: TaskService,
    private toastService: ToastrService
  ) {}

  onTaskSubmit(taskData: Task) {
    this.toastService.info('Enviando a tarefa...', 'Atenção');
    
    console.log(taskData);
    
    this.taskService.createTask(taskData).subscribe(
      (response) => {
        this.toastService.success('Task criada com sucesso');
        this.router.navigate(['viewtasks']);
      },
      (error) => {
        this.toastService.error('Erro ao criar a task');
        console.error('Erro ao criar a task', error);
      }
    );
  }
  
  onNavigate() {
    this.router.navigate(['viewtasks']);
  }
}
