import { Component, OnInit, Input } from '@angular/core';

import { Establishment } from 'src/app/models/Establishment';

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.css'],
})
export class EstablishmentCardComponent implements OnInit {
  @Input() establishment: Establishment;

  constructor() {}

  ngOnInit(): void {}
}
