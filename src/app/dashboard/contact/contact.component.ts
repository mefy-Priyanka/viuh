import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../service/shared.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  userId: string;
  role: string;
  organisation: string;
  // contactFormErrors: {};
  contactypelist = [];
  contactForm: FormGroup;
  submitted: boolean;
  loader: boolean;
  contactlist=[];
  contactFormErrors: { email: any; phoneNumber: any; company_name: any; contactType: any; website: any; };

  constructor(private SharedService:SharedService,private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');
    this.organisation = localStorage.getItem('organisation');

    this.contactFormErrors = {
      email: {},
      phoneNumber: {},
      company_name: {},
      contactType: {},
      website: {},
    };
  }


  createcontactForm() {
    return this.formBuilder.group({
      email: ['',[ Validators.required,Validators.email]],
      phoneNumber: ['', Validators.required],
      company_name: ['', Validators.required],
      contactType: ['', Validators.required],
      website: ['', Validators.required],
    });
  }

  oncontactFormValuesChanged() {
    for (const field in this.contactFormErrors) {
      if (!this.contactFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.contactFormErrors[field] = {};
      // Get the control
      const control = this.contactForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.contactFormErrors[field] = control.errors;
      }
    }
  }





  ngOnInit() {
   
    this.contactForm = this.createcontactForm()
    this.contactForm.valueChanges.subscribe(() => {
      this.oncontactFormValuesChanged();
    });
  }

cancel(){
  this.SharedService.abc('contact');

}
  submit() {
  
    this.submitted = true;
    this.loader = true;
    if (this.contactForm.valid) {
      let data = {
        email: this.contactForm.value.email,
        phoneNumber: this.contactForm.value.phoneNumber,
        company_name: this.contactForm.value.company_name,
        contactType: this.contactForm.value.contactType,
        website: this.contactForm.value.website,
        adminId: this.userId
      }
      console.log('let data be', data);
      // this.userService.creatcontact(data).subscribe(value => {
      //   this.submitted = false;
      //   this.toastr.success('Congo!', 'contact Successfully Created'),
      //     console.log('user', value)
      //   let result: any = {}
      //   result = value
      //   this.contactForm.reset();
      //   this.loader = false;
      //   this.SharedService.abc('contact');
      // },
      //   err => {
      //     console.log(err)
      //     this.submitted = false;
      //     this.loader = false;
      //     this.toastr.error('Error!', 'Server Error')
      //     this.contactForm.reset();
      //   })
     
    }
   
  }



}
