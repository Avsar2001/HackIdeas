import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Idea } from 'src/app/shared/models/Idea.model';
import { Sort } from 'src/app/shared/models/sort.model';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(
    private _fire: AngularFirestore
  ) { }

  /**
   * Get list of cards/ideas from 'ideas' collection of firestore
   *
   * Request Type: GET
   *
   * URL - /ideas
   */
  public getAllIdeas(sort: Sort): Observable<Idea[]> {
    return this._fire.collection<Idea>('ideas', ref => ref.orderBy(sort.field, sort.dir))
      .valueChanges().pipe(
        take(1)
      );
  }

  /**
   * Update votes Array of card/idea by docId/ideaId from 'ideas' collection of firestore
   *
   * Request Type: PUT
   *
   * URL - /ideas/:id
   */
   public updateVoteCount(id: string, votes: string[]): Promise<void> {
    return this._fire.doc<Idea>(`ideas/${id}`).update({votes: votes, votesCount: votes.length});
  }

  /**
   * Update saved Array of card/idea by docId/ideaId from 'ideas' collection of firestore
   *
   * Request Type: PUT
   *
   * URL - /ideas/:id
   */
   public updateSavedArray(id: string, saved: string[]): Promise<void> {
    return this._fire.doc<Idea>(`ideas/${id}`).update({saved: saved});
  }

  /**
   * Save new Idea/card to 'ideas' collection using random 4 digit document id
   *
   * Request Type: POST
   *
   * URL - /ideas/:id
   */
   public saveNewidea(id: string, idea: Idea): Promise<void> {
     return this._fire.doc<Idea>(`ideas/${id}`).set(idea);
  }
}
