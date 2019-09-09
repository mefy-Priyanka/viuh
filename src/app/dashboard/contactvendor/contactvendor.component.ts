import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../.././service/shared.service';
import { ContactService } from '../.././service/contact.service';
import { CompanyService } from '../.././service/company.service';
import { UserService } from '../.././service/user.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
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
  public docDetail: any = [];
  public inputField: Boolean = false;
  public show: Boolean = true
  public imageUpload: any = {};
  public pictureUpload = {};
  public searchValue: any;
  public error: any;
  public imgUrlPrefix: any;
  public accountId: any;
  public contactId: any;
  public userId = localStorage.getItem('userId');
  public incomingVendorDetail: any = {}
  public mask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Account number validation 
  public account = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Account number validation 
  public ifscmask = [ /[A-Z]/,/[A-Z]/,/[A-Z]/,/[A-Z]/, /\d/, /[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/] // bank ifsc


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
    /******************VENDOR DETAIL THROUGH SHARED SERVICES ************/
    this.SharedService.contactData.subscribe(result => {
      console.log('contact  edit VENDOR', result)
      this.incomingVendorDetail = result;
    },
      err => {
        console.log(' Vendor shared err', err)
      })

    /********** ENDS ************** */
  }

  ngOnInit() {
    this.vendorForm = this.createvendorForm()
    this.vendorForm.valueChanges.subscribe(() => {
      this.onvendorFormValuesChanged();
    });
    // this.account();
    this.vendorProfile();
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
        this.docDetail.push({ docname: 'Aadhar', number: data.aadhar.number })
        console.log('data', this.aadharData)
      }
      else if (this.selecteValue == 'gst') {
        let data = {
          gst: {
            number: this.vendorForm.value.number,
            valid_upto: moment(this.vendorForm.value.valid_upto).toISOString(),
            doc: this.imageUpload,
          }
        }
        console.log(data)
        this.gstData = data
        this.docDetail.push({ docname: 'Gst', number: data.gst.number, valid_upto: data.gst.valid_upto })
        console.log('data', this.gstData)
      }
      else if (this.selecteValue == 'pan') {
        let data = {
          pan: {
            number: this.vendorForm.value.number,
            valid_upto: moment(this.vendorForm.value.valid_upto).toISOString(),
            doc: this.imageUpload,
          }

        }
        console.log(data)
        this.panData = data
        this.docDetail.push({ docname: 'Pan', number: data.pan.number, valid_upto: data.pan.valid_upto })
        console.log('data', this.panData)
      }
      else if (this.selecteValue == 'tan') {
        let data = {
          tan: {
            number: this.vendorForm.value.number,
            valid_upto: moment(this.vendorForm.value.valid_upto).toISOString(),
            doc: this.imageUpload,
          }
        }
        console.log(data)
        this.tanData = data
        this.docDetail.push({ docname: 'Tan', number: data.tan.number, valid_upto: data.tan.valid_upto })
        console.log('data', this.tanData)

      }
      else if (this.selecteValue == 'others') {
        let data = {
          others: {
            doc_name: this.vendorForm.value.name,
            number: this.vendorForm.value.number,
            valid_upto: moment(this.vendorForm.value.valid_upto).toISOString(),
            doc: this.imageUpload,
          }
        }
        this.othersData.push(data.others)
        this.docDetail.push({ docname: data.others.doc_name, number: data.others.number ? data.others.number : null, valid_upto: data.others.valid_upto })
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
    if (Object.keys(this.incomingVendorDetail).length != 0) {
      this.updateVendor();
    }
    else {
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
            this.contactId = result.result._id
            this.creatcheckaccount();
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
            this.contactId = result.result._id
            this.creatcheckaccount();
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
  }
  /********** ENDS ************** */
  cancel() {
    this.SharedService.abc('contact')
  }
  /**************CREATE ACCOUNT AGAINST VENDOR ***********************/

  creatcheckaccount() {

    let data = {
      accountName: 'Current Liability',
      accountType: "Liability",
      description: "description",
      // accountCode: this.bankForm.value.account_number,
      organisation: localStorage.getItem('organisation'),
      userId: this.userId,
      parentAccount: "",
      super_parent_Account: '',
      opening_account: 0,
      type: 'credit',
    }

    console.log('let data be', data);
    this.userService.creataccount(data).subscribe(value => {
      console.log(value)
      this.creatcheckaccount1()

    },
      err => {
        console.log(err)

        this.toastr.error('Error!', 'Server Error')
      })
  }

  creatcheckaccount1() {

    let data = {
      accountName: 'Account Payable',
      accountType: "Liability",
      description: "description",
      // accountCode: this.bankForm.value.account_number,
      organisation: localStorage.getItem('organisation'),
      userId: this.userId,
      parentAccount: "Current Liability",
      super_parent_Account: '',
      opening_account: 0,
      type: 'credit',
    }

    console.log('let data be', data);
    this.userService.creataccount(data).subscribe(value => {
      console.log(value)
      this.vendorAccount()

    },
      err => {
        console.log(err)

        this.toastr.error('Error!', 'Server Error')
      })
  }


  vendorAccount() {


    let data = {
      accountName: this.vendorForm.value.name,
      accountType: 'Expense',
      organisation: localStorage.getItem('organisation'),
      parentAccount: '',
      userId: this.userId,
      super_parent_Account: ''

    }
    console.log(' account data', data)
    this.userService.creataccount(data).subscribe(result => {
      console.log('resultttt', result)
      let value: any
      value = result
      this.accountId = value.user._id
      this.loader = false;
      this.creataccountinpayable();
    },
      err => {
        console.log('account err', err)
        this.toastr.error('Error!', 'Creation  failed')
        this.contactService.deleteContact(this.contactId).subscribe(result => {
          console.log('delete result', result);
          this.loader = false;
        },
          err => {

            this.loader = false;
            console.log('delete err', err)
          })
      })
  }

  creataccountinpayable() {

    let data = {
      accountName: this.vendorForm.value.name,
      accountType: "Liability",
      description: "description",
      // accountCode: this.contractorForm.value.account_number,
      organisation: localStorage.getItem('organisation'),
      userId: this.userId,
      parentAccount: "Account Payable",
      super_parent_Account: 'Current Liability'
    }

    console.log('let data be', data);
    this.userService.creataccount(data).subscribe(value => {
      console.log('user', value)
      let result: any = {}
      result = value
      console.log(result)

      this.toastr.success('Awesome!', 'Contractor created successfully')

    },
      err => {
        console.log(err)

        this.toastr.error('Error!', 'Server Error')
      })
  }
  /********** ENDS ************** */
  /*****************************  VENDOR profile info**********************/
  vendorProfile() {
    console.log('vendor detai;', this.incomingVendorDetail);
    if (Object.keys(this.incomingVendorDetail).length != 0) {
      if (this.incomingVendorDetail.picture != null) {
        this.show = false;
        this.imgUrlPrefix = this.incomingVendorDetail.picture ? this.sanitizer.bypassSecurityTrustResourceUrl("http://ec2-52-66-250-48.ap-south-1.compute.amazonaws.com:4052/file/getImage?imageId=" + this.incomingVendorDetail.picture) : null;
        console.log(' this.previewImage', this.imgUrlPrefix);
        this.vendorForm.get('name').setValue(this.incomingVendorDetail.name);
        this.vendorForm.get('phoneNumber').setValue(this.incomingVendorDetail.phoneNumber);
        this.vendorForm.get('bank_name').setValue(this.incomingVendorDetail.bank_name);
        this.vendorForm.get('branch_name').setValue(this.incomingVendorDetail.branch_name);
        this.vendorForm.get('account_holder_name').setValue(this.incomingVendorDetail.account_holder_name);
        this.vendorForm.get('ifsc').setValue(this.incomingVendorDetail.ifsc);
        this.vendorForm.get('account_number').setValue(this.incomingVendorDetail.account_number);
        this.incomingVendorDetail.gst ? this.docDetail.push({ docname: 'Gst', number: this.incomingVendorDetail.gst.number, valid_upto: this.incomingVendorDetail.gst.valid_upto }) : '';
        this.incomingVendorDetail.aadhar ? this.docDetail.push({ docname: 'Aadhar', number: this.incomingVendorDetail.aadhar.number }) : ''
        this.incomingVendorDetail.pan ? this.docDetail.push({ docname: 'Pan', number: this.incomingVendorDetail.pan.number, valid_upto: this.incomingVendorDetail.pan.valid_upto }) : '';
        this.incomingVendorDetail.tan ? this.docDetail.push({ docname: 'Tan', number: this.incomingVendorDetail.tan.number, valid_upto: this.incomingVendorDetail.tan.valid_upto }) : '';
        for (let i = 0; i < this.incomingVendorDetail.others.length; i++) {
          this.docDetail.push({ docname: this.incomingVendorDetail.others[i].doc_name, number: this.incomingVendorDetail.others[i].number ? this.incomingVendorDetail.others[i].number : null, valid_upto: this.incomingVendorDetail.others[i].valid_upto })
        }
      }
      else {
        this.vendorForm.get('name').setValue(this.incomingVendorDetail.name);
        this.vendorForm.get('phoneNumber').setValue(this.incomingVendorDetail.phoneNumber);
        this.vendorForm.get('bank_name').setValue(this.incomingVendorDetail.bank_name);
        this.vendorForm.get('branch_name').setValue(this.incomingVendorDetail.branch_name);
        this.vendorForm.get('account_holder_name').setValue(this.incomingVendorDetail.account_holder_name);
        this.vendorForm.get('ifsc').setValue(this.incomingVendorDetail.ifsc);
        this.vendorForm.get('account_number').setValue(this.incomingVendorDetail.account_number);
        this.incomingVendorDetail.gst ? this.docDetail.push({ docname: 'Gst', number: this.incomingVendorDetail.gst.number, valid_upto: this.incomingVendorDetail.gst.valid_upto }) : '';
        this.incomingVendorDetail.aadhar ? this.docDetail.push({ docname: 'Aadhar', number: this.incomingVendorDetail.aadhar.number }) : ''
        this.incomingVendorDetail.pan ? this.docDetail.push({ docname: 'Pan', number: this.incomingVendorDetail.pan.number, valid_upto: this.incomingVendorDetail.pan.valid_upto }) : '';
        this.incomingVendorDetail.tan ? this.docDetail.push({ docname: 'Tan', number: this.incomingVendorDetail.tan.number, valid_upto: this.incomingVendorDetail.tan.valid_upto }) : '';
        for (let i = 0; i < this.incomingVendorDetail.others.length; i++) {
          this.docDetail.push({ docname: this.incomingVendorDetail.others[i].doc_name, number: this.incomingVendorDetail.others[i].number ? this.incomingVendorDetail.others[i].number : null, valid_upto: this.incomingVendorDetail.others[i].valid_upto })
        }
      }

    }
    else {
      console.log('create')
    }

  }
  /************************************************ ENDS ************************************************ */
  /************************* UPDATE VENDOR PROFILE****************************/
  updateVendor() {
    console.log('others data incoming', this.incomingVendorDetail.others)
    let data = {
      phoneNumber: this.vendorForm.value.phoneNumber,
      email: this.vendorForm.value.email,
      aadhar: this.aadharData.aadhar ? this.aadharData.aadhar : this.incomingVendorDetail.aadhar,
      gst: this.gstData.gst ? this.gstData.gst : this.incomingVendorDetail.gst,
      pan: this.panData.pan ? this.panData.pan : this.incomingVendorDetail.pan,
      tan: this.tanData.tan ? this.tanData.tan : this.incomingVendorDetail.tan,
      // others: this.incomingVendorDetail.others?this.incomingVendorDetail.others.push(this.othersData):this.othersData,
      picture: Object.keys(this.pictureUpload).length != 0 && this.pictureUpload.constructor != Object ? this.pictureUpload : this.incomingVendorDetail.picture,
      contactId: this.incomingVendorDetail._id
    }
    console.log('data', data)
    this.contactService.upadteContact(data).subscribe(result => {
      console.log('result', result)
      this.toastr.success('Driver updated')
      this.SharedService.abc('contact')
    },
      error => {
        this.toastr.success('Driver  not updated')
        console.log('update error', error.message)
      })
  }
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
