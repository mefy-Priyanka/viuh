import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  date: any;
  todaydate: any;
  constructor() {

  }

  ad() {
    console.log("hi", this.date)
    var previous = new Date(new Date().setDate(new Date().getDate() - this.date));
    console.log("Fromdate", previous.toISOString())
    console.log("hi", this.date)
  }
  
  ngOnInit() {
  }

}
