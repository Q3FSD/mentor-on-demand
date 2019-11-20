import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { User } from '../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  userName: string
  password: string
  role: string = "Student"

  register() {
    const user: User = {
      userName: this.userName,
      password: this.password,
      role: this.role
    };
    this.appService.register(user);
  }
}
