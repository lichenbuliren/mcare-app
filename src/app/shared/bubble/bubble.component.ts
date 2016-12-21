import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit {

  @Input() clazz: string;
  @Input() tips: string = '这是气泡文字';

  constructor() { }

  ngOnInit() {
  }

}
