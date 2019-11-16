import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  userName: string
  newPassword: string
  confirmPassword: string

  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('userName');
  }

  reset() {
    if (this.newPassword == this.confirmPassword) {
      const user: User = {
        userName: this.userName,
        password: this.newPassword,
        role: ""
      };
      this.appService.reset(user);
    } else {
      alert("New password and confirm password do not match.");
    }
  }
}
