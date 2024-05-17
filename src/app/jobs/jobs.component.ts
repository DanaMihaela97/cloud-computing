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

  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.apiService.getJobs().then(data => {
      this.joburi = data.json()
      console.log(data)
    }).catch(error => {
      alert('error');
    }
    );
  }
  applyForJob(jobId: string) {
    this.router.navigate(['/apply', jobId]);
  }
}
