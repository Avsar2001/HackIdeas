import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('openClose', [
      state('close', style({
        width: '40px',
        backgroundColor: '#FFF'
      })),
      state('open', style({
        width: '400px',
        backgroundColor: '#F7F7F7'
      })),
      transition('open <=> close', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  isExpanded = false;

  ngOnInit(): void {
  
  }

}
