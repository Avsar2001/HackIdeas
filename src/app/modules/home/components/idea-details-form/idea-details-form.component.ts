import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Idea } from 'src/app/shared/models/Idea.model';
import { TAGS } from 'src/app/shared/models/tags.list.model';

@Component({
  selector: 'app-idea-details-form',
  templateUrl: './idea-details-form.component.html',
  styleUrls: ['./idea-details-form.component.css']
})
export class IdeaDetailsFormComponent implements OnInit {

  @Input() currentUserEmployeeId: string = "";
  @Output() onIdeaDetailsFormSubmit: EventEmitter<Idea> = new EventEmitter<Idea>();

  ideaDetailsForm!: FormGroup;
  tagsList: string[] = [];

  constructor(
    private _modal: NgbActiveModal,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Initializing form with formgroup
    this.ideaDetailsForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: [[], Validators.required]
    });

    this.tagsList = TAGS;
  }

  closeModal(): void {
    this._modal.dismiss();
  }

  onFormSubmit(): void {
    // save data to firestore
    const SUBMIT_OBJ: Idea = {
      ideaId: new Date().toString(),
      createdBy: {employee_id: this.currentUserEmployeeId},
      createdOn: new Date().toString(),
      title: this.ideaDetailsForm.value.title,
      description: this.ideaDetailsForm.value.description,
      tags: this.ideaDetailsForm.value.tags,
      saved: [],
      votes: [],
      votesCount: 0
    };
    this.onIdeaDetailsFormSubmit.emit(SUBMIT_OBJ);
  }

}
