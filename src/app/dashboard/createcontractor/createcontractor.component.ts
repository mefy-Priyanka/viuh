import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../service/shared.service';
import { UserService } from '../../service/user.service';


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
  superadminid: string;
  gstmask = [/\d/, /\d/, /[A-Z]/, /[A-Z]/, /[A-Z]/, /[A-Z]/, /[A-Z]/, /\d/, /\d/, /\d/, /\d/, /[A-Z]/, /[1-9A-Z]/, /\Z/, /[0-9A-Z]/];
  panmask = [/[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /[a-zA-z]/, /\d/, /\d/, /\d/, /\d/, /[a-zA-z]/]
  public ifscmask = [ /[A-Z]/,/[A-Z]/,/[A-Z]/,/[A-Z]/, /\d/, /[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/,/[0-9A-Z]/] // bank ifsc



  constructor(private formBuilder: FormBuilder,
    private router: Router, private companyService:
      CompanyService, private userService: UserService, private toastr: ToastrService, private SharedService: SharedService) {

    this.superadminid = localStorage.getItem('SuperAdmin');

    this.userId = localStorage.getItem('userId');
    this.contractorFormErrors = {
      email: {},
      contactPersonName: {},
      commision_percentage: {},
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
      email: ['', [Validators.required, Validators.email]],
      contactPersonName: ['', Validators.required],
      companyName: ['',],
      regNo: [''],
      gstNo: [''],
      tradeLicenseNo: [''],
      invoiceNo: ['',],
      panCard: ['', Validators.required],
      address: ['', Validators.required],
      currency: ['', Validators.required],
      phoneNumber: ['', Validators.required],


      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      account_holder_name: ['', Validators.required],
      account_number: ['', Validators.required],
      ifsc: ['', Validators.required],
      commision_percentage: ['', Validators.required],
    });
  }
  showContent() {
    this.submitted = true;
    if (this.contractorForm.valid) {
      this.fieldinput = !this.fieldinput;
      this.submitted = false;
    }

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
        commission_percent: this.contractorForm.value.commision_percentage
      }
      console.log('let data be', data);
      this.companyService.createContractor(data).subscribe(value => {
        this.submitted = false;
        this.toastr.success('Congo!', 'Successfully Created');
        console.log('user', value)
        let result: any = {}
        result = value;
        // this.creataccount();
        this.creatcheckaccount()
        // this.creataccountinpayable()
        // this.contractorForm.reset();
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

    console.log('account 1', data);
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

    console.log('account 12', data);
    this.userService.creataccount(data).subscribe(value => {
      console.log(value)
      this.creataccount()

    },
      err => {
        console.log(err)

        this.toastr.error('Error!', 'Server Error')
      })
  }

  creataccount() {

    let data = {
      accountName: this.contractorForm.value.companyName,
      accountType: "Expense",
      description: "description",
      // accountCode: this.contractorForm.value.account_number,
      organisation: localStorage.getItem('organisation'),
      userId: this.userId,
      parentAccount: "",
      super_parent_Account: '',
      opening_account: 0,
      type: 'credit',
    }
    console.log('account 13', data);
    this.userService.creataccount(data).subscribe(value => {
      console.log('user', value)
      let result: any = {}
      result = value
      console.log(result)
      this.creataccountinpayable()
      this.toastr.success('Awesome!', 'Contractor created successfully')

    },
      err => {
        console.log(err)

        this.toastr.error('Error!', 'Server Error')
      })
  }


  creataccountinpayable() {

    let data = {
      accountName: this.contractorForm.value.companyName,
      accountType: "Liability",
      description: "description",
      // accountCode: this.contractorForm.value.account_number,
      organisation: localStorage.getItem('organisation'),
      userId: this.userId,
      parentAccount: "Account Payable",
      super_parent_Account: 'Current Liability',
      opening_account: 0,
      type: 'credit',
    }

    console.log('account 14', data);
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



}
