import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private url: string = 'http://34.235.53.175:7200/api/v1/openingjobs';
  private url: string = 'http://localhost:7200/api/v1/openingjobs';
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'multipart/form-data'
    })
  };

  constructor() { }

  public getJobs() {
    return fetch(`${this.url}/jobs`,
      {
        method: 'GET'
      }
    ).then(async response => await response.json());
  }

  public createJob(data: any) {
    return fetch(`${this.url}/jobs`,
      {
        method: 'POST',
        body: data
      }
    );
  }

  public async getJobById(id: any): Promise<any> {
    try {
      const response = await fetch(`${this.url}/jobs/${id}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jobData = await response.json();
      return jobData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }

  public createUser(formData: FormData): Promise<string> {
    return fetch(`${this.url}/apply`, {
      method: 'POST',
      body: formData
    }).then(response => response.text());
  }
}
