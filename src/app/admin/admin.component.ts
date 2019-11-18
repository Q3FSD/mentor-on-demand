import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Technologies } from '../models/Technologies';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  users: User[] = [];
  technologies: Technologies[] = [];

  ngOnInit() {
    this.userName = sessionStorage.getItem("userName");
    this.getUsers();
  }

  userName: string
  currentTab: number
  skillName: string
  description: string
  prerequisites: string
  keyword: string
  course: string
  fee: string

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  getUsers() {
    this.currentTab = 1;
    this.appService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  removeUser(userName) {
    return this.appService.removeUser(userName);
  }

  getTechnologies() {
    this.currentTab = 2;
    this.appService.getTechnologies().subscribe(data => {
      this.technologies = data;
    });
  }

  addTechnologies() {
    const tech: Technologies = {
      skillName: this.skillName,
      description: this.description,
      prerequisites: this.prerequisites
    };
    return this.appService.addTechnologies(tech);
  }

  removeTechnologies(skillName) {
    return this.appService.removeTechnologies(skillName);
  }

  search() {

  }

  changeFee() {
    window.alert("course = " + this.course + " fee = " + this.fee);
    this.appService.changeFee(this.course, this.fee);
  }
}
