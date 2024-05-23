import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  joburi: any[] = [];
  selectedCity: string | null = null;

  constructor(private location:Location, private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedCity = params.get('city');
      this.apiService.getJobs().then(data => {
        this.joburi = data.filter((job: { city: string | null; }) => job.city === this.selectedCity);
      }).catch(error => {
        alert('error');
      });
    });
  }
  home():void{
    this.router.navigate(['/jobs']);
  }
  goBack(): void {
    this.location.back();
  }
}
