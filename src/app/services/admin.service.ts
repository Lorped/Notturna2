import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  getpersonaggio() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getpersonaggio.php' );
  }
}
