import {
  Component, OnInit, HostBinding,
  trigger, transition, animate,
  style, state
} from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-out')
      ])
    ])
  ]
})
export class OrderDetailComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  // @HostBinding('style.display') get display() {
  //   return 'block';
  // }
  //
  // @HostBinding('style.position') get position() {
  //   return 'absolute';
  // }

  constructor() {
  }

  ngOnInit() {
  }

}
