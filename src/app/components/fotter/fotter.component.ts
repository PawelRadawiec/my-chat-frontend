import {Component, OnInit} from '@angular/core';

import {HostListener} from '@angular/core';

@Component({
  selector: 'app-fotter',
  templateUrl: './fotter.component.html',
  styleUrls: ['./fotter.component.css']
})
export class FotterComponent implements OnInit {

  // @HostListener('window:unload', ['$event'])
  // unloadHandler() {
  //   sessionStorage.clear();
  // }

  constructor() {
  }

  ngOnInit() {
  }

}
