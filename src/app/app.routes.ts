import { Routes } from '@angular/router';
import { ViewTasksComponent } from './pages/viewtasks/viewtasks.component';
import { CreatetaskComponent } from './pages/createtask/createtask.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    {
        path: "viewtasks",
        component: ViewTasksComponent
    },
    {
        path: "createtask",
        component: CreatetaskComponent
    },
    {
        path: "home",
        component: HomeComponent
    }
];
