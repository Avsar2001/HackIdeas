import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/service/auth/auth.service';
import { Idea } from 'src/app/shared/models/Idea.model';
import { TAGS } from 'src/app/shared/models/tags.list.model';
import { IdeaService } from '../../services/idea/idea.service';

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

  constructor(
    private ideaService: IdeaService,
    private _auth: AuthService
  ) { }

  isExpanded = false;
  ideasList: Idea[] = [];
  savedIdeasList: Idea[] = [];
  currentUserEmployeeId: string = "";
  tagsList: any[] = [];

  ngOnInit(): void {

    // Creating map for counting total ideas with perticular tags
    const MAP = new Map<string, number>();
    TAGS.forEach((tag: string) => {
      MAP.set(tag.toLowerCase(), 0);
    });

    // Getting current user from Auth service
    this._auth.getCurrentUserEmployeeId().subscribe((userEmployeeId: string | undefined) => {
      if(userEmployeeId) {
        this.currentUserEmployeeId = userEmployeeId;
      }
    }, err => {
      window.alert(err);
    });

    // Updated list of saved Ideas depending uopn current user
    this.ideaService.getAllIdeas().subscribe((ideas: Idea[]) => {
      if(ideas) {
        this.ideasList = ideas as Idea[];
        this.savedIdeasList = (ideas as Idea[]).filter(idea => idea.saved.includes(this.currentUserEmployeeId));

        // Counting total tags with specific names
        this.savedIdeasList.forEach((idea: Idea) => {
          idea.tags.forEach(tag => {
            const VALUE = MAP.get(tag) || 0;
            MAP.set(tag.toLowerCase(), VALUE + 1);
          });
        });

         // Updating Final tagsList accordingly
        MAP.forEach((value: number, key: string) => {
          this.tagsList.push({
            tag: key,
            total: value
          });
        });
      }
    }, err => {
      window.alert(err);
    });

  }

  public updateVoteCount(ideaId: number, votes: string[]): void {
    this.ideaService.updateVoteCount(ideaId, votes).then(data => {
      console.log("Votes Array Updated");
    }, err => {
      alert(err);
    })
  }

  public updateSavedArray(ideaId: number, saved: string[]): void {
    this.ideaService.updateSavedArray(ideaId, saved).then(data => {
      console.log("Saved Array Updated");
    }, err => {
      alert(err);
    })
  }

}
