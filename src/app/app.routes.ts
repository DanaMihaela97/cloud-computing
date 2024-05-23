import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { JobsComponent } from './jobs/jobs.component';
import { FilterComponent } from './filter/filter.component';

export const routes: Routes = [
    { path: "", component: JobsComponent },
    { path:"filter/:city", component:FilterComponent},
    { path: "apply/:id", component: FormComponent }
  ];