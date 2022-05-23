import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  baseApiUrl = "http://localhost:4201/Angular10Crud/src/app/assets/fotos"
  // baseApiUrl = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }

  // Returns an observable
  upload(file: File): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseApiUrl, formData)
  }
}
