import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../.././service/shared.service';
import { ContactService } from '../.././service/contact.service';
import { CompanyService } from '../.././service/company.service';
import { UserService } from '../.././service/user.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-contactvendor',
  templateUrl: './contactvendor.component.html',
  styleUrls: ['./contactvendor.component.css']
})
export class ContactvendorComponent implements OnInit {

  public vendorFormErrors: any;
  public vendorForm: FormGroup;
  public submitted: boolean = false;
  public loader: boolean;
  public selecteValue = {};
  public aadharData: any = {};
  public panData: any = {};
  public tanData: any = {};
  public gstData: any = {};
  public othersData: any = [];
  public inputField: Boolean = false;
  public show: Boolean = true
  public imageUpload: any = {};
  public pictureUpload = {};
  public searchValue: any;
  public error: any;
  public imgUrlPrefix: any;
  public accountId:any;
  public userId = localStorage.getItem('userId');
  public mask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Account number validation 
  public account = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Account number validation 


  document = ['aadhar', 'gst', 'pan', 'tan']

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private contactService: ContactService, private companyService: CompanyService, private SharedService: SharedService, private toastr: ToastrService, private sanitizer: DomSanitizer) {
    /*******ERRORS OF userForm ********* */
    this.vendorFormErrors = {
      name: {},
      phoneNumber: {},
      branch_name: {},
      bank_name: {},
      account_holder_name: {},
      ifsc: {},
      account_number: {}
    };
    /********** ENDS ************** */
  }

  ngOnInit() {
    this.vendorForm = this.createvendorForm()
    this.vendorForm.valueChanges.subscribe(() => {
      this.onvendorFormValuesChanged();
    });
    // this.account();
  }
  /***********IT CATCHES ALL CHANGES IN FORM*******/
  onvendorFormValuesChanged() {
    for (const field in this.vendorFormErrors) {
      if (!this.vendorFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.vendorFormErrors[field] = {};
      // Get the control
      const control = this.vendorForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.vendorFormErrors[field] = control.errors;
      }
    }
  }
  /********** ENDS ************** */
  /********DRIVER FORM ********** */
  createvendorForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      valid_upto: [''],
      number: ['', [Validators.required]],
      doc_name: [''],
      doc: ['', Validators.required],
      list: [''],
      picture: [''],
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_holder_name: ['', Validators.required],
      ifsc: ['', Validators.required],
      account_number: ['', Validators.required]
    });
  }
  /********** ENDS ************** */
  /*************SELECTED DROP DOWN VALUE ***********************/
  selectedValue(value) {
    this.selecteValue = value
    console.log('selectes value', this.selecteValue)
    this.error = ''
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
    if (this.vendorForm.valid) {
      if (this.selecteValue == 'aadhar') {
        let data = {
          aadhar: {
            number: this.vendorForm.value.number,
            doc: this.imageUpload,
          }
        }
        console.log(data)
        this.aadharData = data
        console.log('data', this.aadharData)
      }
      else if (this.selecteValue == 'gst') {
        let data = {
          gst: {
            number: this.vendorForm.value.number,
            valid_upto: this.vendorForm.value.valid_upto,
            doc: this.imageUpload,
          }
        }
        console.log(data)
        this.gstData = data
        console.log('data', this.gstData)
      }
      else if (this.selecteValue == 'pan') {
        let data = {
          pan: {
            number: this.vendorForm.value.number,
            valid_upto: this.vendorForm.value.valid_upto,
            doc: this.imageUpload,
          }

        }
        console.log(data)
        this.panData = data
        console.log('data', this.panData)
      }
      else if (this.selecteValue == 'tan') {
        let data = {
          tan: {
            number: this.vendorForm.value.number,
            valid_upto: this.vendorForm.value.valid_upto,
            doc: this.imageUpload,
          }
        }
        console.log(data)
        this.tanData = data
        console.log('data', this.tanData)

      }
      else if (this.selecteValue == 'others') {
        let data = {
          others: {
            doc_name: this.vendorForm.value.name,
            number: this.vendorForm.value.number,
            valid_upto: this.vendorForm.value.valid_upto,
            doc: this.imageUpload,
          }
        }
        this.othersData.push(data.others)
        console.log('push', this.othersData)
      }
      else {
        console.log('hey', this.selecteValue)
        this.error = 'Document Type can not be empty'

      }
      this.vendorForm.controls['doc_name'].reset()
      // this.vendorForm.controls['doc'].reset()            //empty these fied after add
      // this.vendorForm.controls['number'].reset()
      this.vendorForm.controls['valid_upto'].reset()
      this.vendorForm.controls['list'].reset()
    } else {
      console.log('empty')
      this.toastr.warning("Document or Doc number can't be empty")
    }
  }


  /********** END ************** */

  /************************ *Preview  DOCTOR"S Profile Picture***********************************/
  uploadDoc(event) {
    this.loader = true;
    let fileList: FileList = event.target.files;
    let fileTarget = fileList;
    let file: File = fileTarget[0];
    console.log("File information :", file.name);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log("File information :", formData);
    this.companyService.fileUpload(formData).subscribe(result => {
      console.log('file uploaded', result)
      this.toastr.success('Document upload')
      let value: any = {}
      value = result
      this.loader = false;
      this.imageUpload = value.upload._id;
    }, err => {
      this.loader = false;
      this.toastr.error('Error!', ' failed')
      console.log('err doc', err)
    })

  }





  /**************************************** ENDS *************************************************************** */
  uploadImage(event) {
    this.loader = true;
    let fileList: FileList = event.target.files;
    let fileTarget = fileList;
    let file: File = fileTarget[0];
    console.log("File information :", file.name);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log("File information :", formData);
    this.companyService.fileUpload(formData).subscribe(result => {
      console.log('file uploaded', result)
      let value: any = {}
      value = result
      this.pictureUpload = value.upload._id;
      this.show = false;
      this.imgUrlPrefix = this.sanitizer.bypassSecurityTrustResourceUrl("http://ec2-52-66-250-48.ap-south-1.compute.amazonaws.com:4052/file/getImage?imageId=" + this.pictureUpload);
      console.log(' this.previewImage', this.imgUrlPrefix)
      this.loader = false;
    }, err => {
      this.loader = false;
      this.toastr.error('Error!', ' failed')
      console.log('err preview', err)
    })
  }

  /*********************CREATE VENDOR***************** */
  createVendor() {
    this.loader = true;
    if (this.vendorForm.valid) {
      if (Object.keys(this.pictureUpload).length != 0 && this.pictureUpload.constructor != Object) {
        console.log('valid')
        let data = {
          name: this.vendorForm.value.name,
          phoneNumber: this.vendorForm.value.phoneNumber,
          aadhar: this.aadharData.aadhar,
          gst: this.gstData.gst,
          pan: this.panData.pan,
          tan: this.tanData.tan,
          others: this.othersData,
          picture: this.pictureUpload ? this.pictureUpload : null,
          contact_type: "vendor",
          bank_name: this.vendorForm.value.bank_name,
          branch_name: this.vendorForm.value.branch_name,
          account_holder_name: this.vendorForm.value.account_holder_name,
          ifsc: this.vendorForm.value.ifsc,
          account_number: this.vendorForm.value.account_number,
          userId: this.userId
        }
        console.log(data)
        this.contactService.contactCreate(data).subscribe(value => {
          console.log('value', value)
          let result: any = {}
          result = value
          this.accountId = result.result._id
          this.vendorAccount();
          this.loader = false;
          this.toastr.success('Vendor created')
          this.SharedService.abc('contact')
        },
          err => {
            this.loader = false;
            console.log(err)
            this.toastr.error('Error!', 'Creation  failed')
          })
      }
      else {
        let data = {
          name: this.vendorForm.value.name,
          phoneNumber: this.vendorForm.value.phoneNumber,
          aadhar: this.aadharData.aadhar,
          gst: this.gstData.gst,
          pan: this.panData.pan,
          tan: this.tanData.tan,
          others: this.othersData,
          contact_type: "vendor",
          bank_name: this.vendorForm.value.bank_name,
          branch_name: this.vendorForm.value.branch_name,
          account_holder_name: this.vendorForm.value.account_holder_name,
          ifsc: this.vendorForm.value.ifsc,
          account_number: this.vendorForm.value.account_number,
          userId: this.userId
        }
        console.log(data)
        this.contactService.contactCreate(data).subscribe(value => {
          console.log('value', value)
          let result: any = {}
          result = value
          this.accountId = result.result._id
          this.vendorAccount();
          this.loader = false;
          this.toastr.success('Vendor created')
          this.SharedService.abc('contact')
        },
          err => {
            this.loader = false;
            console.log(err)
            this.toastr.error('Error!', 'Creation  failed')
          })
      }
    }
    else {
      this.loader = false;
      this.submitted = true
      console.log('not valid')
      this.toastr.warning('Not Valid')
    }
  }
  /********** ENDS ************** */
  cancel() {
    this.SharedService.abc('contact')
  }
  /**************CREATE ACCOUNT AGAINST VENDOR ***********************/
  vendorAccount() {
    let data = {
      accountName: this.vendorForm.value.name,
      accountType: 'Expense',
      organisation: localStorage.getItem('organisation'),
      parentAccount: 'Vendor',
      userId: this.userId
    }
    console.log(' account data', data)
    this.userService.creataccount(data).subscribe(result => {
      console.log('resultttt', result)
      this.loader=false;
    },
      err => {
        console.log('account err', err)
        this.toastr.error('Error!', 'Creation  failed')
        this.userService.deleteAccount(this.accountId).subscribe(result => {
          console.log('delete result', result);
          this.loader=false;
        },
          err => {

            this.loader=false;
            console.log('delete err', err)
          })
      })
  }
  /********** ENDS ************** */
/****************FIRST TIME ACCOUNT CREATION **************************/

  // account(){
  //   let data={
  //     accountName:'Vendor',
  //     accountType:'Expense',
  //     organisation:localStorage.getItem('organisation'),
  //     userId:this.userId
  //   }
  //   console.log(' account data',data)
  //   this.userService.creataccount(data).subscribe(result=>{
  //     this.loader=false;
  //     console.log('resultttt',result)
  //   },
  //   err=>{
  //     console.log('account err',err)
  //     this.toastr.error('Error!', 'Creation  failed')
  //   })
  // }
  /********** ENDS ************** */

}
