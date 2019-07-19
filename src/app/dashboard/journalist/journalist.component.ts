import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-journalist',
  templateUrl: './journalist.component.html',
  styleUrls: ['./journalist.component.css']
})
export class JournalistComponent implements OnInit {
  journalist: boolean=true;;
  journalDetail=[];

  constructor(private userService: UserService, 
    private SharedService :SharedService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getjournalList()
  }
  addjournal() {
    this.journalist = false;
    this.SharedService.abc('journalcreate');
    // this.SharedService.abc('contractordetail');
    console.log("hi t");
  }

  getjournalList() {
    this.userService.journalList(localStorage.getItem('userId')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.journalDetail = result.result
      console.log(this.journalDetail)
    },
      error => {
        console.log(error);

      })
  }

  gotoview(data){
    let data1={
      page:'journal',
      data:data
    }
    this.SharedService.datatravel(data1);

    this.SharedService.abc('journalview');

  }
}
