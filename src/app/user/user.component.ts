import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Trainings } from '../models/Trainings';
import { Calendar } from '../models/Calendar';
import { Payment } from '../models/Payment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  trainings: Trainings[] = [];
  calendars: Calendar[] = [];

  ngOnInit() {
    this.userName = sessionStorage.getItem("userName");
    this.search();
  }

  userName: string
  mentorName: string
  keyword: string = ""
  books: boolean[] = []
  ids: number[] = []
  fees: number = 0
  txnType: string = "PayPal"

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  search() {
    this.fees = 0
    this.appService.search(this.keyword).subscribe(data => {
      this.trainings = data;
      data.forEach((val, idx, array) => {
        if (val.userName == this.userName) {
          this.books[idx] = true
          this.fees += val.fees
        } else {
          this.books[idx] = false
        }
        if (val.mentorName) {
          this.mentorName = val.mentorName
          this.appService.getCalendar(val.mentorName).subscribe(data => {
            this.calendars = data;
          });
        }
      });
    });
  }

  bookTrainings() {
    this.ids = [];
    this.books.forEach((val, idx, array) => {
      if (val) {
        this.ids.push(this.trainings[idx].id);
      }
    });
    if (this.ids.length == 0) {
      alert("Please switch on at least one training.");
    } else {
      const payment: Payment = {
        amount: this.fees,
        userName: this.userName,
        mentorName: this.mentorName,
        txnType: this.txnType
      };
      this.appService.pay(payment).subscribe(
        (data) => {
          console.log("POST call successful value returned in body",
            data);
          this.appService.studentBook(this.userName, this.ids.toString());
        },
        response => {
          console.log("POST call in error", response);
          alert("Pay failed. Please try again.");
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    }
  }
}
