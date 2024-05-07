import { NgModule } from "@angular/core";
import { FormComponent } from "./form/form.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { JobsComponent } from "./jobs/jobs.component";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";


@NgModule({
    declarations: [FormComponent, JobsComponent],
    imports:[BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        RouterModule,
        RouterModule 
        
    ],
    providers:[ApiService],
    bootstrap:[AppComponent]})


    export class AppModule{}