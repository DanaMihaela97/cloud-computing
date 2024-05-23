import { NgModule } from "@angular/core";
import { FormComponent } from "./form/form.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { JobsComponent } from "./jobs/jobs.component";
import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";


@NgModule({
    declarations: [FormComponent, JobsComponent, HomeComponent],
    imports:[BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        RouterModule,
        
        
    ],
    providers:[ApiService],
    bootstrap:[AppComponent]})


    export class AppModule{}