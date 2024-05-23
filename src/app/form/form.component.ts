import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CandidateModel } from './candidate';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
})
export class FormComponent implements OnInit {
  jobId: any;
  job: any;
  formValue!: FormGroup;
  candidate: CandidateModel = new CandidateModel();
  selectedFile: File | null = null;

  constructor(private location: Location, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      cv: [null, Validators.required]
    });

    this.route.params.subscribe(params => {
      this.jobId = params['id'];
      this.api.getJobById(this.jobId).then(jobData => {
        this.job = jobData;
        console.log(jobData);
        this.cdr.detectChanges();
      }).catch(error => {
        console.error('Error fetching job data:', error);
      }
      );
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  applying() {
    const formData: FormData = new FormData();
    const user = {
      'firstName': this.formValue.value.firstName,
      'lastName': this.formValue.value.lastName,
      'email': this.formValue.value.email,
      'phone': this.formValue.value.phone
    };
    const userBlob = new Blob([JSON.stringify(user)], { type: "application/json" });
    formData.append('user', userBlob);
    if (this.selectedFile) {
      formData.append('cv', this.selectedFile);
    }
    console.log("FormData:", formData);

    this.api.createUser(formData).then(res => {
      Swal.fire({
        icon: 'success',
        title: 'Cererea a fost trimisă!',
        text: 'Mulțumim pentru aplicare.',
      }).then(function () {
        window.location.href = "";
      });
    }).catch(err => {
      console.error('Eroare la trimiterea cererii:', err);
      alert("Eroare: Cererea nu a putut fi trimisă. Te rugăm să încerci din nou mai târziu.");
    });
  }
  goBack(): void {
    this.location.back();
  }
}