import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit {
  joburi:any[] = []
  filteredByCity: { [key: string]: number } = {};
  selectedCity: string | null = null;

  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.apiService.getJobs().then(data => {
      this.joburi = data;
      this.filterJobsByCity();
    }).catch(error => {
      alert('error');
    });
  }
  applyForJob(jobId: string) {
    this.router.navigate(['/apply', jobId]);
  }
  filterJobsByCity(): void {
    this.filteredByCity = this.joburi.reduce((acc: { [key: string]: number }, job: { city: string }) => {
      acc[job.city] = (acc[job.city] || 0) + 1;
      return acc;
    }, {});
  }
  
  selectCity(city:string):void{
    this.router.navigate(['/filter', city]);
  }
}
