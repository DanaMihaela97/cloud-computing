import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CandidateModel } from './candidate';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, MatIconModule ],
})
export class FormComponent implements OnInit {
  jobId: any;
  job: any;
  formValue!: FormGroup;
  candidate: CandidateModel = new CandidateModel();
  selectedFile: File | null = null;
  fileName:any;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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
      this.fileName=file.name;
    }
  }

  applying() {
    if (this.formValue.valid) {
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
          title: 'Your application has been submitted!',
          text: 'Thank you for applying. Please check your email for further instructions.<br>Subscribe to receive future job alerts.',
        }).then(() => {
          window.location.href = "/jobs";
        });
      }).catch(err => {
        console.error('Error submitting application:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Your application could not be submitted. Please try again later.'
        }).then(() => {
          this.resetForm();
        });
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Please fill out all fields in the form.'
      }).then(() => {
        this.resetForm();
      });
    }
  }
  
  resetForm() {
    this.formValue.reset();
    this.selectedFile = null;
    this.fileName = null;
  }
  goBack(): void {
    this.location.back();
  }

}