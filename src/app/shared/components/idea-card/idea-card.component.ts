import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Idea } from '../../models/Idea.model';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.css']
})
export class IdeaCardComponent implements OnInit {

  // Input Properties
  @Input() cardData!: Idea;
  @Input() imgUrl!: string;
  @Input() currentUserEmployeeId: string = "";
  @Input() alt: string = "Thumnail Image";
  @Input() customClass: string = '';
  @Input() isModal: boolean = false;

  // Output Properties
  @Output() votesCountChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() savedIdeaChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  idea!: Idea;
  isUpvoted: boolean = true;
  isIdeaSaved: boolean = false;

  constructor(
    private _ideaDetailsModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    // Immutablility for safety of original data
    this.idea = this.cardData || {};

    // Checking is current user upvoted this card/idea
    this.isUpvoted =  this.idea.votes.includes(this.currentUserEmployeeId);

    // Checking is current user saved this card/idea
    this.isIdeaSaved =  this.idea.saved.includes(this.currentUserEmployeeId);
  }


  public onUpvoteClick(): void {
    // Don't allow user to upvote on modal compo.
    if(!this.isModal) {
      const ID = this.currentUserEmployeeId;
      if(!this.isUpvoted) {
        this.idea.votes.push(ID);
        this.idea.votesCount = this.idea.votesCount + 1;
      } else {
        this.idea.votes.splice(this.idea.votes.indexOf(ID), 1);
        this.idea.votesCount = this.idea.votesCount - 1;
      }
      this.isUpvoted = !this.isUpvoted;
      // Emit updated idea obj.
      this.votesCountChange.emit(this.idea.votes);
    }
  }

  public onSaveIdeaClick(): void {
    const ID = this.currentUserEmployeeId;
    if(!this.isIdeaSaved) {
      // Save idea by adding into 'saved' Array
      this.idea.saved.push(ID);
    } else {
      // Remove idea by deleting from 'saved' Array
      this.idea.saved.splice(this.idea.saved.indexOf(ID), 1);
    }
    this.isIdeaSaved = !this.isIdeaSaved;
    // Emit updated idea obj.
    this.savedIdeaChange.emit(this.idea.saved);
  }

  closeModal(): void {
    // close current modal without resolve promise
    this._ideaDetailsModal.dismiss();
  }
 
}
