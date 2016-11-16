import {Component, OnInit} from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'delivery',
  templateUrl: 'delivery.component.html'
})
export class DeliveryComponent implements OnInit {
  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('寄送快修');
  }
}
