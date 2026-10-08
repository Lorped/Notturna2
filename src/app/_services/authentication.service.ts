import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface User {
  idutente: number;
  admin: number;
  scheda: number;
  cronacadescrizione: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private http = inject(HttpClient);



  login(nome: string, password: string) {
    return this.http.post<User>('https://www.roma-by-night.it/Notturna2/wsPHP/login.php', {
      nome: nome,
      password: password
    })
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.idutente) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('NotturnaUser', user.idutente.toString() );
        sessionStorage.setItem('NotturnaUser0', user.admin.toString() );
        sessionStorage.setItem('NotturnaUser1', user.scheda.toString() );
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


  checkEmail<T> (email: string) {
    return this.http.get<T>('https://www.roma-by-night.it/Notturna2/wsPHP/checkemail.php?email=' + email);
  }

  checkNome<T> (nome: string) {
    return this.http.get<T>('https://www.roma-by-night.it/Notturna2/wsPHP/checknome.php?nome=' + nome);
  }


  sendregistra (username: string , password: string, email: string) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/sendregistra.php', {
      username: username,
      password: password,
      email: email
    });
  }

  changepwd (idutente: number , password: string, email: string) {
    return this.http.post('https://www.roma-by-night.it/Notturna2/wsPHP/changepwd.php', {
      idutente: idutente,
      password: password,
      email: email
    });
  }

}
