import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _state: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show(): void {
    // show spinner
    this._state.next(true);
  }

  hide(): void {
    // Hide spinner
    this._state.next(false);
  }

  getState(): Observable<boolean> {
    return this._state.asObservable();
  }

  constructor() { }
}
