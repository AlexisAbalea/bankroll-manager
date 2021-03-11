import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Stats } from 'src/app/models/stats.model';
import { CustomLinerChartService } from 'src/app/services/custom-liner-chart.service';

@Component({
  selector: 'app-graphique-lineaire',
  templateUrl: './graphique-lineaire.component.html',
  styleUrls: ['./graphique-lineaire.component.scss']
})
export class GraphiqueLineaireComponent implements OnInit, AfterViewInit {

  @Input() datagraph: Stats[];
  multi: any[];
  @Input() view: any[];
  @Input() legend: boolean;
  @ViewChild('chart') chart: any;
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

  constructor(private customLinerChartService: CustomLinerChartService) {
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

  ngAfterViewInit() {
    this.customLinerChartService.showDots(this.chart);
  }
}
