import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CandidateModel } from './candidate';
import { CommonModule } from '@angular/common';

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

  constructor(private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {}

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
        this.cdr.detectChanges();
      }).catch(error => {
        console.error('Error fetching job data:', error);
      });
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

    this.api.createUser(formData).then(res => {
      Swal.fire({
        icon: 'info',
        title: 'Check your email!',
        text: 'Please check your email to confirm your subscription.',
        confirmButtonText: 'OK'
      }).then(result => {
        if (result.isConfirmed) {
          this.showSuccessMessage();
        }
      });
    }).catch(err => {
      console.error('Error submitting the application:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'The application could not be submitted. Please try again later.',
      });
    });
  }

  showSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Application Submitted Successfully!',
      text: 'Thank you for applying. You will receive an email shortly.',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = "";
    });
  }
}
