import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BankrollService } from '../services/bankroll.service';

@Injectable({
  providedIn: 'root'
})
export class BankrollGuard implements CanActivate {


  constructor(public bankrollService: BankrollService, public router: Router) {}

  canActivate(): boolean {
    if (!this.bankrollService.bankroll) {
      this.router.navigate(['bm/bankroll']);
      return false;
    }
    return true;
  }

}
