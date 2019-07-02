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
  selector: 'app-contactcustomer',
  templateUrl: './contactcustomer.component.html',
  styleUrls: ['./contactcustomer.component.css']
})
export class ContactcustomerComponent implements OnInit {

  public customerFormErrors: any;
  public customerForm: FormGroup;
  public submitted: boolean = false;
  public loader: boolean;
  public selecteValue = {};
  public aadharData: any = {};
  public panData: any = {};
  public tanData: any = {};
  public gstData: any = {};
  public othersData: any = [];
  public inputField: Boolean = false;
  public show:Boolean=true
  public imageUpload:any={};
  public pictureUpload={};
  public searchValue:any;
  public error:any;
  public imgUrlPrefix:any;
  public contactId:any;
  public accountId:any;
  public userId = localStorage.getItem('userId');
public mask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Account number validation 


  document = ['aadhar', 'gst', 'pan', 'tan']

  constructor(private formBuilder: FormBuilder, private router: Router,private userService: UserService, private contactService: ContactService, private companyService: CompanyService,private SharedService: SharedService,private toastr: ToastrService,private sanitizer: DomSanitizer) {
    /*******ERRORS OF userForm ********* */
    this.customerFormErrors = {
      name: {},
      phoneNumber: {},
      company_name:{},
      website:{},
      email:{}
    };
    /********** ENDS ************** */
  }

  ngOnInit() {
    this.customerForm = this.createcustomerForm()
    this.customerForm.valueChanges.subscribe(() => {
      this.oncustomerFormValuesChanged();
    });
    // this.account();
  }
   /***********IT CATCHES ALL CHANGES IN FORM*******/
   oncustomerFormValuesChanged() {
    for (const field in this.customerFormErrors) {
      if (!this.customerFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.customerFormErrors[field] = {};
      // Get the control
      const control = this.customerForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.customerFormErrors[field] = control.errors;
      }
    }
  }
  /********** ENDS ************** */
  /********DRIVER FORM ********** */
  createcustomerForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      website:[''],
      company_name:['',[Validators.required]],
      valid_upto: [''],
      number: ['',[Validators.required]],
      doc_name:[''],
      doc:['',[Validators.required]],
      list:[''],
      picture:['']
    });
  }
  /********** ENDS ************** */
  /*************SELECTED DROP DOWN VALUE ***********************/
  selectedValue(value) {
    this.selecteValue = value
    console.log('selectes value', this.selecteValue)
    this.error=''
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
    if(this.customerForm.valid){
    if (this.selecteValue == 'aadhar') {
      let data = {
        aadhar: {
          number: this.customerForm.value.number,
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
          number: this.customerForm.value.number,
          valid_upto: this.customerForm.value.valid_upto,
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
          number: this.customerForm.value.number,
          valid_upto: this.customerForm.value.valid_upto,
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
          number: this.customerForm.value.number,
          valid_upto: this.customerForm.value.valid_upto,
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
          doc_name: this.customerForm.value.name,
          number: this.customerForm.value.number,
          valid_upto: this.customerForm.value.valid_upto,
          doc: this.imageUpload,
        }
      }
      this.othersData.push(data.others)
      console.log('push', this.othersData)
    } 
    else {
      console.log('hey',this.selecteValue)
this.error='Document Type can not be empty'

    }
    this.customerForm.controls['doc_name'].reset()
    // this.customerForm.controls['doc'].reset()            //empty these fied after add
    // this.customerForm.controls['number'].reset()
    this.customerForm.controls['valid_upto'].reset()
    this.customerForm.controls['list'].reset()
  }
  else{
    console.log('empty')
    this.toastr.warning( "Document or Doc number can't be empty")
  }
  }

  /********** END ************** */

  /************************ *Preview  DOCTOR"S Profile Picture***********************************/
  uploadDoc(event) {
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
      this.toastr.success('Document upload')
      let value:any={}
      value=result
      this.loader=false;
      this.imageUpload=value.upload._id;  
      }, err => {
        this.loader=false;
      this.toastr.error('Error!', ' failed')        
        console.log('err doc',err)
      })
 
  }
   
  



  /**************************************** ENDS *************************************************************** */
uploadImage(event){
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
    this.pictureUpload=value.upload._id;
    this.show=false;  
    this.imgUrlPrefix = this.sanitizer.bypassSecurityTrustResourceUrl("http://ec2-52-66-250-48.ap-south-1.compute.amazonaws.com:4052/file/getImage?imageId="+this.pictureUpload);
     console.log(' this.previewImage', this.imgUrlPrefix)
     this.loader=false;
    }, err => {
      this.loader=false;
    this.toastr.error('Error!', ' failed')        
      console.log('err preview',err)
    })
}

  /*********************CREATE CUSTOMER***************** */
  createCustomer() {
    this.loader=true;
    if(this.customerForm.valid){
    console.log('valid')
    if(Object.keys(this.pictureUpload).length != 0 && this.pictureUpload.constructor != Object){
    let data = {
      name: this.customerForm.value.name,
      phoneNumber: this.customerForm.value.phoneNumber,
      website:this.customerForm.value.website,
      company_name:this.customerForm.value.company_name,
      email:this.customerForm.value.email,
      aadhar: this.aadharData.aadhar,
      gst: this.gstData.gst,
      pan: this.panData.pan,
      tan: this.tanData.tan,
      others: this.othersData,
      picture:this.pictureUpload?this.pictureUpload:null,
      contact_type: "customer",
      userId: this.userId
    }
    console.log(data)
    this.contactService.contactCreate(data).subscribe(value => {
      console.log('value', value)
      let result:any={}
      result=value
      this.contactId=result.result._id;
      this.customerAccount();
      this.loader=false;
      this.toastr.success('Customer created')
      this.SharedService.abc('contact')
    },
    err=>{
      this.loader=false;
      console.log(err)
      this.toastr.error('Error!', 'Creation  failed')
    })
  }
  else{
    let data = {
      name: this.customerForm.value.name,
      phoneNumber: this.customerForm.value.phoneNumber,
      website:this.customerForm.value.website,
      company_name:this.customerForm.value.company_name,
      email:this.customerForm.value.email,
      aadhar: this.aadharData.aadhar,
      gst: this.gstData.gst,
      pan: this.panData.pan,
      tan: this.tanData.tan,
      others: this.othersData,
      contact_type: "customer",
      userId: this.userId
    }
    console.log(data)
    this.contactService.contactCreate(data).subscribe(value => {
      console.log('value', value)
      let result:any={}
      result=value
      this.contactId=result.result._id
      this.customerAccount()
      this.loader=false;
      this.toastr.success('Customer created')
      this.SharedService.abc('contact')
    },
    err=>{
      this.loader=false;
      console.log(err)
      this.toastr.error('Error!', 'Creation  failed')
    })
  }
}
    else{
      this.loader=false;
      this.submitted=true
      console.log('not valid')
      this.toastr.warning( 'Not Valid')
    }
  }
  /********** ENDS ************** */
  cancel(){
    this.SharedService.abc('contact')
  }
  /**************CRATE ACCOUNT AGAINST CUSTOMER ***********************/
  customerAccount(){
    let data={
      accountName:this.customerForm.value.name,
      accountType:'Revenue',
      organisation:localStorage.getItem('organisation'),
      parentAccount:'Customer',
      userId:this.userId
    }
    console.log(' account data',data)
    this.userService.creataccount(data).subscribe(result=>{
      this.loader=false;
      console.log('resultttt',result)
      let value:any
      value=result
      this.accountId=value.user._id
      this.creataccountinpayable()
    
    },
    err=>{
      console.log('account err',err)
      this.toastr.error('Error!', 'Creation  failed')
      this.contactService.deleteContact(this.contactId).subscribe(result=>{
        this.loader=false;
        console.log('delete result',result);
      },
      err=>{
        this.loader=false;
        console.log('delete err',err)
      })
    })
  }
  /********** ENDS ************** */
  /****************FIRST TIME ACCOUNT CREATION **************************/
// account(){
//   let data={
//     accountName:'Customer',
//     accountType:'Revenue',
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
  creataccountinpayable() {    
    let data = {
      accountName: this.customerForm.value.name,
      accountType: "Asset",
      description: "Description",
      organisation: localStorage.getItem('organisation'),
      userId: this.userId,
      parentAccount: "Customer",
      super_parent_Account:'Account Receivable'
    }

    console.log('let data be', data);
    this.userService.creataccount(data).subscribe(value => {
      console.log('user', value)
      let result: any = {}
      result = value
      console.log('Account Payable',result)
    },
      err => {
        console.log(err)
        this.contactService.deleteContact(this.contactId).subscribe(result=>{
          this.loader=false;
          console.log('delete result',result);
        },
        err=>{
          this.userService.deleteAccount(this.accountId).subscribe(result=>{

          },
          error=>{
            console.log('error',error)
          })
          this.loader=false;
          console.log('delete err',err)
        })
        this.toastr.error('Error!', 'Server Error')
      })
  }
}

