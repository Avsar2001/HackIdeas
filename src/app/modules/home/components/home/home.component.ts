import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/service/auth/auth.service';
import { Idea } from 'src/app/shared/models/Idea.model';
import { Sort } from 'src/app/shared/models/sort.model';
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
  sortObj: Sort = {
    field: 'createdOn',
    dir: 'desc'
  };

  ngOnInit(): void {

    // Getting current user from Auth service
    this._auth.getCurrentUserEmployeeId().subscribe((userEmployeeId: string | undefined) => {
      if(userEmployeeId) {
        this.currentUserEmployeeId = userEmployeeId;
      }
    }, err => {
      window.alert(err);
    });

    // Updated list of saved Ideas depending uopn current user
    this.ideaService.getAllIdeas(this.sortObj).subscribe((ideas: Idea[]) => {
      if(ideas) {
        // Creating map for counting total ideas with perticular tags
        const MAP = new Map<string, number>();
        TAGS.forEach((tag: string) => {
          MAP.set(tag.toLowerCase(), 0);
        });

        this.ideasList = ideas as Idea[];
        this.savedIdeasList = (ideas as Idea[]).filter(idea => idea.saved.includes(this.currentUserEmployeeId));

        // Counting total tags with specific names
        this.ideasList.forEach((idea: Idea) => {
          idea.tags.forEach(tag => {
            const VALUE = MAP.get(tag) || 0;
            MAP.set(tag.toLowerCase(), VALUE + 1);
          });
        });

        const tmp: any[] = [];
         // Updating Final tagsList accordingly
        MAP.forEach((value: number, key: string) => {
          tmp.push({
            tag: key,
            total: value
          });
        });
        this.tagsList = tmp;
      }
    }, err => {
      window.alert(err);
    });

  }

  getAllIdeas(): void {
    this.ideaService.getAllIdeas(this.sortObj).subscribe((ideas: Idea[]) => {
      if(ideas) {
        this.ideasList = ideas as Idea[];
        this.savedIdeasList = (ideas as Idea[]).filter(idea => idea.saved.includes(this.currentUserEmployeeId));
      }
    }, err => {
      window.alert(err);
    });
  }

  updateVoteCount(ideaId: number, votes: string[]): void {
    this.ideaService.updateVoteCount(ideaId, votes).then(data => {
      console.log("Votes Array Updated");
    }, err => {
      alert(err);
    })
  }

  updateSavedArray(ideaId: number, saved: string[]): void {
    this.ideaService.updateSavedArray(ideaId, saved).then(data => {
      console.log("Saved Array Updated");
      this.getAllIdeas();
    }, err => {
      alert(err);
    })
  }

  onSortChange(field: string) {
    this.sortObj.field = field;
    this.sortObj.dir = this.sortObj.dir === 'asc' ? 'desc' : 'asc';
    this.getAllIdeas();
  }

}
