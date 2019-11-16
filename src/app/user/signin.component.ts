import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
  }

  userName: string
  password: string

  login() {
    const user: User = {
      userName: this.userName,
      password: this.password,
      role: ""
    };
    this.appService.login(user);
  }

  reset() {
    if (this.userName) {
      this.router.navigate(['/reset', this.userName]);
    } else {
      alert("Please input your user name.");
    }
  }
}
