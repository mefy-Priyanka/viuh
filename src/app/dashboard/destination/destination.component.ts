import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, } from '@angular/forms';
import { SharedService } from '../../service/shared.service';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinationDetail=[];
  destinationList=[];
  tableDetail=[];
  public destinationForm: FormGroup;
  destinationFormErrors: {};
  public submitted: boolean = false;
  loader: boolean;
  public destination:boolean=true;

 
  constructor(private SharedService: SharedService,private formBuilder: FormBuilder, private CompanyService: CompanyService ,private toastr: ToastrService) { 
    this.destinationFormErrors = {
      customerId: {},
      details:{}
    };
  }

  ngOnInit() {
    this.customerList();
   this.tableList();
    this.destinationForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      details: this.formBuilder.array([])
    })
    // this.createdestinationForm()
     this.addPhone();
    this.destinationForm.valueChanges.subscribe(() => {
      this.ondestinationFormValuesChanged();
    });
  }

 /***********IT CATCHES ALL CHANGES IN FORM*******/
 ondestinationFormValuesChanged() {
  for (const field in this.destinationFormErrors) {
    if (!this.destinationFormErrors.hasOwnProperty(field)) {
      continue;
    }
    // Clear previous errors
    this.destinationFormErrors[field] = {};
    // Get the control
    const control = this.destinationForm.get(field);

    if (control && control.dirty && !control.valid) {
      this.destinationFormErrors[field] = control.errors;
    }
  }
}


  tableList(){
    let data={
      superAdminId:localStorage.getItem('SuperAdmin'),
    }
    this.CompanyService.destinationList(data).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.tableDetail = result.result
      console.log("TableDetail",this.tableDetail);
      this.loader = false;
    },
      error => {
        console.log(error);
        this.loader = false;

      })
  }
  get lForms() {
    return this.destinationForm.get('details') as FormArray
  }

  addPhone() {

    const cdetail = this.formBuilder.group({ 

      location_name: ['', Validators.required],

      location_code: ['', Validators.required],
      address: ['', Validators.required],
      km: ['', Validators.required], 
      freight:['', Validators.required],
      point_of_origin:['',Validators.required],
      serial_number:this.lForms.length+1
    })
  
    this.lForms.push(cdetail);
    
  }
  del(){
    this.lForms.removeAt(this.lForms.length-1)
  }



  // createdestinationForm() {
  //   return this.formBuilder.group({
  //     customerId: ['', Validators.required],
  //     location_name: ['', Validators.required],
  //     location_code: ['', Validators.required],
  //     address: ['', Validators.required],
  //   });
  // }


  customerList(){
    let data={
      superAdminId:localStorage.getItem('SuperAdmin'),
      contact_type:'customer'
    }
    this.CompanyService.destination(data).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.destinationDetail = result.result
      console.log(this.destinationDetail);
      // this.loader = false;
    },
      error => {
        console.log(error);
        // this.loader = false;

      })
  }
  createDestination(){
    this.destination=!this.destination;
  }
  saveForm(){
    this.submitted = true;
    this.loader = true;
    if (this.destinationForm.valid) {
      this.submitted = false;
    let data={
      customerId:this.destinationForm.value.customerId,
      userId:localStorage.getItem('userId'),
      details:this.destinationForm.value.details
    }
    console.log(data);
    this.CompanyService.destinationCreate(data).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.destinationList = result.result
      console.log("List",this.destinationList);
      this.loader = false;
      this.toastr.success('Awesome!', 'Destination created successfully');
      this.createDestination();
      this.tableList()
    },
      error => {
        console.log(error);
        this.loader = false;
        this.toastr.error('Error!', 'Server Error')

      })
  }
  else {
    alert('please provide all details')
    this.loader = false;
  }
  }
  delete(id){
    this.CompanyService.deletedestination(id).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'Destination deleted successfully');
      // this.getfleetList();
      this.tableList();
    },
      err => {
        console.log(err)
        this.toastr.error('Error!', 'Server Error')
      })
  }
}
