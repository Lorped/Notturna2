import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private http: HttpClient) { }

  login(nome: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/login.php', {
      nome: nome,
      password: password
    })
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.idutente) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('NotturnaUser', user.idutente );
        sessionStorage.setItem('NotturnaUser0', user.admin );
        sessionStorage.setItem('NotturnaUser1', user.vampiro );
        sessionStorage.setItem('NotturnaUser2', user.hunter );
      }
      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('NotturnaUser');
    sessionStorage.removeItem('NotturnaUser0');
    sessionStorage.removeItem('NotturnaUser1');
    sessionStorage.removeItem('NotturnaUser2');
  }

}
