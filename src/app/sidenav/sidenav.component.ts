import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { UserService } from '../service/user.service';
import { CompanyService } from '../service/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  dieselrate='';
  public accountdata: boolean = true;
  public userId:any={};
  public accountId: any={};
  public userDetail:any={};  /***********LOGIN USER DETAIL *************/
  constructor(private router: Router, private SharedService: SharedService,public userService: UserService,private CompanyService: CompanyService, private toastr: ToastrService) { 
    this.userId = localStorage.getItem('userId');   /************** LOGIN USER ID FECTCH FROM LOCAL STORAGE****/
    console.log("loginId",this.userId);
    this.getdiesel()
}
  // **************dashboard toggle*********************
  abc(a){
    this.SharedService.abc(a);
    // this.router.navigate(['/dashboard/fleet']);
    console.log('Data sent',a);
  }
  // **************dashboard toggle*********************
    
  ngOnInit() {
    this.getUserDetail();
  }
  // *****UserInfo***********
getUserDetail(){
  this.userService.logininfo(this.userId).subscribe(data=>{
    console.log(data)
    let result :any={}
    result=data;
    this.userDetail=result.result
    

  },

  error=>{
    console.log(error)
  })
}
   /********************END*******************************/
  /*************logout**************/
  logout() {
    localStorage.clear();
     this.router.navigate(['/login']);
     console.log("logout");
  }
    /* ************END**************/


    savedieselrate(){
      let data={
        diesel_price:this.dieselrate,
        userId:localStorage.getItem('userId')
      }
      this.CompanyService.creatdiesel(data).subscribe(value => {
        this.toastr.success('Congo!', 'diesel Created '),
          console.log('user', value)
        let result: any = {}
        result = value;
        this.getdiesel()
      },
        err => {
          console.log(err)

          this.toastr.error('Error!', 'Server Error')
        })
    }
getdiesel(){
  let something:any;
  let i=0;
  this.CompanyService.getdiesel(localStorage.getItem('SuperAdmin')).subscribe(result=>{
    console.log(result);
    something=result;
    this.dieselrate=something.result[something.result.length-1].diesel_price
  },
  err=>{
    console.log(err)
  })
}
}
