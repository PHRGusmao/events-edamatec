import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToCreateTask(): void {
    this.router.navigate(['/createtask']);
  }

  navigateToViewTasks(): void {
    this.router.navigate(['/viewtasks']);
  }
}
