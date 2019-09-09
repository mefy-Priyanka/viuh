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
  selector: 'app-contactemployee',
  templateUrl: './contactemployee.component.html',
  styleUrls: ['./contactemployee.component.css']
})
export class ContactemployeeComponent implements OnInit {
  public employFormerrors: any;
  public employForm: FormGroup;
  public submitted: boolean = false;
  public loader: boolean;
  public selecteValue = {};
  public aadharData: any = {};
  public voterIdData: any = {};
  public othersData: any = [];
  public inputField: Boolean = false;
  public show: Boolean = true
  public imageUpload: any = {};
  public pictureUpload = {};
  public searchValue: any;
  public error: any;
  public imgUrlPrefix: any;
  public accountId: any;
  public docDetail: any = [];
  public incomingEmployeeDetail: any = {};
  public userId = localStorage.getItem('userId');
  public mask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Phone number validation 
  public account = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Account number validation 
  public ifscmask = [ /[A-Z]/,/[A-Z]/,/[A-Z]/,/[A-Z]/, /\d/, /[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/] // bank ifsc


  document = ['aadhar', 'voterId']

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private contactService: ContactService, private companyService: CompanyService, private SharedService: SharedService, private toastr: ToastrService, private sanitizer: DomSanitizer) {
    /*******ERRORS OF userForm ********* */
    this.employFormerrors = {
      name: {},
      phoneNumber: {},
      branch_name: {},
      bank_name: {},
      account_holder_name: {},
      ifsc: {},
      account_number: {}
    };
    /********** ENDS ************** */
    /******************EMPLOYEE DETAIL THROUGH SHARED SERVICES ************/
    this.SharedService.contactData.subscribe(result => {
      console.log('contact  edit Employee', result)
      this.incomingEmployeeDetail = result;
    },
      err => {
        console.log(' employee shared err', err)
      })

    /********** ENDS ************** */
  }

  ngOnInit() {
    this.employForm = this.createemployForm()
    this.employForm.valueChanges.subscribe(() => {
      this.onemployFormValuesChanged();
    });
    this.employeeProfile();
    //  this.account();
  }
  /***********IT CATCHES ALL CHANGES IN FORM*******/
  onemployFormValuesChanged() {
    for (const field in this.employFormerrors) {
      if (!this.employFormerrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.employFormerrors[field] = {};
      // Get the control
      const control = this.employForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.employFormerrors[field] = control.errors;
      }
    }
  }
  /********** ENDS ************** */
  /********DRIVER FORM ********** */
  createemployForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      valid_upto: [''],
      number: ['', Validators.required],
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
    if (this.employForm.valid) {
      if (this.selecteValue == 'aadhar') {
        let data = {
          aadhar: {
            number: this.employForm.value.number,
            doc: this.imageUpload,
          }
        }
        console.log(data)
        this.aadharData = data
        this.docDetail.push({ docname: 'Aadhar', number: data.aadhar.number })
        console.log('data', this.aadharData)
      }
      else if (this.selecteValue == 'voterId') {
        let data = {
          voterId: {
            number: this.employForm.value.number,
            valid_upto: moment(this.employForm.value.valid_upto).toISOString(),
            doc: this.imageUpload,
          }
        }
        console.log(data)
        this.voterIdData = data
        this.docDetail.push({ docname: 'Voter Id', number: data.voterId.number, valid_upto: data.voterId.valid_upto })
        console.log('data', this.voterIdData)
      }

      else if (this.selecteValue == 'others') {
        let data = {
          others: {
            doc_name: this.employForm.value.name,
            number: this.employForm.value.number,
            valid_upto: moment(this.employForm.value.valid_upto).toISOString(),
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
      this.employForm.controls['doc_name'].reset()
      // this.employForm.controls['doc'].reset()            //empty these fied after add
      // this.employForm.controls['number'].reset()
      this.employForm.controls['valid_upto'].reset()
      this.employForm.controls['list'].reset()
    }
    else {
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

  /*********************CREATE EMPLOYEE ****************** */
  createEmployee() {
    if (Object.keys(this.incomingEmployeeDetail).length != 0) {
      this.updateEmployee();
    }
    else {
      this.loader = true;
      if (this.employForm.valid) {
        if (Object.keys(this.pictureUpload).length != 0 && this.pictureUpload.constructor != Object) {
          console.log('valid')
          let data = {
            name: this.employForm.value.name,
            phoneNumber: this.employForm.value.phoneNumber,
            aadhar: this.aadharData.aadhar,
            voterId: this.voterIdData.voterId,
            others: this.othersData,
            picture: this.pictureUpload ? this.pictureUpload : null,
            contact_type: "employee",
            bank_name: this.employForm.value.bank_name,
            branch_name: this.employForm.value.branch_name,
            account_holder_name: this.employForm.value.account_holder_name,
            ifsc: this.employForm.value.ifsc,
            account_number: this.employForm.value.account_number,
            userId: this.userId
          }
          console.log(data)
          this.contactService.contactCreate(data).subscribe(value => {
            console.log('value', value)
            let result: any = {}
            result = value
            this.accountId = result.result._id
            this.creatcheckaccount();
            this.loader = false;
            this.toastr.success('Employee created')
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
            name: this.employForm.value.name,
            phoneNumber: this.employForm.value.phoneNumber,
            aadhar: this.aadharData.aadhar,
            voterId: this.voterIdData.voterId,
            others: this.othersData,
            contact_type: "employee",
            bank_name: this.employForm.value.bank_name,
            branch_name: this.employForm.value.branch_name,
            account_holder_name: this.employForm.value.account_holder_name,
            ifsc: this.employForm.value.ifsc,
            account_number: this.employForm.value.account_number,
            userId: this.userId
          }
          console.log(data)
          this.contactService.contactCreate(data).subscribe(value => {
            console.log('value', value)
            let result: any = {}
            result = value
            this.accountId = result.result._id
            this.creatcheckaccount();
            this.loader = false;
            this.toastr.success('Employee created')
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
  /**************CRATE ACCOUNT AGAINST EMPLOYEE ***********************/


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
      this.employeeAccount()

    },
      err => {
        console.log(err)

        this.toastr.error('Error!', 'Server Error')
      })
  }





  employeeAccount() {
    let data = {
      accountName: this.employForm.value.name,
      accountType: 'Expense',
      organisation: localStorage.getItem('organisation'),
      parentAccount: '',
      userId: this.userId,
      super_parent_Account: ''

    }
    console.log(' account data', data)
    this.userService.creataccount(data).subscribe(result => {
      console.log('resultttt', result);
      this.creataccountinpayable()
      this.loader = false;
    },
      err => {
        console.log('account err', err)
        this.toastr.error('Error!', 'Creation  failed')
        this.userService.deleteAccount(this.accountId).subscribe(result => {
          this.loader = false;
          console.log('delete result', result);
        },
          err => {
            this.loader = false;
            console.log('delete err', err)
          })
      })
  }

  creataccountinpayable() {

    let data = {
      accountName: this.employForm.value.name,
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
  /*****************************  CUSTOMER profile info**********************/
  employeeProfile() {
    console.log('driber detai;', this.incomingEmployeeDetail);
    // console.log('object',Object.keys(this.incomingEmployeeDetail))
    if (Object.keys(this.incomingEmployeeDetail).length != 0) {

      if (this.incomingEmployeeDetail.picture != null) {
        this.show = false;
        this.imgUrlPrefix = this.incomingEmployeeDetail.picture ? this.sanitizer.bypassSecurityTrustResourceUrl("http://ec2-52-66-250-48.ap-south-1.compute.amazonaws.com:4052/file/getImage?imageId=" + this.incomingEmployeeDetail.picture) : null;
        console.log(' this.previewImage', this.imgUrlPrefix);
        this.employForm.get('name').setValue(this.incomingEmployeeDetail.name);
        this.employForm.get('phoneNumber').setValue(this.incomingEmployeeDetail.phoneNumber);
        this.employForm.get('bank_name').setValue(this.incomingEmployeeDetail.bank_name);
        this.employForm.get('branch_name').setValue(this.incomingEmployeeDetail.branch_name);
        this.employForm.get('account_holder_name').setValue(this.incomingEmployeeDetail.account_holder_name);
        this.employForm.get('ifsc').setValue(this.incomingEmployeeDetail.ifsc);
        this.employForm.get('account_number').setValue(this.incomingEmployeeDetail.account_number);
        this.incomingEmployeeDetail.aadhar ? this.docDetail.push({ docname: 'Aadhar', number: this.incomingEmployeeDetail.aadhar.number }) : ''
        this.incomingEmployeeDetail.voterId ? this.docDetail.push({ docname: 'Voter Id', number: this.incomingEmployeeDetail.voterId.number, valid_upto: this.incomingEmployeeDetail.voterId.valid_upto }) : '';
        for (let i = 0; i < this.incomingEmployeeDetail.others.length; i++) {
          this.docDetail.push({ docname: this.incomingEmployeeDetail.others[i].doc_name, number: this.incomingEmployeeDetail.others[i].number ? this.incomingEmployeeDetail.others[i].number : null, valid_upto: this.incomingEmployeeDetail.others[i].valid_upto })
        }
      }
      else {
        this.employForm.get('name').setValue(this.incomingEmployeeDetail.name);
        this.employForm.get('phoneNumber').setValue(this.incomingEmployeeDetail.phoneNumber);
        this.employForm.get('bank_name').setValue(this.incomingEmployeeDetail.bank_name);
        this.employForm.get('branch_name').setValue(this.incomingEmployeeDetail.branch_name);
        this.employForm.get('account_holder_name').setValue(this.incomingEmployeeDetail.account_holder_name);
        this.employForm.get('ifsc').setValue(this.incomingEmployeeDetail.ifsc);
        this.employForm.get('account_number').setValue(this.incomingEmployeeDetail.account_number);
        this.incomingEmployeeDetail.aadhar ? this.docDetail.push({ docname: 'Aadhar', number: this.incomingEmployeeDetail.aadhar.number }) : ''
        this.incomingEmployeeDetail.voterId ? this.docDetail.push({ docname: 'Voter Id', number: this.incomingEmployeeDetail.voterId.number, valid_upto: this.incomingEmployeeDetail.voterId.valid_upto }) : '';
        for (let i = 0; i < this.incomingEmployeeDetail.others.length; i++) {
          this.docDetail.push({ docname: this.incomingEmployeeDetail.others[i].doc_name, number: this.incomingEmployeeDetail.others[i].number ? this.incomingEmployeeDetail.others[i].number : null, valid_upto: this.incomingEmployeeDetail.others[i].valid_upto })
        }
      }

    }
    else {
      console.log('create')
    }

  }
  /************************************************ ENDS ************************************************ */
  /************************* UPDATE DRIVER PROFILE****************************/
  updateEmployee() {
    console.log('others data incoming', this.incomingEmployeeDetail.others)
    let data = {
      phoneNumber: this.employForm.value.phoneNumber,
      aadhar: this.aadharData.aadhar ? this.aadharData.aadhar : this.incomingEmployeeDetail.aadhar,
      voterId: this.voterIdData.voterId ? this.voterIdData.voterId : this.incomingEmployeeDetail.voterId,
      // others: this.incomingEmployeeDetail.others?this.incomingEmployeeDetail.others.push(this.othersData):this.othersData,
      picture: Object.keys(this.pictureUpload).length != 0 && this.pictureUpload.constructor != Object ? this.pictureUpload : this.incomingEmployeeDetail.picture,
      contactId: this.incomingEmployeeDetail._id
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
  //     accountName:'Employee',
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
  /********* ENDS ************** */
}
