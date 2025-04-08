import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  private apiUrl = `${environment.apiUrl}/clinicas`;

  constructor(private http: HttpClient) {}

  getClinicas(page: number = 1, search: string = '') {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('search', search);

    return this.http.get<any>(this.apiUrl, { params });
  }
  

  getClinicaById(id: string) {
  return this.http.get(`${this.apiUrl}/${id}`);
  }

  createClinica(data: any) {
  return this.http.post(this.apiUrl, data);
  }

  updateClinica(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

}
