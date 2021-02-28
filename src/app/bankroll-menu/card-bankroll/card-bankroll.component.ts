import { Component, Input, OnInit } from '@angular/core';
import { Bankroll } from 'src/app/models/bankroll.model';

@Component({
  selector: 'app-card-bankroll',
  templateUrl: './card-bankroll.component.html',
  styleUrls: ['./card-bankroll.component.scss']
})
export class CardBankrollComponent implements OnInit {

  @Input() bankroll: Bankroll;
  constructor() { }

  ngOnInit(): void {
  }

}
