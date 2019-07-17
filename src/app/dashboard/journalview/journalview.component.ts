import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../service/shared.service';
@Component({
  selector: 'app-journalview',
  templateUrl: './journalview.component.html',
  styleUrls: ['./journalview.component.css']
})
export class JournalviewComponent implements OnInit {
  sharenav: any;

  constructor(private SharedService: SharedService) {

    this.SharedService.somedata.subscribe(data => {
      console.log('incoming data',data);
      this.sharenav=data.data;
      console.log(this.sharenav)
    });

   }

  ngOnInit() {
  }

}
