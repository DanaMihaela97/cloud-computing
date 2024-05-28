import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { JobsComponent } from './jobs/jobs.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: "jobs", component: JobsComponent },
    { path: "apply/:id", component: FormComponent },
    {path:"", component: HomeComponent}
  ];