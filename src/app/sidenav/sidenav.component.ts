import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public accountdata: boolean = true;
  public userId:any={};
  public accountId: any={};
  public userDetail:any={};  /***********LOGIN USER DETAIL *************/
  constructor(private router: Router, private SharedService: SharedService,public userService: UserService) { 
    this.userId = localStorage.getItem('userId');   /************** LOGIN USER ID FECTCH FROM LOCAL STORAGE****/
    console.log("loginId",this.userId);

}
  // **************dashboard toggle*********************
  abc(a){
    this.SharedService.abc(a);
    console.log('Data sent');
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
}
