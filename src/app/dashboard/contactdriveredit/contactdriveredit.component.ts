import { Component, OnInit } from '@angular/core';
import { SharedService } from '../.././service/shared.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

@Component({
  selector: 'app-contactdriveredit',
  templateUrl: './contactdriveredit.component.html',
  styleUrls: ['./contactdriveredit.component.css']
})
export class ContactdrivereditComponent implements OnInit {
  public editDriverFormErrors: any;
  public editDriverForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
