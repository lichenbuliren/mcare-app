import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private _title: string;

  constructor(
    private titleService: Title,
    private router: Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._title = this.getTitle(router.routerState, router.routerState.root).join(' - ');
        titleService.setTitle(this._title);
      }
    });
  }

  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }

    return data;
  }


  ngOnInit() {
  }

}
