import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Calendar } from '../models/Calendar';
import { NgbDateStruct, NgbTimeStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {

  constructor(private appService: AppService, private router: Router, private calendar: NgbCalendar) { }

  calendars: Calendar[] = [];

  ngOnInit() {
    this.userName = sessionStorage.getItem("userName");
    this.currentTab = 2;
    this.getCalendar().subscribe(data => {
      this.calendars = data;
    });
  }

  userName: string
  currentTab: number
  startDate: NgbDateStruct
  endDate: NgbDateStruct
  startTime: NgbTimeStruct
  endTime: NgbTimeStruct
  keyword: string
  course: string

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  getSkills() {
    this.appService.getSkills(this.userName);
  }

  getCalendar(): Observable<Calendar[]> {
    return this.appService.getCalendar(this.userName);
  }

  addCalendar() {
    const calendar: Calendar = {
      userName: this.userName,
      startDate: this.startDate,
      endDate: this.endDate,
      startTime: this.startTime,
      endTime: this.endTime
    };
    this.appService.addCalendar(calendar);
  }

  search() {
    window.alert("keyword = " + this.keyword);
    this.appService.getCourses(this.keyword);
  }


}
