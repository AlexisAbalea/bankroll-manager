import { Component, OnInit } from '@angular/core';
import { BankrollService } from '../services/bankroll.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private bankrollService :BankrollService) { }

  ngOnInit(): void {
  }

  hasBankrollChoose() {
    return this.bankrollService.bankroll;
  }

}
