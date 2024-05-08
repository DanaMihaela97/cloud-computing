import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { FormGroup,FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CandidateModel } from './candidate';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  jobId:any;
  job:any;
  formValue!:FormGroup;
  candidate:CandidateModel=new CandidateModel();
  register!:CandidateModel;

constructor(private route: ActivatedRoute, private api:ApiService, private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  
    this.route.params.subscribe(params => {
      this.jobId = params['id'];
      this.api.getJobById(this.jobId).subscribe(
        (jobData: any) => {
          this.job = jobData;
        },
        (error: any) => {
          console.error('Error fetching job data:', error);
        }
      );
    });
  }
  

  applying(){
    this.candidate.firstName = this.formValue.value.firstName;
    this.candidate.lastName = this.formValue.value.lastName;
    this.candidate.email = this.formValue.value.email;
    this.candidate.phone = this.formValue.value.phone;
  
    this.api.createUser(this.candidate).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Cererea a fost trimisă!',
          text: 'Mulțumim pentru aplicare.',
        }).then(function() {
        window.location.href = "";
      })},
      err => {
        console.error('Eroare la trimiterea cererii:', err);
        alert("Eroare: Cererea nu a putut fi trimisă. Te rugăm să încerci din nou mai târziu.");
      }
    );
  }
  
}
