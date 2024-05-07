import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';

export const routes: Routes = [
    { path: "", component: JobsComponent },
    { path: "apply/:id", component: FormComponent }
  ];