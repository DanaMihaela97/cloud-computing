import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CandidateModel } from './candidate';
import { PutObjectAclCommand, S3Client, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

@Component({
  selector: 'app-form',
  styleUrl: './form.component.scss',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class FormComponent implements OnInit {
  jobId: any;
  job: any;
  formValue!: FormGroup;
  candidate: CandidateModel = new CandidateModel();
  register!: CandidateModel;

  constructor(private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

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

  async applying() {

    this.candidate.firstName = this.formValue.value.firstName;
    this.candidate.lastName = this.formValue.value.lastName;
    this.candidate.email = this.formValue.value.email;
    this.candidate.phone = this.formValue.value.phone;
  
    this.api.createUser(this.candidate).subscribe(
      async res => {
          // Afiseaza mesajul de succes utilizatorului
          Swal.fire({
              icon: 'success',
              title: 'Cererea a fost trimisă!',
              text: 'Mulțumim pentru aplicare.',
          }).then(function() {
              window.location.href = "";
          });

          // Trimite un mesaj prin SNS pentru a notifica că cererea a fost trimisă cu succes
          try {
              const snsClient = new SNSClient({ region: 'us-east-1' }); // Înlocuiește 'us-east-1' cu regiunea SNS-ului tău
              const command = new PublishCommand({
                  TopicArn: 'ARN-ul_topicului_SNS', // Înlocuiește 'ARN-ul_topicului_SNS' cu ARN-ul topicului SNS pe care l-ai creat
                  Message: 'Cererea pentru job a fost trimisă cu succes!'
              });
              await snsClient.send(command);
              console.log('Mesajul de notificare a fost trimis cu succes prin SNS.');
          } catch (error) {
              console.error('Eroare la trimiterea mesajului de notificare prin SNS:', error);
          }
      },
      err => {
          console.error('Eroare la trimiterea cererii:', err);
          alert("Eroare: Cererea nu a putut fi trimisă. Te rugăm să încerci din nou mai târziu.");
      }
  );

    const fileInput = document.getElementById('cv') as HTMLInputElement;
    const file = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;


    const config={
      region:'us-east-1',
      credentials:{
      accessKeyId: 'ASIA33KXBPWTGW72GUUW',
      secretAccessKey: 'tn+rh+vHIAaxWi5AnfpVpx3AFJG410x4LOIJKoJY'
      }
    };


    // Numele fișierului pe S3 va fi numele original al fișierului CV
    const fileName = this.candidate.firstName + "_" + this.candidate.lastName + ".pdf";
    // Parametrii pentru încărcarea fișierului în S3
   
    const client = new S3Client(config);
    const input : PutObjectCommandInput={
      Bucket: "cvs-ccproject",
      Key: fileName,
      ACL: "public-read",
      GrantRead: "uri=http://acs.amazonaws.com/groups/global/AllUsers",
      ContentType:'application/pdf'
    
    };
    await client.send(new PutObjectAclCommand(input))

   
  }
  }

