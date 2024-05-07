import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = 'http://localhost:8080/api/v1/openingjobs';

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

  public createUser(data: any) {
    return this.http.post<any>(`${this.url}/apply`, data);
  }
}
