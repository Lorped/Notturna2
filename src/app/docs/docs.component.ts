import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../_services/index';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  idclan = '';

  link = '/docs/#';
  linkT = '/docs/#';
  linkN = '/docs/#';
  linkV = '/docs/#';

  disC = true;
  disT = true;
  disN = true;
  disV = true;


  constructor( private schedaservice: SchedaService ) { }

  ngOnInit(): void {
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getclan(idutente).subscribe(
      (data: any) => {
        this.idclan = data ;
        switch (this.idclan) {

          case '1':   //  Toreador
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UZ2pKb0RzRlZoaVU/view';
            this.disC = false;
          break;

          case '2':   //  Ventrue
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UTTRodGZXdzdCVXM/view';
            this.disC = false;
          break;

          case '3':		// Nosferatu
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UUDNmT3llNjZ3UXM/view';
            this.disC = false;
          break;

          case '4':		// Brujah
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UNFZURFpYR2pfNVk/view';
            this.disC = false;
          break;

          case '5':		// Gangrel
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UcFRxVFRkNnRLb28/view';
            this.disC = false;
          break;

          case '6':		// Malkavian
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UZ2dRSW1VOGFWNDQ/view';
            this.disC = false;
          break;

          case '7':		// Tremere
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-US3d3OEpnbV9Ccjg/view';
            this.disC = false;
          break;

          case '8':		// Lasombra
            this.link = 'https://drive.google.com/file/d/1veEpi_TDGZz-xIFbO1PeVfHrprrDISWF/view';
            this.disC = false;
          break;

          case '9':		// Tzimisce
            this.link = 'https://drive.google.com/file/d/1AyN-Ofnhw-m5LQcNMFEHYOnLclb-3N_0/view';
            this.disC = false;
          break;

          case '10':	// Assamiti
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-ULXpGWkxLNWZhaDg/view';
            this.disC = false;
          break;

          case '11':	// Giovanni
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UYTVUZFlNeEo2N0k/view';
            this.disC = false;
          break;

          case '12':	// Ravnos
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UVTF3QWJ2TzNXZk0/view';
            this.disC = false;
          break;

          case '13':	// Setiti
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UOUo0dll2NjRDOHc/view';
            this.disC = false;
          break;

          case '20':	// vili
            this.link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UOWhsMExKd2YzTVU/view';
            this.disC = false;
          break;

          case '14':		// Cappadoci
            this.link = 'https://drive.google.com/file/d/1WqSxecMNGQ0ayh6MLGM-FHCP1LaL0khZ/view';
            this.disC = false;
          break;

        }

        if ( this.idclan == '7') {
          this.linkT = 'https://drive.google.com/file/d/0BwbyMyT-GT-URWlmTUtjNUhfc0E/view';
          this.disT = false;
        }
        if ( this.idclan == '14' || this.idclan == '11') {
          this.linkN = 'https://drive.google.com/file/d/0BwbyMyT-GT-UX3VNX1U4T21pejA/view';
          this.disN = false;
        }
        if ( this.idclan == '2' ) {
          this.linkV = 'https://drive.google.com/file/d/0BwbyMyT-GT-UNE1DVEZsT3l2S1E/view';
          this.disV = false;
        }
      }
    );



  }

}
