import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  users: User[] = [];

  ngOnInit() {
    this.userName = sessionStorage.getItem("userName");
    this.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  userName: string
  keyword: string
  course: string
  fee: string

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  search() {
    window.alert("keyword = " + this.keyword);
    this.appService.getCourses(this.keyword);
  }

  getUsers(): Observable<User[]> {
    return this.appService.getUsers();
  }

  removeUser(userName) {
    return this.appService.removeUser(userName);
  }

  addOrUpdateCourse() {
    window.alert("course = " + this.course);
    this.appService.addOrUpdateCourse(this.course);
  }

  changeFee() {
    window.alert("course = " + this.course + " fee = " + this.fee);
    this.appService.changeFee(this.course, this.fee);
  }
}
