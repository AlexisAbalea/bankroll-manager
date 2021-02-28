import { Component, OnInit } from '@angular/core';
import { BankrollService } from '../services/bankroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private serviceBankroll: BankrollService) { }

  ngOnInit(): void {
  }

  get titreBankroll() {
    if (this.serviceBankroll.bankroll) {
      return this.serviceBankroll.bankroll.nom || '';
    }
  }

}
