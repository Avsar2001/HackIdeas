import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/service/auth/auth.service';
import { IdeaCardComponent } from 'src/app/shared/components/idea-card/idea-card.component';
import { Idea } from 'src/app/shared/models/Idea.model';
import { Sort } from 'src/app/shared/models/sort.model';
import { TAGS } from 'src/app/shared/models/tags.list.model';
import { THUMBNAILS } from 'src/app/shared/models/thumbnails.enum';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { IdeaService } from '../../services/idea/idea.service';
import { IdeaDetailsFormComponent } from '../idea-details-form/idea-details-form.component';

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
    private _ideaService: IdeaService,
    private _auth: AuthService,
    private _modal: NgbModal,
    private _spinner: SpinnerService
  ) { }

  isExpanded = false;
  THUMBNAILS = THUMBNAILS;

  /**
   * ideasList -> ideas list coming from server
   *
   * savedIdeasList -> list of ideas which's saved by current user
   * 
   * displayIdeasList -> Final Ideas list which will be displayed over screen
   */
  ideasList: Idea[] = [];
  savedIdeasList: Idea[] = [];
  displayIdeasList: Idea[] = [];

  currentUserEmployeeId: string = "";
  ideaDetailModal!: NgbModalRef;

  tagsList: any[] = [];
  sortObj: Sort = {
    field: 'createdOn',
    dir: 'desc'
  };
  filterObj: string[] = [];

  ngOnInit(): void {
    this._spinner.show();

    // Getting current user from Auth service
    this._auth.getCurrentUserEmployeeId().subscribe((userEmployeeId: string | undefined) => {
      if(userEmployeeId) {
        this.currentUserEmployeeId = userEmployeeId;
      }
    }, err => {
      window.alert(err);
    });

    // Updated list of saved Ideas depending uopn current user
    this._ideaService.getAllIdeas(this.sortObj).subscribe((ideas: Idea[]) => {
      if(ideas) {
        // Creating map for counting total ideas with perticular tags
        const MAP = new Map<string, number>();
        TAGS.forEach((tag: string) => {
          MAP.set(tag.toLowerCase(), 0);
        });

        // Assigning values to all lists after first server call
        this.ideasList = ideas as Idea[];
        this.savedIdeasList = (ideas as Idea[]).filter(idea => idea.saved.includes(this.currentUserEmployeeId));
        this.displayIdeasList = this.ideasList;

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
      this._spinner.hide();
    }, err => {
      this._spinner.hide();
      window.alert(err);
    });

  }

  getAllIdeas(): void {
    this._spinner.show();
    this._ideaService.getAllIdeas(this.sortObj).subscribe((ideas: Idea[]) => {
      if(ideas) {
        this.ideasList = ideas as Idea[];
        this.savedIdeasList = (ideas as Idea[]).filter(idea => idea.saved.includes(this.currentUserEmployeeId));
        // Filter list based on current applied filters
        this.applyFilter();
      }
      this._spinner.hide();
    }, err => {
      this._spinner.hide();
      window.alert(err);
    });
  }

  updateVoteCount(ideaId: string | undefined, votes: string[]): void {
    this._spinner.show();
    this._ideaService.updateVoteCount(ideaId || '', votes).then(data => {
      console.log("Votes Array Updated");
      this._spinner.hide();
    }, err => {
      this._spinner.hide();
      alert(err);
    })
  }

  updateSavedArray(ideaId: string | undefined, saved: string[]): void {
    this._spinner.show();
    this._ideaService.updateSavedArray(ideaId || '', saved).then(data => {
      console.log("Saved Array Updated");
      this.getAllIdeas();
      this._spinner.hide();
    }, err => {
      this._spinner.hide();
      alert(err);
    })
  }

  // Server side sorting
  onSortChange(field: string): void {
    this.sortObj.field = field;
    this.sortObj.dir = this.sortObj.dir === 'asc' ? 'desc' : 'asc';
    this.getAllIdeas();
  }

  // client side fitering
  onFilterChange(tag: string): void {
    if(this.filterObj.includes(tag.toLowerCase())) {
      this.filterObj = this.filterObj.filter(data => data.toLowerCase() !== tag.toLowerCase());
    } else {
      this.filterObj.push(tag.toLowerCase());
    }
    this.applyFilter();
  }

  // filtering data based on tags selected and update display array
  applyFilter(): void {
    if(this.filterObj.length === 0) {
      this.displayIdeasList = this.ideasList || [];
    } else {
      // filter ideas list and update display list
      const  FILTERED_DATA = this.ideasList.filter((idea: Idea) => {
        return this.filterObj.some((tag: string) => idea.tags.includes(tag));
      });

      this.displayIdeasList = FILTERED_DATA;
    }
  }

  openIdeaDetails(idea: Idea): void {
    this.ideaDetailModal = this._modal.open(IdeaCardComponent, {
      animation: true,
      backdrop: 'static',
      centered: true,
      windowClass: 'idea-details-modal'
    });

    // All Input properties
    this.ideaDetailModal.componentInstance.cardData = idea;
    this.ideaDetailModal.componentInstance.currentUserEmployeeId = this.currentUserEmployeeId;
    this.ideaDetailModal.componentInstance.imgUrl = '../../../../../assets/images/7747.jpg';
    this.ideaDetailModal.componentInstance.alt = 'Alt Image';
    this.ideaDetailModal.componentInstance.isModal = true;
  }

  openIdeaDetailsForm(): void {
    this.ideaDetailModal = this._modal.open(IdeaDetailsFormComponent, {
      animation: true,
      backdrop: 'static',
      centered: true,
      windowClass: 'idea-details-form-modal'
    });

    // All Input properties
    this.ideaDetailModal.componentInstance.currentUserEmployeeId = this.currentUserEmployeeId;

    // All output properties
    (this.ideaDetailModal.componentInstance.onIdeaDetailsFormSubmit as Observable<Idea>).subscribe((submitObj: Idea) => {
      this._ideaService.saveNewidea(submitObj.ideaId || '', submitObj).then(data => {
        console.log("Idea created successfully!" + data);
        this.ideaDetailModal.close();
        // reload all cards list
        this.getAllIdeas();
      })
    }, err => {
      window.alert(err);
    });
  }

}
