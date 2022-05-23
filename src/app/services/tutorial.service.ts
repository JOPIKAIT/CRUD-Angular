import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from "@angular/common/http";

const baseUrl = ' http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/users`)
    .pipe(catchError(this.errorHandler));
  }

  get(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/users/${id}`);
  }

  create(data: string): Observable<any> {
    return this.http.post(`${baseUrl}/users`, data)
    .pipe( catchError(this.errorHandler));
  }

  update(id: string, data: string): Observable<any> {
    return this.http.put(`${baseUrl}/users/${id}`, data)
    .pipe(catchError(this.errorHandler));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/users/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/users`);
  }
  
  findByFirstName(firstname: string): Observable<any> {
    return this.http.get(`${baseUrl}/users/?firstname=${firstname}`)
    .pipe(catchError(this.errorHandler));
  }

    /** 
   * Write code on Method
   *
   * @return response()
   */
     errorHandler(error:any) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
   }
  
}
