import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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

  private clientId = "rfV%HjsDhKf23S-jBXN+*v%LVZCnVd!+8wh6cd58b=eW&q_q?KPF7N?wZ?c9V-d^";
  private clientSecret = "dJZRdsAG*X2jZn2aJKT+ZLXX+z=t2&XDD7xU=-&5hymGGgq+EvP!$?bt!BA9cVBj";
  private credentials = this.clientId + ":" + this.clientSecret;
  private auth = "Basic " + btoa(this.credentials);
  private username = "oauth2";
  private password = "q3fsd";

  private authUrl = "http://111.231.63.123:8762/oauth/token";
  private userUrl = "http://111.231.63.123:8762/user-service";
  private trainingUrl = "http://111.231.63.123:8762/training-service";
  private payUrl = "http://111.231.63.123:8762/payment-service";

  getToken() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': this.auth })
    };
    const params = "grant_type=password&username=" + this.username + "&password=" + this.password;
    return this.http.post(this.authUrl, params, httpOptions).toPromise();
  }

  async register(user: User) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    this.http.post<User>(this.userUrl + "/v1/user/add",
      user, httpOptions)
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

  async login(user: User) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    this.http.post<User>(this.userUrl + "/v1/user/login",
      user, httpOptions)
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

  async reset(user: User) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    this.http.post<User>(this.userUrl + "/v1/user/reset",
      user, httpOptions)
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

  async getUsers(): Promise<User[]> {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.get<User[]>(this.userUrl + "/v1/user/all", httpOptions).toPromise();
  }

  async removeUser(userName) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.delete(this.userUrl + "/v1/user/remove/" + userName, httpOptions)
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

  async getCalendar(userName): Promise<Calendar[]> {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.get<Calendar[]>(this.userUrl + "/v1/mc/all/" + userName, httpOptions).toPromise();
  }

  async addCalendar(userName, startDate, endDate) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': "Bearer " + data['access_token'] })
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

  async removeCalendar(userName, startDate, endDate) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.delete(this.userUrl + "/v1/mc/remove/" + userName + "/" + startDate + "/" + endDate, httpOptions)
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

  async getTechnologies(): Promise<Technologies[]> {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.get<Technologies[]>(this.userUrl + "/v1/tech/all", httpOptions).toPromise();
  }

  async addTechnologies(technologies: Technologies) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.post<Technologies>(this.userUrl + "/v1/tech/add",
      technologies, httpOptions)
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

  async removeTechnologies(skillName) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.delete<Technologies>(this.userUrl + "/v1/tech/remove/" + skillName, httpOptions)
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

  async getSkills(userName) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.get<JSON[]>(this.userUrl + "/v1/ms/all/" + userName, httpOptions);
  }

  async saveSkills(userName, skillNames) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': "Bearer " + data['access_token'] })
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

  async addTrainings(trainings: Trainings) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.post<Trainings>(this.trainingUrl + "/v1/training/add",
      trainings, httpOptions)
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

  async removeTrainings(id) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.delete<Trainings>(this.trainingUrl + "/v1/training/remove/" + id, httpOptions)
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

  async search(keyword): Promise<Trainings[]> {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.get<Trainings[]>(this.trainingUrl + "/v1/training/search?keyword=" + keyword, httpOptions).toPromise();
  }

  async mentorBook(mentorName, ids) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': "Bearer " + data['access_token'] })
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

  async studentBook(studentName, ids) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': "Bearer " + data['access_token'] })
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

  async pay(payment: Payment) {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.post<Payment>(this.payUrl + "/v1/pay/pay",
      payment, httpOptions);
  }

  async getIncome(mentorName): Promise<Payment[]> {
    let data = await this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Bearer " + data['access_token'] })
    };
    return this.http.get<Payment[]>(this.payUrl + "/v1/pay/all/" + mentorName, httpOptions).toPromise();
  }
}
