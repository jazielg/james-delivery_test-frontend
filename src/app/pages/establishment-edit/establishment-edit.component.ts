import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { EstablishmentService } from 'src/app/services/establishments/establishment.service';
import { Establishment } from 'src/app/models/Establishment';

@Component({
  selector: 'app-establishment-edit',
  templateUrl: './establishment-edit.component.html',
  styleUrls: ['./establishment-edit.component.css'],
})
export class EstablishmentEditComponent implements OnInit {
  establishment: Establishment = {
    name: '',
    address: '',

    // API DATA
    id: '',
    index: 0,
    guid: '',
    picture: '',
    email: '',
    phone: '',
    registered: '',
    latitude: '',
    longitude: '',

    // FORM FIGMA DATA
    city: '',
    bank: '',
    account_type: '',
    document_number: '',
    agency: '',
    account: '',
    automatic_withdrawal: true,
  };

  title: string;

  constructor(
    private route: ActivatedRoute,
    private establishmentService: EstablishmentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEstablishment();
  }

  getEstablishment(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.establishmentService
      .getEstablishment(id)
      .subscribe((establishment) => {
        this.establishment = establishment;
        this.title = establishment.name;
      });
  }

  updateEstablishment(): void {
    this.establishmentService
      .updateEstablishment(this.establishment)
      .subscribe((response) => console.log(response));
  }

  goBack(): void {
    this.location.back();
  }
}
