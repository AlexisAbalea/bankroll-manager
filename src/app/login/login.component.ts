import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {}

  async ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;
      this.authService.login(username, password).subscribe((authData: { token: string, user: any }) => {
          console.log('retour :', authData);
          this.authService.user = authData.user;
          localStorage.setItem('token', authData.token);
          sessionStorage.setItem('user', JSON.stringify(authData.user));
          this.authService.token = authData.token;
          this.router.navigate(['bm/bankroll']);
        },
        (error) => {
          console.log('erreur : ', error);
        }
      );


      /*then(log => {
        this.router.navigate(['bm/bankroll']);
      }).catch(err => {
        console.log('erreur : ', err);
      });
      */
    }
  }

}
