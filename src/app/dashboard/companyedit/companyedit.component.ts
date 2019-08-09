import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyedit',
  templateUrl: './companyedit.component.html',
  styleUrls: ['./companyedit.component.css']
})
export class CompanyeditComponent implements OnInit {
  fieldinput: boolean = true;
  imagefile: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  showContent() {
    this.fieldinput = false;
    this.imagefile = true;
  }
}
