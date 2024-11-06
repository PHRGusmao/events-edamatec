import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task'; // Certifique-se de que você tem o modelo Task no seu projeto

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks'; // URL base para as tarefas

  constructor(private http: HttpClient) {}

  // Método para obter todas as tarefas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Método para atualizar uma tarefa
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  // Método para excluir uma tarefa
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para criar uma nova tarefa
  createTask(task: Task): Observable<Task> {
    // Se 'completion_date' for um objeto Date, converte para string no formato YYYY-MM-DD
    const taskData = {
      ...task,
      completion_date: task.completion_date instanceof Date 
        ? task.completion_date.toISOString().split('T')[0] // Pega a data no formato YYYY-MM-DD
        : task.completion_date
    };

    return this.http.post<Task>(this.apiUrl, taskData);
  }
}
