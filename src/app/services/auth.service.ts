import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  user: User = new User();
  SERVER = environment.urlAddress;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  isAuthenticated() {
    if (this.user.id) {
      return true;
    }
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      this.user = JSON.parse(userSession);
      return true;
    }
    return false;
  }

  login(email: string, password: string) {
    return this.http.post(this.SERVER + '/api/auth/login', { email: email, password: password });
  }

  logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.token = null;
  }

  changeMdp(email, password, ancienPassword) {
    return this.http.patch(this.SERVER + '/api/auth/changePassword', { email: email, password: password, oldpassword: ancienPassword });
  }

}


