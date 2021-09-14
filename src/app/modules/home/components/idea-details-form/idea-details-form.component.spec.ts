import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaDetailsFormComponent } from './idea-details-form.component';

describe('IdeaDetailsFormComponent', () => {
  let component: IdeaDetailsFormComponent;
  let fixture: ComponentFixture<IdeaDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
