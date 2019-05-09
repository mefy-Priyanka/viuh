import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../service/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createcontractor',
  templateUrl: './createcontractor.component.html',
  styleUrls: ['./createcontractor.component.css']
})
export class CreatecontractorComponent implements OnInit {

  
  @ViewChild('regId') regId: ElementRef;
  @ViewChild('companyLogo') companyLogo: ElementRef;
  @ViewChild('tradeLicenseId') tradeLicenseId: ElementRef;
  @ViewChild('gstId') gstId: ElementRef;
  @ViewChild('invoiceId') invoiceId: ElementRef;
  @ViewChild('panId') panId: ElementRef;




  fieldinput: boolean = true;
  userId: string;
  public contractorFormErrors: any;
  contractorForm: FormGroup;
  submitted: boolean;
  loader: boolean;
  companyId: any;
  tradeId: any;
  gst: any;
  invoice: any;
  pan: any;
  reg: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private companyService:
     CompanyService, private toastr: ToastrService) {

    this.userId = localStorage.getItem('userId');

    this.contractorFormErrors = {
      email: {},
      contactPersonName: {},
      companyName: {},
      Address: {},
      regNo: {},
      phoneNumber: {},
      currency: {},
      gstNo: {},
      tradeLicenseNo: {},
      invoiceNo: {},
      panCard: {},
    };

  }
  createContractorForm(){
    return this.formBuilder.group({
      email: ['',[ Validators.required,Validators.email]],
      contactPersonName: ['', Validators.required],
      companyName: ['', Validators.required],
      regNo: ['', Validators.required],
      gstNo: ['', Validators.required],
      tradeLicenseNo: ['', Validators.required],
      invoiceNo: ['', Validators.required],
      panCard: ['', Validators.required],
      Address: ['', Validators.required],
      currency: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }
  showContent() {
    this.fieldinput = !this.fieldinput;
  }
  ngOnInit() {
    this.contractorForm = this.createContractorForm()

    this.contractorForm.valueChanges.subscribe(() => {
      this.onContractorFormValuesChanged();
    });
  }

  onContractorFormValuesChanged() {
    for (const field in this.contractorFormErrors) {
      if (!this.contractorFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.contractorFormErrors[field] = {};
      // Get the control
      const control = this.contractorForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.contractorFormErrors[field] = control.errors;
      }
    }
  }

  FormSubmit() {
    console.log(this.contractorForm.value)
    this.submitted = true;
    this.loader = true;
    if (this.contractorForm.valid) {
      let data = {
        email: this.contractorForm.value.email,
        companyName: this.contractorForm.value.companyName,
        regNo: this.contractorForm.value.regNo,
        regId: this.reg,
        gstNo: this.contractorForm.value.gstNo,
        gstId: this.gst,
        tradeLicenseNo: this.contractorForm.value.tradeLicenseNo,
        tradeLicenseId: this.tradeId,
        invoiceNo: this.contractorForm.value.invoiceNo,
        invoiceId: this.invoice,
        panCard: this.contractorForm.value.panCard,
        panId: this.pan,
        Address: this.contractorForm.value.Address,
        companyLogo: this.companyId,
        currency: this.contractorForm.value.currency,
        phoneNumber: this.contractorForm.value.phoneNumber,
        userId: this.userId

      }
      console.log('let data be',data);
      this.companyService.createContractor(data).subscribe(value => {
        this.submitted = false;
        this.toastr.success('Congo!', 'Successfully Created'),
          console.log('user', value)
        let result: any = {}
        result = value
        this.contractorForm.reset();
        this.loader = false;
      },
        err => {
          console.log(err)
          this.submitted = false;
          this.loader = false;
          this.toastr.error('Error!', 'Server Error')
          this.contractorForm.reset();
        })
      console.log("data", data);
    }
  }

  upload(event, type) {
    console.log(this.userId)
    console.log(event + 'file upload' + type)
    // console.log(event.target)
    let fileList: FileList = event.target.files;
    let fileTarget = fileList;
    let file: File = fileTarget[0];
    console.log("File information :", file.name);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.loader = true;
    this.companyService.fileUpload(formData).subscribe(response => {
      this.loader = false;
      this.toastr.success('Great !', 'File Successfully Uploaded'),
        console.log(response);
      let result: any = {};
      result = response;
      if (type == "companyLogo") {
        this.companyId = result.upload._id;
      }
      else if (type == "tradeLicenseId") {
        this.tradeId = result.upload._id;
      }
      else if (type == "gstId") {
        this.gst = result.upload._id;
      }
      else if (type == "invoiceId") {
        this.invoice = result.upload._id;
      }
      else if (type == "panId") {
        this.pan = result.upload._id;
      }
      else if (type == "regId") {
        this.reg = result.upload._id;
      }

      console.log(this.contractorForm.value)
    }, err => {
      console.log(err);
      this.reset(type);
      this.loader = false;
      
      this.toastr.error('oops !', 'File Upload Failed');

    });
  }
reset(type) {
  if (type == "companyLogo") {
    this.companyLogo.nativeElement.value = "";
  }
  else if (type == "tradeLicenseId") {
    this.tradeLicenseId.nativeElement.value = "";
  }
  else if (type == "gstId") {
    this.gstId.nativeElement.value = "";
  }
  else if (type == "invoiceId") {
    this.invoiceId.nativeElement.value = "";
  }
  else if (type == "panId") {
    this.panId.nativeElement.value = "";
  }
  else if (type == "regId") {
    this.regId.nativeElement.value = "";

  }

}
}
