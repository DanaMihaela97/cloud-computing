import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  joburi: any[] = [];
  filteredJobs: any[] = [];
  filteredByCity: { [key: string]: number } = {};
  selectedCity: string | null = null;
  currentDate: Date = new Date();
  selectedExperience: string | null = null;
  experienceOptions: string[] = ["No experience", "0-1 years", "3-5 years", "> 5 years"];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getJobs().then(data => {
      this.joburi = data;
      this.filteredJobs = data;
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

  selectCity(city: string | null): void {
    this.selectedCity = city;
    this.applyFilters();
  }

  onExperienceChange(experience: string | null): void {
    this.selectedExperience = experience;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredJobs = this.joburi.filter(job =>
      this.filterByExperience(job) && this.filterByCity(job)
    );
  }

  filterByExperience(job: any): boolean {
    if (this.selectedExperience === null) {
      return true;
    }
    return job.experience === this.selectedExperience;
  }

  filterByCity(job: any): boolean {
    if (this.selectedCity === null) {
      return true;
    }
    return job.city === this.selectedCity;
  }
}
