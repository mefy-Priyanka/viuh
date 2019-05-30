import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../.././service/shared.service';
import { ContactService } from '../.././service/contact.service';
import { CompanyService } from '../.././service/company.service';
import { ToastrService } from 'ngx-toastr';
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
  public voterIdDate: any = {};
  public othersData: any = [];
  public inputField: Boolean = false;
  public show:Boolean=true
  public imageUpload:any={};
  public pictureUpload={};
  public searchValue:any;
  public error:any;
  public imgUrlPrefix:any;
  public userId = localStorage.getItem('userId');
public mask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Account number validation 


  document = ['aadhar', 'voterId']

  constructor(private formBuilder: FormBuilder, private router: Router, private contactService: ContactService, private companyService: CompanyService,private SharedService: SharedService,private toastr: ToastrService,private sanitizer: DomSanitizer) {
    /*******ERRORS OF userForm ********* */
    this.employFormerrors = {
      name: {},
      phoneNumber: {}
    };
    /********** ENDS ************** */
  }

  ngOnInit() {
    this.employForm = this.createemployForm()
    this.employForm.valueChanges.subscribe(() => {
      this.onemployFormValuesChanged();
    });
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
      number: [''],
      doc_name:[''],
      doc:[''],
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
    if (this.selecteValue == 'aadhar') {
      let data = {
        aadhar: {
          number: this.employForm.value.number,
          doc: this.imageUpload,
        }
      }
      console.log(data)
      this.aadharData = data
      console.log('data', this.aadharData)
    }
    else if (this.selecteValue == 'voterId') {
      let data = {
        voterId: {
          number: this.employForm.value.number,
          valid_upto: this.employForm.value.valid_upto,
          doc: this.imageUpload,
        }
      }
      console.log(data)
      this.voterIdDate = data
      console.log('data', this.voterIdDate)
    }
    
    else if (this.selecteValue == 'others') {
      let data = {
        others: {
          doc_name: this.employForm.value.name,
          number: this.employForm.value.number,
          valid_upto: this.employForm.value.valid_upto,
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
    this.employForm.controls['doc_name'].reset()
    this.employForm.controls['doc'].reset()            //empty these fied after add
    this.employForm.controls['number'].reset()
    this.employForm.controls['valid_upto'].reset()
    this.employForm.controls['list'].reset()
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
    }, err => {
      this.loader=false;
    this.toastr.error('Error!', ' failed')        
      console.log('err preview',err)
    })
}

  /*********************CREATE EMPLOYEE ****************** */
  createDriver() {
    this.loader=true;
    if(this.employForm.valid){
    console.log('valid')
    let data = {
      name: this.employForm.value.name,
      phoneNumber: this.employForm.value.phoneNumber,
      aadhar: this.aadharData.aadhar,
      voterId: this.voterIdDate.voterId,
      others: this.othersData,
      picture:this.pictureUpload?this.pictureUpload:null,
      userId: this.userId
    }
    console.log(data)
    this.contactService.employee(data).subscribe(value => {
      console.log('value', value)
      this.loader=false;
      this.toastr.success('Driver created')
      this.router.navigate(['dashboard/contact'])
    },
    err=>{
      this.loader=false;
      console.log(err)
      this.toastr.error('Error!', 'Creation  failed')
    })
  }
    else{
      this.loader=false;
      this.submitted=true
      console.log('not valid')
      this.toastr.warning( 'Not Valid')
    }
  }
  /********** ENDS ************** */


}
