import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.css']
})
export class IdeaCardComponent implements OnInit {

  // Input Properties
  @Input() cardData!: any;
  @Input() isSaveIconVisible: boolean = true;
  @Input() customClass: string = '';

  constructor() { }

  ngOnInit(): void {
    debugger;
  }

}
