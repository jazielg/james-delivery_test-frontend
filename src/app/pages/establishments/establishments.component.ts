import { Component, OnInit } from '@angular/core';

import { EstablishmentService } from 'src/app/services/establishments/establishment.service';
import { Establishment } from 'src/app/models/Establishment';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.css'],
})
export class EstablishmentsComponent implements OnInit {
  establishments: Establishment[];

  constructor(private establishmentService: EstablishmentService) {}

  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments(): void {
    this.establishmentService
      .getEstablishments()
      .subscribe((establishments) => {
        this.establishments = establishments;
      });
  }
}
