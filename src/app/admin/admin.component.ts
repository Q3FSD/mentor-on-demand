import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Technologies } from '../models/Technologies';
import { Trainings } from '../models/Trainings';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  users: User[] = [];
  technologies: Technologies[] = [];
  trainings: Trainings[] = [];

  ngOnInit() {
    this.userName = sessionStorage.getItem("userName");
    this.appService.getUsers().subscribe(data =>
      this.users = data);
    this.appService.getTechnologies().subscribe(data =>
      this.technologies = data);
  }

  userName: string
  currentTab: number = 1
  technology: Technologies = new Technologies();
  training: Trainings = new Trainings();
  keyword: string = ""

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  getUsers() {
    this.currentTab = 1;
  }

  removeUser(userName) {
    return this.appService.removeUser(userName);
  }

  getTechnologies() {
    this.currentTab = 2;
  }

  addTechnologies() {
    return this.appService.addTechnologies(this.technology);
  }

  removeTechnologies(skillName) {
    return this.appService.removeTechnologies(skillName);
  }

  search() {
    this.currentTab = 3;
    this.appService.search(this.keyword).subscribe(data =>
      this.trainings = data);
  }

  addTrainings() {
    return this.appService.addTrainings(this.training);
  }

  removeTrainings(id) {
    return this.appService.removeTrainings(id);
  }
}
