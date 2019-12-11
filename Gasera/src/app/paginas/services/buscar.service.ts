import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  server = 'https://api.slothsoftware.com/'

  constructor(private http: HttpClient) { }

  postData(body) {
    const file = 'gasera.php';
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return new Promise(resolve => {
      this.http
        .post(this.server + file, JSON.stringify(body), options)
        .subscribe(data => {
          resolve(data);
        });
    });
  }
}