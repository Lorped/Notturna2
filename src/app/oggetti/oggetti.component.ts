import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/index';
import { Oggetto, Condizione, FullOggetto} from '../global';



@Component({
  selector: 'app-oggetti',
  templateUrl: './oggetti.component.html',
  styleUrls: ['./oggetti.component.css']
})
export class OggettiComponent implements OnInit {

  listaoggetti: Array<FullOggetto> = [];

  constructor( private adminservice: AdminService) { }

  ngOnInit(): void {

    this.adminservice.listoggetti().subscribe(
      (data: any) => {
        this.listaoggetti = data.oggetti;
        console.log(this.listaoggetti);
      }
    );
  }

}
