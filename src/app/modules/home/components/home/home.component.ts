import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Idea } from 'src/app/shared/models/Idea.model';

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
        width: '450px',
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
  cardObj = {
    title: "The Magnificent Stag",
    imgUrl: "../../../../../assets/images/7747.jpg",
    alt: "Image",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque atque eius molestias doloremque
    amet, porro inventore temporibus veritatis enim excepturi est sapiente recusandae minima quia
    nihil cumque quasi, quibusdam sequi.`,
    createdBy: "Avsar Vora",
    createdOn: "25th Sep, 2021",
    votesCount: 125,
    tags: []
  }

  ngOnInit(): void {
  
  }

}
