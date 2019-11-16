import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem("userName");
  }

  userName: string
  keyword: string
  course: string

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  search() {
    window.alert("keyword = " + this.keyword);
    this.appService.getCourses(this.keyword);
  }

  book() {
    window.alert("course = " + this.course);
    this.appService.bookCourse(this.course);
  }
}
