import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { JobsComponent } from './jobs/jobs.component';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: "jobs", component: JobsComponent },
    { path:"filter/:city", component:FilterComponent},
    { path: "apply/:id", component: FormComponent },
    {path:"", component: HomeComponent}
  ];