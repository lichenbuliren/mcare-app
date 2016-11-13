import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-verify',
  templateUrl: './home-verify.component.html',
  styleUrls: ['./home-verify.component.scss']
})
export class HomeVerifyComponent implements OnInit {
  username: string = 'wrf';

  constructor() { }

  ngOnInit() {
  }

}
