import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Serie, Stats } from 'src/app/models/stats.model';

@Component({
  selector: 'app-chiffres-cle',
  templateUrl: './chiffres-cle.component.html',
  styleUrls: ['./chiffres-cle.component.scss']
})
export class ChiffresCleComponent implements OnInit {

  @Input() datachiffre: Serie[];

  multi: any[];
  view: any[] = [750, 250];

  colorScheme = {
    domain: ['#CFC0BB', '#7aa3e5', '#E44D25', '#5AA454', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';

  constructor() {
  }

  ngOnInit(): void {
    Object.assign(this, this.datachiffre );
  }

  onSelect(event) {
    console.log(event);
  }

  valueFormat(val) {
    if (val.label === 'Partie jouée') {
      return val.value;
    }

    if (val.label === '% Objectif') {
      return val.value + '%';
    }

    return val.value + '€';
  }

}
