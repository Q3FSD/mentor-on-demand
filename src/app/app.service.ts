import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { Calendar } from './models/Calendar';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrl = "http://localhost:8080";
  courses = ["Java", "Python", "Node.js"];

  register(user: User) {
    this.http.post<User>(this.baseUrl + "/v1/user/add",
      user)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          if (data['userExist']) {
            alert("User name is already taken, please choose another one.");
          } else {
            sessionStorage.setItem("userName", data.userName);
            if (data.role == "Student") {
              this.router.navigate(['/user']);
            } else if (data.role == "Mentor") {
              this.router.navigate(['/mentor']);
            } else {
              this.router.navigate(['/admin']);
            }
          }
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  login(user: User) {
    this.http.post<User>(this.baseUrl + "/v1/user/login",
      user)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          if (data['newRegister']) {
            alert("User name does not exist, please signup first.");
            this.router.navigate(['/register']);
          } else if (data['wrongPassword']) {
            alert("Wrong password, please try again or reset it.");
          } else {
            sessionStorage.setItem("userName", data.userName);
            if (data.role == "Student") {
              this.router.navigate(['/user']);
            } else if (data.role == "Mentor") {
              this.router.navigate(['/mentor']);
            } else {
              this.router.navigate(['/admin']);
            }
          }
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  reset(user: User) {
    this.http.post<User>(this.baseUrl + "/v1/user/reset",
      user)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          if (data['userExist']) {
            alert("User name does not exist, please signup first.");
            this.router.navigate(['/register']);
          } else {
            alert("Your password has been updated.");
            sessionStorage.setItem("userName", data.userName);
            if (data.role == "Student") {
              this.router.navigate(['/user']);
            } else if (data.role == "Mentor") {
              this.router.navigate(['/mentor']);
            } else {
              this.router.navigate(['/admin']);
            }
          }
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "/v1/user/all");
  }

  removeUser(userName) {
    return this.http.delete(this.baseUrl + "/v1/user/remove/" + userName)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          alert("User has been removed successfully.");
          window.location.reload();
        },
        response => {
          console.log("POST call in error", response);
          alert("Remove user failed.");
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  getSkills(username) {

  }

  getCalendar(userName): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.baseUrl + "/v1/mc/all/" + userName);
  }

  addCalendar(calendar: Calendar) {
    return this.http.post<Calendar>(this.baseUrl + "/v1/mc/addOrUpdate",
      calendar)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          if (data['userExist']) {
            alert("User name is already taken, please choose another one.");
          } else {
            sessionStorage.setItem("calendar", data.userName);
          }
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  getCourses(keyword) {
    return this.courses;
  }

  bookCourse(id) {

  }

  addOrUpdateCourse(id) {

  }

  changeFee(id, fee) {

  }
}
