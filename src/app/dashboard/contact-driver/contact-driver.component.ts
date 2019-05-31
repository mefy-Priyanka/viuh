import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../.././service/shared.service';
import { ContactService } from '../.././service/contact.service';
import { CompanyService } from '../.././service/company.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';




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
  public show:Boolean=true
  public imageUpload:any={};
  public pictureUpload={};
  public searchValue:any;
  public error:any;
  public imgUrlPrefix:any;
  public userId = localStorage.getItem('userId');
public mask = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Account number validation 


  document = ['aadhar', 'licence', 'training_certificate', 'police_verification']

  constructor(private formBuilder: FormBuilder, private router: Router, private contactService: ContactService, private companyService: CompanyService,private SharedService: SharedService,private toastr: ToastrService,private sanitizer: DomSanitizer) {
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
          doc_name: this.driverForm.value.name,
          number: this.driverForm.value.number,
          valid_upto: this.driverForm.value.valid_upto,
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
    this.driverForm.controls['doc_name'].reset()
    // this.driverForm.controls['doc'].reset()            //empty these fied after add
    // this.driverForm.controls['number'].reset()
    this.driverForm.controls['valid_upto'].reset()
    this.driverForm.controls['list'].reset()
  }
  else{
    console.log('empty')
    this.toastr.warning( "Document or Doc number can't be empty")
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

  /*********************CREATE DRIVER ****************** */
  createDriver() {
    this.loader=true;
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
      picture:this.pictureUpload?this.pictureUpload:null,
      contact_type: "driver",
      userId: this.userId
    }
    console.log(data)
    this.contactService.contactCreate(data).subscribe(value => {
      console.log('value', value)
      this.loader=false;
      this.toastr.success('Driver created')
      this.router.navigate(['/dashboard'])
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
  