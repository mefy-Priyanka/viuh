import { Component, OnInit,OnDestroy } from '@angular/core';
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
  selector: 'app-contact-driver',
  templateUrl: './contact-driver.component.html',
  styleUrls: ['./contact-driver.component.css']
})
export class ContactDriverComponent implements OnDestroy,OnInit   {
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
  public accountDetail:any=[];
  public docDetail:any=[];
  public inputField: Boolean = false;
  public show:Boolean=true
  public imageUpload:any={};
  public pictureUpload={};
  public searchValue:any;
  public error:any;
  public imgUrlPrefix:any;
  public contactId:any;
  public incomingDriverDetail:any={};
  public updatedContactData:any;
  public userId = localStorage.getItem('userId');
public mask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Account number validation 


  document = ['aadhar', 'licence', 'training_certificate', 'police_verification']
  currentURL: string;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private contactService: ContactService,private userService: UserService, private companyService: CompanyService,private SharedService: SharedService,private toastr: ToastrService,private sanitizer: DomSanitizer) {
    /*******ERRORS OF userForm ********* */
    this.driverFormErrors = {
      name: {},
      phoneNumber: {}
    };
    /********** ENDS ************** */
    /******************DRIVER DETAIL THROUGH SHARED SERVICES ************/
this.SharedService.contactData.subscribe(result =>{
      console.log('contact  edit driver',result)
      this.incomingDriverDetail= result;
    },
    err=>{
console.log(' driver shared err',err)
    })
 
    /********** ENDS ************** */

  
  }

  ngOnInit() {
    this.driverForm = this.createDriverForm()
    this.driverForm.valueChanges.subscribe(() => {
      this.onDriverFormValuesChanged();
    });
    // this.getAccountDetail();
    // this.account();
    this.driverProfile(); 
  }
  ngOnDestroy(): void {
    console.log('foo destroy')
    if(this.incomingDriverDetail!=null){
    console.log('detail destroy')
    this.SharedService.contactData.next('');
console.log(this.incomingDriverDetail)

    }
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
      number: ['',Validators.required],
      doc_name:[''],
      doc:['',Validators.required],
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
    // console.log('valid',this.driverForm.valid)
    console.log(this.selecteValue)
    if(Object.keys(this.selecteValue).length != 0 && this.selecteValue.constructor != Object){
    if(this.driverForm.valid){
    if (this.selecteValue == 'aadhar') {
        let data = {
          aadhar: {
            number: this.driverForm.value.number,
            doc: this.imageUpload,
          }      
        }
        console.log(data)
        this.aadharData = data
        this.docDetail.push( { docname:'Aadhar',number: data.aadhar.number  })
        console.log('data', this.aadharData)
      // console.log('dadocDetailta', this.docDetail)

 
    }
    else if (this.selecteValue == 'licence') {
      let data = {
        licence: {
          number: this.driverForm.value.number,
          valid_upto: moment(this.driverForm.value.valid_upto).toISOString(),
          doc: this.imageUpload,
        }
      }
      this.licenceData = data
      this.docDetail.push( { docname:'Licence',number: data.licence.number ,valid_upto:data.licence.valid_upto})
      console.log('data', this.licenceData)
    }
    else if (this.selecteValue == 'training_certificate') {
      let data = {
        training_certificate: {
          number: this.driverForm.value.number,
          valid_upto:  moment(this.driverForm.value.valid_upto).toISOString(),
          doc: this.imageUpload,
        }

      }
      console.log(data)
      this.trainingData = data
      this.docDetail.push( { docname:'Training Certificate',number: data.training_certificate.number ,valid_upto:data.training_certificate.valid_upto })

      console.log('data', this.trainingData)
    }
    else if (this.selecteValue == 'police_verification') {
      let data = {
        police_verification: {
          number: this.driverForm.value.number,
          valid_upto:  moment(this.driverForm.value.valid_upto).toISOString(),
          doc: this.imageUpload,
        }
      }
      console.log(data)
      this.policeData = data
      this.docDetail.push( { docname:'Police Verification',number: data.police_verification.number ,valid_upto:data.police_verification.valid_upto })
      console.log('data', this.policeData)

    }
    else if (this.selecteValue == 'others') {
      let data = {
        others:{
          doc_name: this.driverForm.value.doc_name,
          number: this.driverForm.value.number,
          valid_upto: moment(this.driverForm.value.valid_upto).toISOString(),
          doc: this.imageUpload,
        }
      }
      this.othersData.push(data.others)
  //     for(let i =0;i < this.othersData.length; i++){
  //       this.docDetail.push({docname:this.othersData[i].doc_name,number:this.othersData[i].number?this.othersData[i].number:null,valid_upto:this.othersData[i].valid_upto})
  //  }
   this.docDetail.push({docname:data.others.doc_name,number:data.others.number?data.others.number:null,valid_upto:data.others.valid_upto})

      console.log('push', this.othersData)
    } 
    this.driverForm.controls['doc_name'].reset()
    // this.driverForm.controls['doc'].reset()            //empty these fied after add
    // this.driverForm.controls['number'].reset()
    this.driverForm.controls['valid_upto'].reset()
    this.driverForm.controls['list'].reset()
  }
  else{
    console.log('empty')
    this.toastr.warning( " can't be empty")
  }
    }
else{
  console.log('hey',this.selecteValue)
  this.error='Document Type can not be empty'
}
}



  /********** END ************** */

  /************************ *Preview  DOCTOR"S Profile Picture***********************************/
  uploadDoc(event) {
    console.log(this.driverForm.value.doc)
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

  /*********************CREATE DRIVER ****************** */
  createDriver() {
    this.loader=true;
    console.log('dfbhflicendse data',this.licenceData)
    if (Object.keys(this.incomingDriverDetail).length != 0) {
      this.updateDriver();
    }
    else{
    if(this.driverForm.valid){
    console.log('valid')
    // console.log('Object.getOwnPropertyNames(obj).length === 0',Object.getOwnPropertyNames(this.licenceData).length != 0)
    if(Object.keys(this.pictureUpload).length != 0 && this.pictureUpload.constructor != Object && Object.getOwnPropertyNames(this.licenceData).length != 0){
      let data = {
      name: this.driverForm.value.name,
      phoneNumber: this.driverForm.value.phoneNumber,
      aadhar: this.aadharData.aadhar,
      licence: this.licenceData.licence,
      training_certificate: this.trainingData.training_certificate,
      police_verification: this.policeData.police_verification,
      others: this.othersData,
      picture:this.pictureUpload?this.pictureUpload:null,
      contact_type: "driver",
      userId: this.userId
    }
    console.log(data)
    this.contactService.contactCreate(data).subscribe(value => {
      console.log('value', value)
      let result:any={}
      result=value
      this.contactId=result.result._id
      this. creatcheckaccount();
      this.loader=false;
      this.toastr.success('Driver created')     
      // this.driverForm.reset();
      this.SharedService.abc('contact')
    },
    err=>{
      this.loader=false;
      console.log(err)
      this.toastr.error('Error!', 'Creation  failed')
    })
  }
  else if(Object.getOwnPropertyNames(this.licenceData).length != 0){
    let data = {
      name: this.driverForm.value.name,
      phoneNumber: this.driverForm.value.phoneNumber,
      aadhar: this.aadharData.aadhar,
      licence: this.licenceData.licence,
      training_certificate: this.trainingData.training_certificate,
      police_verification: this.policeData.police_verification,
      others: this.othersData,
      contact_type: "driver",
      userId: this.userId
    }
    console.log(data)
    this.contactService.contactCreate(data).subscribe(value => {
      console.log('value', value)
      let result:any={}
      result=value
      this.contactId=result.result._id
      this. creatcheckaccount();
      this.loader=false;
      // this.driverForm.reset();
      this.SharedService.abc('contact')
    },
    err=>{
      this.loader=false;
      console.log(err)
      this.toastr.error('Error!', 'Creation  failed')
    })
  }
  else{
    this.toastr.error('Error!', 'Driving Licence is compulsory')
    this.loader=false;
  }
}  
    else{
      this.loader=false;
      this.submitted=true
      console.log('not valid')
      this.toastr.warning( 'Not Valid')
    }
  }
  }
  /********** ENDS ************** */
  cancel(){
    this.SharedService.abc('contact')
  }
  // getAccountDetail(){
  //   this.userService.getAccountDetail('Driver','Expense').subscribe(data=>{
  //     console.log('account detail',data)
  //     let value:any={};
  //     value=data
  //    this. accountDetail=value.result
  //   })
  // }
  /**************CRATE ACCOUNT AGAINST DRIVER ***********************/


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
      this.driverAccount()

    },
      err => {
        console.log(err)

        this.toastr.error('Error!', 'Server Error')
      })
  }



  driverAccount(){  
    let data={
      accountName:this.driverForm.value.name,
      accountType:'Expense',
      organisation:localStorage.getItem('organisation'),
      parentAccount:'',
      userId:this.userId,
      super_parent_Account:''
    }
    console.log(' account data',data)
    this.userService.creataccount(data).subscribe(result=>{
      this.loader=false;
      console.log('resultttt',result);
      this.creataccountinpayable();
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
  
  creataccountinpayable() {    

    let data = {
      accountName: this.driverForm.value.name,
      accountType: "Liability",
      description: "description",
      // accountCode: this.contractorForm.value.account_number,
      organisation: localStorage.getItem('organisation'),
      userId: this.userId,
      parentAccount: "Account Payable",
      super_parent_Account:'Current Liability'
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

  /********* ENDS ************** */
  /*****************************  DRIVER profile info**********************/
  driverProfile() {
console.log('driber detai;',this.incomingDriverDetail);
// console.log('object',Object.keys(this.incomingDriverDetail))
if(Object.keys(this.incomingDriverDetail).length != 0){

 if(this.incomingDriverDetail.picture!=null){
  this.show=false; 
  this.imgUrlPrefix =this.incomingDriverDetail.picture? this.sanitizer.bypassSecurityTrustResourceUrl("http://ec2-52-66-250-48.ap-south-1.compute.amazonaws.com:4052/file/getImage?imageId="+this.incomingDriverDetail.picture):null;
  console.log(' this.previewImage', this.imgUrlPrefix);
  this.driverForm.get('name').setValue(this.incomingDriverDetail.name);
  this.driverForm.get('phoneNumber').setValue(this.incomingDriverDetail.phoneNumber);
  this.incomingDriverDetail.police_verification?this.docDetail.push( { docname:'Police Verification',number: this.incomingDriverDetail.police_verification.number ,valid_upto:this.incomingDriverDetail.police_verification.valid_upto}):'';
  this.incomingDriverDetail.aadhar?this.docDetail.push( { docname:'Aadhar',number: this.incomingDriverDetail.aadhar.number}):''
  this.incomingDriverDetail.licence?this.docDetail.push( { docname:'Licence',number: this.incomingDriverDetail.licence.number ,valid_upto:this.incomingDriverDetail.licence.valid_upto}):'';
  this.incomingDriverDetail.training_certificate?this.docDetail.push( { docname:'training_certificate',number: this.incomingDriverDetail.training_certificate.number ,valid_upto:this.incomingDriverDetail.training_certificate.valid_upto}):'';
  this.incomingDriverDetail.police_verification?this.docDetail.push( { docname:'Police Verification',number: this.incomingDriverDetail.police_verification?this.incomingDriverDetail.police_verification.number:'' ,valid_upto:this.incomingDriverDetail.police_verification.valid_upto}):'';
  for(let i =0;i < this.incomingDriverDetail.others.length; i++){
    this.docDetail.push({docname:this.incomingDriverDetail.others[i].doc_name,number:this.incomingDriverDetail.others[i].number?this.incomingDriverDetail.others[i].number:null,valid_upto:this.incomingDriverDetail.others[i].valid_upto})
  }
}
else{
  this.driverForm.get('name').setValue(this.incomingDriverDetail.name);
this.driverForm.get('phoneNumber').setValue(this.incomingDriverDetail.phoneNumber);
this.incomingDriverDetail.police_verification?this.docDetail.push( { docname:'Police Verification',number: this.incomingDriverDetail.police_verification.number ,valid_upto:this.incomingDriverDetail.police_verification.valid_upto}):'';
this.incomingDriverDetail.aadhar?this.docDetail.push( { docname:'Aadhar',number: this.incomingDriverDetail.aadhar.number}):''
this.incomingDriverDetail.licence?this.docDetail.push( { docname:'Licence',number: this.incomingDriverDetail.licence.number ,valid_upto:this.incomingDriverDetail.licence.valid_upto}):'';
this.incomingDriverDetail.training_certificate?this.docDetail.push( { docname:'training_certificate',number: this.incomingDriverDetail.training_certificate.number ,valid_upto:this.incomingDriverDetail.training_certificate.valid_upto}):'';
this.incomingDriverDetail.police_verification?this.docDetail.push( { docname:'Police Verification',number: this.incomingDriverDetail.police_verification?this.incomingDriverDetail.police_verification.number:'' ,valid_upto:this.incomingDriverDetail.police_verification.valid_upto}):'';
for(let i =0;i < this.incomingDriverDetail.others.length; i++){
  this.docDetail.push({docname:this.incomingDriverDetail.others[i].doc_name,number:this.incomingDriverDetail.others[i].number?this.incomingDriverDetail.others[i].number:null,valid_upto:this.incomingDriverDetail.others[i].valid_upto})
}
}

    }
    else{
      console.log('create')
    }
 
  }
  /************************************************ ENDS ************************************************ */
  /************************* UPDATE DRIVER PROFILE****************************/
 updateDriver(){
  // console.log(this.incomingDriverDetail.others?this.incomingDriverDetail.others.push(this.othersData.others):this.othersData.others)
  console.log('others data',this.othersData)
  // console.log('others ush',this.incomingDriverDetail.others.push(this.othersData))
  // for(let i =0;i < this.incomingDriverDetail.others.length; i++){
    // console.log('this.othersData[i].doc_name',this.othersData[i].doc_name)
    // this.incomingDriverDetail.others.push({doc_name:this.othersData[i].doc_name,number:this.othersData[i].number?this.othersData[i].number:null,valid_upto:this.othersData[i].valid_upto?this.othersData[i].valid_upto:null})
// }
console.log('others data incoming', this.incomingDriverDetail.others)
   let data={
    phoneNumber: this.driverForm.value.phoneNumber,
    aadhar: this.aadharData.aadhar?this.aadharData.aadhar:this.incomingDriverDetail.aadhar,
    licence: this.licenceData.licence?this.licenceData.licence:this.incomingDriverDetail.licence,
    training_certificate: this.trainingData.training_certificate?this.trainingData.training_certificate:this.incomingDriverDetail.training_certificate,
    police_verification: this.policeData.police_verification?this.policeData.police_verification:this.incomingDriverDetail.police_verification,
    // others: this.incomingDriverDetail.others?this.incomingDriverDetail.others.push(this.othersData):this.othersData,
    picture:Object.keys(this.pictureUpload).length != 0 && this.pictureUpload.constructor != Object?this.pictureUpload:this.incomingDriverDetail.picture,
    contactId:this.incomingDriverDetail._id,

    // others:this.incomingDriverDetail.others
   } 
  //  let others=[]
  //   others=this.incomingDriverDetail.others.push({doc_name:this.othersData[0].doc_name,doc:this.othersData[0].doc?this.othersData[0].doc:null,number:this.othersData[0].number?this.othersData[0].number:null,valid_upto:this.othersData[0].valid_upto?this.othersData[0].valid_upto:null})
  //   console.log('others',others)
  //  console.log('fgfghhkjkljjvn',this.incomingDriverDetail)

    
    // console.log('kya kari',this.incomingDriverDetail.others.push({doc_name:this.othersData[0].doc_name,doc:this.othersData[0].doc?this.othersData[0].doc:null,number:this.othersData[0].number?this.othersData[0].number:null,valid_upto:this.othersData[0].valid_upto?this.othersData[0].valid_upto:null}))

   console.log('data',data)
  //  console.log('data.others',data.others)

   this.contactService.upadteContact(data).subscribe(result=>{
     console.log('result',result)
     this.toastr.success('Driver updated')     
     this.SharedService.abc('contact')
   },
   error=>{
    this.toastr.success('Driver  not updated')     
     console.log('update error',error.message)
   })
 }
  /************************************************ ENDS ************************************************ */

/****************FIRST TIME ACCOUNT CREATION **************************/
// account(){
//   let data={
//     accountName:'Driver',
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
