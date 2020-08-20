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

  getnome(idutente: number) {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getnome.php'+'?idutente='+idutente  );
  }

  getchance() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/getchance.php' );
  }

  putchance(chance: number) {
    return this.http.post<any>('https://www.roma-by-night.it/Notturna2/wsPHP/putchance.php',{
      chance: chance
    });
  }

  listoggetti() {
    return this.http.get('https://www.roma-by-night.it/Notturna2/wsPHP/listoggetti.php' );
  }
}
