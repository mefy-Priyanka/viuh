import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../.././service/shared.service';
import { ContactService } from '../.././service/contact.service';


@Component({
  selector: 'app-contact-driver',
  templateUrl: './contact-driver.component.html',
  styleUrls: ['./contact-driver.component.css']
})
export class ContactDriverComponent implements OnInit {
  public driverFormErrors: any;
  public driverForm: FormGroup;
  public submitted: boolean = false;
  public loader: boolean;
  public selecteValue={}
   document=['aadhar','licence','training_certificate','police_verification']
  constructor(private formBuilder: FormBuilder, private router: Router, private contactService: ContactService, private SharedService: SharedService) {
    /*******ERRORS OF userForm ********* */
    this.driverFormErrors = {
      name: {},
      phoneNumber: {}
    };
    /********** ENDS ************** */
  }

  ngOnInit() {
    this.driverForm = this.createDriverForm()
    this.driverForm.valueChanges.subscribe(() => {
      this.onDriverFormValuesChanged();
    });
  }
  /***********IT CATCHES ALL CHANGES IN FORM*******/
  onDriverFormValuesChanged() {
    for (const field in this.driverFormErrors) {
      if (!this.driverFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.driverFormErrors[field] = {};
      // Get the control
      const control = this.driverForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.driverFormErrors[field] = control.errors;
      }
    }
  }
  /********** ENDS ************** */
  /********DRIVER FORM ********** */
  createDriverForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      valid_upto:[''],
      number:['']

    });
  }
  /********** ENDS ************** */
  selectedValue(x){
this.selecteValue=x
console.log('selectes value',this.selecteValue)
  }

/*********************CREATE DRIVER ****************** */
createDriver(){
  if(this.driverForm.valid){
    console.log('valid')
    let data={
      name:this.driverForm.value.name,
      phoneNumber:this.driverForm.value.phoneNumber,
      aadhar:{
        number:this.driverForm.value.number,
        doc:this.driverForm.value.doc
      },
      licence:{
        number:this.driverForm.value.number,
        doc:this.driverForm.value.doc,
        valid_upto:this.driverForm.value.valid_upto
      },
      training_certificate:{
        number:this.driverForm.value.number,
        doc:this.driverForm.value.doc,
        valid_upto:this.driverForm.value.valid_upto
      }
    }

  }
  else{
    console.log('not valid')
  }
}
  /********** ENDS ************** */

}
