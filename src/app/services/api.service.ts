import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private url: string = 'http://localhost:7200/api/v1/openingjobs';
  private url: string = 'http://34.235.53.175:7200/api/v1/openingjobs';
  httpOptions = {
    headers: new HttpHeaders({
     "Content-Type": 'file'
    })
  };

  constructor(private http: HttpClient) { }

  public getJobs() {
    return this.http.get<any[]>(`${this.url}/jobs`);
  }

  public createJob(data: any) {
    return this.http.post<any>(`${this.url}/jobs`, data);
  }

  public getJobById(id: any) {
    return this.http.get<any>(`${this.url}/jobs/${id}`);
  }

  public createUser(formData: FormData) {
    return this.http.post<any>(`${this.url}/apply`, formData, this.httpOptions);
  }
}
