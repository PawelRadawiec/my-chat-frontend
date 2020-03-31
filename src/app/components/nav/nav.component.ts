import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  contactList = [
    {
      name: 'User1',
      active: true
    },
    {
      name: 'User2',
      active: true
    },
    {
      name: 'User3',
      active: true
    },
    {
      name: 'User4',
      active: true
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
