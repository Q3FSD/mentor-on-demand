import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { Calendar } from './models/Calendar';
import { Technologies } from './models/Technologies';
import { Trainings } from './models/Trainings';
import { Payment } from './models/Payment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private router: Router) { }

  private userUrl = "http://localhost:8080";
  private trainingUrl = "http://localhost:8081";
  private payUrl = "http://localhost:8082";

  register(user: User) {
    this.http.post<User>(this.userUrl + "/v1/user/add",
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
    this.http.post<User>(this.userUrl + "/v1/user/login",
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
    this.http.post<User>(this.userUrl + "/v1/user/reset",
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
    return this.http.get<User[]>(this.userUrl + "/v1/user/all");
  }

  removeUser(userName) {
    return this.http.delete(this.userUrl + "/v1/user/remove/" + userName)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
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

  getCalendar(userName): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.userUrl + "/v1/mc/all/" + userName);
  }

  addCalendar(userName, startDate, endDate) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const params = "userName=" + userName + "&startDate=" + startDate + "&endDate=" + endDate;
    return this.http.post<Calendar>(this.userUrl + "/v1/mc/add", params, httpOptions)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          window.location.reload();
        },
        response => {
          console.log("POST call in error", response);
          window.location.reload();
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  removeCalendar(userName, startDate, endDate) {
    return this.http.delete(this.userUrl + "/v1/mc/remove/" + userName + "/" + startDate + "/" + endDate)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          window.location.reload();
        },
        response => {
          console.log("POST call in error", response);
          window.location.reload();
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  getTechnologies(): Observable<Technologies[]> {
    return this.http.get<Technologies[]>(this.userUrl + "/v1/tech/all");
  }

  addTechnologies(technologies: Technologies) {
    return this.http.post<Technologies>(this.userUrl + "/v1/tech/add",
      technologies)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          window.location.reload();
        },
        response => {
          console.log("POST call in error", response);
          alert("Add technologies failed.");
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  removeTechnologies(skillName) {
    return this.http.delete<Technologies>(this.userUrl + "/v1/tech/remove/" + skillName)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          window.location.reload();
        },
        response => {
          console.log("POST call in error", response);
          window.location.reload();
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  getSkills(userName) {
    return this.http.get<JSON[]>(this.userUrl + "/v1/ms/all/" + userName);
  }

  saveSkills(userName, skillNames) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const params = "userName=" + userName + "&skillNames=" + skillNames;
    return this.http.post(this.userUrl + "/v1/ms/save", params, httpOptions)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          alert("Your skills saved.");
        },
        response => {
          console.log("POST call in error", response);
          alert("Your skills saved.");
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  addTrainings(trainings: Trainings) {
    return this.http.post<Trainings>(this.trainingUrl + "/v1/training/add",
      trainings)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          window.location.reload();
        },
        response => {
          console.log("POST call in error", response);
          alert("Add training failed.");
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  removeTrainings(id) {
    return this.http.delete<Trainings>(this.trainingUrl + "/v1/training/remove/" + id)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          window.location.reload();
        },
        response => {
          console.log("POST call in error", response);
          window.location.reload();
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  search(keyword): Observable<Trainings[]> {
    return this.http.get<Trainings[]>(this.trainingUrl + "/v1/training/search?keyword=" + keyword);
  }

  mentorBook(mentorName, ids) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const params = "mentorName=" + mentorName + "&ids=" + ids;
    return this.http.post(this.trainingUrl + "/v1/training/mentor", params, httpOptions)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          alert("Your trainings are booked.");
        },
        response => {
          console.log("POST call in error", response);
          alert("Your trainings are booked.");
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  studentBook(studentName, ids) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const params = "studentName=" + studentName + "&ids=" + ids;
    return this.http.post(this.trainingUrl + "/v1/training/student", params, httpOptions)
      .subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          alert("Your trainings are booked.");
        },
        response => {
          console.log("POST call in error", response);
          alert("Your trainings are booked.");
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  pay(payment: Payment) {
    return this.http.post<Payment>(this.payUrl + "/v1/pay/pay",
      payment);
  }

  getIncome(mentorName): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.payUrl + "/v1/pay/all/" + mentorName);
  }
}
