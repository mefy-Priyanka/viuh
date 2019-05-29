import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../.././service/shared.service';
import { ContactService } from '../.././service/contact.service';
import { CompanyService } from '../.././service/company.service';



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
  public selecteValue = {};
  public aadharData: any = {};
  public trainingData: any = {};
  public policeData: any = {};
  public licenceData: any = {};
  public othersData: any = [];
  public inputField: Boolean = false;
  public imageUpload:any={};
  public searchValue:any;
  public userId = localStorage.getItem('userId');

  document = ['aadhar', 'licence', 'training_certificate', 'police_verification']
  constructor(private formBuilder: FormBuilder, private router: Router, private contactService: ContactService, private companyService: CompanyService,private SharedService: SharedService) {
    /*******ERRORS OF userForm ********* */
    this.driverFormErrors = {
      name: {},
      phoneNumber: {}
    };
    /********** ENDS ************** */
    this.searchValue = ' '
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
      valid_upto: [''],
      number: [''],
      doc_name:['']


    });
  }
  /********** ENDS ************** */
  /*************SELECTED DROP DOWN VALUE ***********************/
  selectedValue(value) {
    this.selecteValue = value
    console.log('selectes value', this.selecteValue)
    console.log('field value', this.inputField)
    if (this.selecteValue == 'others') {
      this.inputField = true;
    }
    else {
      this.inputField = false;
    }

  }
  /********** ENDS ************** */
  /*********************STORE DOCUMENT DATA **************/
  add() {
    if (this.selecteValue == 'aadhar') {
      let data = {
        aadhar: {
          number: this.driverForm.value.number,
          doc: this.imageUpload,
        }
      }
      console.log(data)
      this.aadharData = data
      console.log('data', this.aadharData)
    }
    else if (this.selecteValue == 'licence') {
      let data = {
        licence: {
          number: this.driverForm.value.number,
          valid_upto: this.driverForm.value.valid_upto,
          doc: this.imageUpload,
        }
      }
      console.log(data)
      this.licenceData = data
      console.log('data', this.licenceData)
    }
    else if (this.selecteValue == 'training_certificate') {
      let data = {
        training_certificate: {
          number: this.driverForm.value.number,
          valid_upto: this.driverForm.value.valid_upto,
          doc: this.imageUpload,
        }

      }
      console.log(data)
      this.trainingData = data
      console.log('data', this.trainingData)
    }
    else if (this.selecteValue == 'police_verification') {
      let data = {
        police_verification: {
          number: this.driverForm.value.number,
          valid_upto: this.driverForm.value.valid_upto,
          doc: this.imageUpload,
        }
      }
      console.log(data)
      this.policeData = data
      console.log('data', this.policeData)

    }
    else if (this.selecteValue == 'others') {
      let data = {
        others: {
          name: this.driverForm.value.name,
          number: this.driverForm.value.number,
          valid_upto: this.driverForm.value.valid_upto,
          doc: this.imageUpload,
        }
      }
      this.othersData.push(data.others)
      console.log('push', this.othersData)

    }
    this.searchValue = ' ';
  }

  /********** END ************** */

  /************************ *Preview  DOCTOR"S Profile Picture***********************************/
  upload(event) {
    this.loader=true;
    let fileList: FileList = event.target.files;
    let fileTarget = fileList;
    let file: File = fileTarget[0];
    console.log("File information :", file.name);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log("File information :", formData);
    this.companyService.fileUpload(formData).subscribe(result => {
      console.log('file uploaded', result)
      let value:any={}
      value=result
      this.imageUpload=value.upload._id;
      // this.imageUpload=value.imageId
      // let data = {
      //   profileImage: this.imageUpload
      // }
      }, err => {
        
        console.log(err)
      })
 
  }

  /**************************************** ENDS *************************************************************** */


  /*********************CREATE DRIVER ****************** */
  createDriver() {
    if(this.driverForm.valid){
    console.log('valid')
    let data = {
      name: this.driverForm.value.name,
      phoneNumber: this.driverForm.value.phoneNumber,
      aadhar: this.aadharData.aadhar,
      licence: this.licenceData.licence,
      training_certificate: this.trainingData.training_certificate,
      police_verification: this.policeData.police_verification,
      others: this.othersData,
      picture:this.imageUpload,
      userId: this.userId
    }
    console.log(data)
    this.contactService.driver(data).subscribe(value => {
      console.log('value', value)
    })
  }
    else{
      console.log('not valid')
    }
  }
  /********** ENDS ************** */

}
  