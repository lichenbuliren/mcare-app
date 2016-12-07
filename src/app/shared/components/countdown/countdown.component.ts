import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: 'count-down',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  host: {
    '[class.timing]': 'timing'
  },
  encapsulation: ViewEncapsulation.None
})
export class CountdownComponent implements OnInit {
  private timing: boolean = false;
  private _clickEmitter: EventEmitter<any>;
  private text: string;

  @Input() counter: number = 60;
  @Input() title: string;
  @Input() countText: string;
  @Input() mobile: string;

  constructor() {
    this._clickEmitter = new EventEmitter<any>();
  }

  ngOnInit() {
    this.text = this.title;
  }

  _handleClick(event) {
    if (this.timing) {
      console.log('it\'s timing, stop count again');
      return false;
    } else {
      this._handleCount();
    }
  }

  @Output('click')
  get onClick(): Observable<any> {
    return this._clickEmitter.asObservable();
  }

  _counter(count) {
    let t;
    if (count == 0) {
      this.text = this.title;
      this.timing = false;
      clearTimeout(t);
    } else {
      count--;
      this.text = count + this.countText;
      t = setTimeout(() => {
        this._counter(count);
      }, 1000);
    }
  }

  _handleCount() {
    let time = this.counter;
    this.timing = true;
    this._counter(time);
  }
}
