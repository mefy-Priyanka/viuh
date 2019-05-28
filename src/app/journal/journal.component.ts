import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  denomForm: FormGroup;
  denomFormErrors = {};
  total: number;
  accountlist1 = [];
  userId: string;
  orderForm: FormGroup;
  items: FormArray;
  constructor(private formBuilder: FormBuilder, private userService: UserService, ) {
    this.userId = localStorage.getItem('userId');

    this.denomFormErrors = {
      note10: {},
      note20: {},
      note50: {},
      note100: {},
      note200: {},
      note500: {},
      note2000: {},
    };
    this.getaccountlist();

    this.orderForm = this.formBuilder.group({
      customerName: '',
      email: '',
      items: this.formBuilder.array([this.createItem()])
    });
  }
  
  createItem(): FormGroup {
    return this.formBuilder.group({
      accountId: '',
      contactPersonId: '',
      credit: ''
    });
  }

  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());

  }

  createAccountForm() {
    return this.formBuilder.group({
      note10: ['',],
      note20: ['',],
      note50: ['',],
      note100: ['',],
      note200: ['',],
      note500: ['',],
      note2000: ['',],

    });
  }

  ngOnInit() {
    this.denomForm = this.createAccountForm()
    this.denomForm.valueChanges.subscribe(() => {
      this.onaccountFormValuesChanged();
    });
  }

  getaccountlist() {
    let something: any;
    this.userService.getaccountlist1(this.userId).subscribe(result => {
      something = result
      this.accountlist1 = (something.result);
      console.log(this.accountlist1);
    },
      err => {
        console.log(err)
      })
  }
  onaccountFormValuesChanged() {
    console.log(this.denomForm.value);
    this.total =
      this.denomForm.value.note10 * 10 +
      this.denomForm.value.note20 * 20 +
      this.denomForm.value.note50 * 50 +
      this.denomForm.value.note100 * 100 +
      this.denomForm.value.note200 * 200 +
      this.denomForm.value.note500 * 500 +
      this.denomForm.value.note2000 * 2000;
  }
  submit() {
    console.log(this.items.value);
  }
}
