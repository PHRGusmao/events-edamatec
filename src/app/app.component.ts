import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
})
export class AppComponent{ 
  title = 'events-dematec';

  constructor(private router: Router) {}

}
