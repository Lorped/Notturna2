import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/index';

export interface unPg {
  idutente: number;
  nomepg: string;
  tipo: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listapg: Array<unPg> = [];
  selectedPG = '';

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {

    this.adminservice.getpersonaggio().subscribe(
      (data: any) => {
        this.listapg = data.pg;
      }
    );

  }

}
