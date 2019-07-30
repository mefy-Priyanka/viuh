import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/service/company.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-petrolformview',
  templateUrl: './petrolformview.component.html',
  styleUrls: ['./petrolformview.component.css']
})
export class PetrolformviewComponent implements OnInit {

  lists = []
  constructor(private SharedService: SharedService, private userService: UserService, private CompanyService: CompanyService, private toastr: ToastrService) {

  }



  ngOnInit() {
    this.getpetrolprice()
  }

  add() {
    this.SharedService.abc('petrolsadd');
  }
  getpetrolprice() {
    this.userService.getpetrol(localStorage.getItem('SuperAdmin')).subscribe(result => {
      console.log(result);
      let somethidng: any = result;
      this.lists = somethidng.result;

    },
      err => {
        console.log(err)
      })
  }
}
