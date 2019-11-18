import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Calendar } from '../models/Calendar';
import { NgbDateStruct, NgbTimeStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Technologies } from '../models/Technologies';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {

  constructor(private appService: AppService, private router: Router, private calendar: NgbCalendar) { }

  technologies: Technologies[] = [];
  calendars: Calendar[] = [];

  ngOnInit() {
    this.userName = sessionStorage.getItem("userName");
    this.getTechnologies();
  }

  userName: string
  currentTab: number
  startDate: NgbDateStruct
  endDate: NgbDateStruct
  startTime: NgbTimeStruct
  endTime: NgbTimeStruct
  skills: string[] = []
  keyword: string
  course: string

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  getTechnologies() {
    this.currentTab = 1;
    this.appService.getTechnologies().subscribe(data => {
      this.technologies = data;
    });
    this.getSkills(this.userName);
  }

  onChange(tech: string, event) {
    const checked = event.target.checked;

    if (checked) {
      this.skills.push(tech);
    } else {
      const index = this.skills.indexOf(tech);
      this.skills.splice(index, 1);
    }
  }

  getSkills(userName) {
    return this.appService.getSkills(userName).subscribe(
      (data) => {
        console.log("POST call successful value returned in body",
          data);
        data.forEach(item => this.skills.push(item['technologies']));
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  saveSkills() {
    if (this.skills.length == 0) {
      alert("Recommand you to select at least one skill.");
    } else {
      this.appService.saveSkills(this.userName, this.skills.toString());
    }
  }

  getCalendar() {
    this.currentTab = 2;
    this.appService.getCalendar(this.userName).subscribe(data => {
      this.calendars = data;
    });
  }

  addCalendar() {
    this.appService.addCalendar(this.userName,
      this.startDate.year + "-" + this.startDate.month + "-" + this.startDate.day + " " + this.startTime.hour + ":" + this.startTime.minute,
      this.endDate.year + "-" + this.endDate.month + "-" + this.endDate.day + " " + this.endTime.hour + ":" + this.endTime.minute);
  }

  removeCalendar(startDate, endDate) {
    return this.appService.removeCalendar(this.userName, startDate, endDate);
  }

  search() {
  }
}
