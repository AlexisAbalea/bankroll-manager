import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphique-lineaire',
  templateUrl: './graphique-lineaire.component.html',
  styleUrls: ['./graphique-lineaire.component.scss']
})
export class GraphiqueLineaireComponent implements OnInit {

  @Input() datagraph;
  multi: any[];
  view: any[] = [1500, 400];

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  yAxis: boolean = true;
  xAxis: boolean = true;
  showYAxisLabel: boolean = true;
  timeline: boolean = true;

  colorScheme = {
    domain: ['#E44D25', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }

  ngOnInit(): void {
    const multi = [this.datagraph];
    Object.assign(this, { multi });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }


}
