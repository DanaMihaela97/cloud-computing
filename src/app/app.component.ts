import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[RouterOutlet, FormComponent, JobsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader = true;
  title = 'job-app';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = event.url !== '/';
      }
    });
  }
  home():void{
    this.router.navigate(['/']);
  }
}
