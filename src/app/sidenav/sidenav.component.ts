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
  public loginId:any={};
  public accountId: any;
  constructor(private router: Router, private SharedService: SharedService,public userService: UserService) { 
    this.loginId = localStorage.getItem('userId');
    console.log("loginId",this.loginId);

}
  // **************dashboard toggle*********************
  abc(a){
    this.SharedService.abc(a);
    console.log('Data sent');
  }
  // **************dashboard toggle*********************
    
  ngOnInit() {
    this.getuserDetail();
  }
  // *****UserInfo***********
  getuserDetail(){
    console.log('ggg',this.loginId)
  this.userService.getlogininfo(this.loginId).subscribe(data => {
    console.log('data', data)
    },
    err=>{
      console.log(err)
    })
  }
   /******END***********/
  /*************logout**************/
  logout() {
    localStorage.clear();
     this.router.navigate(['/login']);
     console.log("logout");
  }
    /* ************END**************/
}
