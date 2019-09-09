import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewcontractor',
  templateUrl: './viewcontractor.component.html',
  styleUrls: ['./viewcontractor.component.css']
})
export class ViewcontractorComponent implements OnInit {




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
superadminid: string;
contractor:any=[];
gstmask = [/\d/, /\d/, /[A-Z]/, /[A-Z]/, /[A-Z]/, /[A-Z]/, /[A-Z]/, /\d/, /\d/, /\d/, /\d/, /[A-Z]/, /[1-9A-Z]/, /\Z/, /[0-9A-Z]/];
panmask = [/[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /\d/, /\d/, /\d/, /\d/, /[a-zA-z]/]
public ifscmask = [ /[A-Z]/,/[A-Z]/,/[A-Z]/,/[A-Z]/, /\d/, /[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/] // bank ifsc

constructor(private formBuilder: FormBuilder,
  private router: Router, private companyService:
    CompanyService, private userService: UserService, private toastr: ToastrService, private SharedService: SharedService) {
      this.SharedService.somedata.subscribe(data => {
        console.log('data',data);
        this.contractor=data.data;
        console.log(this.contractor)
      });
      this.companyId=this.contractor.companyId;
      this.tradeId=this.contractor.tradeLicenseId;
      this.gst=this.contractor.gstId;
      this.invoice=this.contractor.invoiceId;
      this.pan=this.contractor.panId;
      this.reg=this.contractor.regId;

  this.superadminid = localStorage.getItem('SuperAdmin');

  this.userId = localStorage.getItem('userId');
  console.log(this.superadminid, this.userId);
  this.contractorFormErrors = {
    commission_percent: {},

    email: {},
    contactPersonName: {},
    companyName: {},
    address: {},
    regNo: {},
    phoneNumber: {},
    currency: {},
    gstNo: {},
    tradeLicenseNo: {},
    invoiceNo: {},
    panCard: {},


    bank_name: {},
    branch_name: {},
    account_holder_name: {},
    account_number: {},
    ifsc: {},


  };

}
createContractorForm() {
  return this.formBuilder.group({
    email: [this.contractor.email, [Validators.required, Validators.email]],
    contactPersonName: [this.contractor.contactPersonName, Validators.required],
    companyName: [this.contractor.companyName,],
    regNo: [this.contractor.regNo],
    gstNo: [this.contractor.gstNo],
    tradeLicenseNo: [this.contractor.tradeLicenseNo],
    invoiceNo:[this.contractor.invoiceNo,],
    panCard: [this.contractor.panCard, Validators.required],
    address: [this.contractor.address, Validators.required],
    currency: [this.contractor.currency, Validators.required],
    phoneNumber: [this.contractor.phoneNumber, Validators.required],


    bank_name: [this.contractor.bank_name, Validators.required],
    branch_name: [this.contractor.branch_name, Validators.required],
    account_holder_name: [this.contractor.account_holder_name, Validators.required],
    account_number: [this.contractor.account_number, Validators.required],
    ifsc: [this.contractor.ifsc, Validators.required],
    commission_percent: [this.contractor.commission_percent, Validators.required],

  });
}
showContent() {
  // this.submitted = true;
  this.fieldinput = !this.fieldinput;

  // if (this.contractorForm.valid) {
  //   this.fieldinput = !this.fieldinput;
  //   this.submitted = false;
  // }

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
      contactPersonName: this.contractorForm.value.contactPersonName,
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
      address: this.contractorForm.value.address,
      companyLogo: this.companyId,
      currency: this.contractorForm.value.currency,
      phoneNumber: this.contractorForm.value.phoneNumber,
      bank_name: this.contractorForm.value.bank_name,
      branch_name: this.contractorForm.value.branch_name,
      account_holder_name: this.contractorForm.value.account_holder_name,
      account_number: this.contractorForm.value.account_number,
      ifsc: this.contractorForm.value.ifsc,
      userId: this.userId,
      superAdminId: this.superadminid,
      contractorId:this.contractor._id,
      commission_percent: this.contractorForm.value.commission_percent

      // commission_percent:''
    }
    console.log('let data be', data);
    this.companyService.updateContractor(data).subscribe(value => {
      this.submitted = false;
      this.toastr.success('Congo!', 'Successfully Created'),
        console.log('user', value)
      let result: any = {}
      result = value;

      this.contractorForm.reset();
      this.loader = false;
      this.SharedService.abc('contractorlist');
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
