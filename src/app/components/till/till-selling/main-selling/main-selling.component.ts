import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main-selling.component.html',
  styleUrls: ['./main-selling.component.scss']
})
export class MainSellingComponent implements OnInit {
  title = 'pos-app';

  events: string[] = [];
  opened: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
