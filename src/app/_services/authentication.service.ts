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
        sessionStorage.setItem('NotturnaUser1', user.scheda );
      }
      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('NotturnaUser');
    sessionStorage.removeItem('NotturnaUser0');
    sessionStorage.removeItem('NotturnaUser1');
  }


  checkEmail (email: string) {
    return this.http.get<any>('https://www.roma-by-night.it/Notturna2/wsPHP/checkemail.php?email=' + email);
  }

  checkNome (nome: string) {
    return this.http.get<any>('https://www.roma-by-night.it/Notturna2/wsPHP/checknome.php?nome=' + nome);
  }


  sendregistra (username: string , password: string, email: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/sendregistra.php', {
      username: username,
      password: password,
      email: email
    });
  }

  changepwd (idutente: number , password: string, email: string) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/changepwd.php', {
      idutente: idutente,
      password: password,
      email: email
    });
  }

}
