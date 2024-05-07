import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { RouterOutlet } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[RouterOutlet, FormComponent, JobsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-app';
}
