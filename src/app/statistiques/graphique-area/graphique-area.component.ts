import { Component, Input, OnInit } from '@angular/core';
import { Stats } from 'src/app/models/stats.model';

@Component({
  selector: 'app-graphique-area',
  templateUrl: './graphique-area.component.html',
  styleUrls: ['./graphique-area.component.scss']
})
export class GraphiqueAreaComponent implements OnInit {

  @Input() datagraph: Stats[];
  multi: any[];
  @Input() view: any[];
  @Input() legend: boolean;
  @Input() firstColor: string;

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  yAxis: boolean = true;
  xAxis: boolean = false;
  showYAxisLabel: boolean = true;
  timeline: boolean = true;
  yAxisTicks = [];

  colorScheme;

  constructor() {
  }

  ngOnInit(): void {
    this.colorScheme = {
      domain: [this.firstColor, '#9ACD32', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };
    const multi = this.datagraph;
    Object.assign(this, { multi });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  getDateModel(str: string) {
    const array = str.split('_');
    return array[1];
  }

  getTypeModel(str: string) {
    const array = str.split('_');
    return array[2];
  }

  getResultatModel(str: string) {
    const array = str.split('_');
    return parseInt(array[3]) > 0 ? '+' + array[3] : array[3];
  }

}
