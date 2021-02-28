import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = new User();
  constructor() {
    this.user.id = "1";
  }

}


