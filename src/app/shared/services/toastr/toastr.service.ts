import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  private _toasts: any[] = [];
  private $toasts: BehaviorSubject<any> = new BehaviorSubject<any>(this._toasts);

  constructor() { }

  show(header: string, body: string): void {
    debugger;
    this._toasts.push({ header, body });
    this.$toasts.next(this._toasts);
    const INDEX = this._toasts.length - 1;
    setTimeout(() => {
      this.remove(INDEX);
    }, 6000);
  }

  remove(index: number): void {
    this._toasts.splice(index, 1);
    this.$toasts.next(this._toasts);
  }

  getToasts(): Observable<any[]> {
    return this.$toasts.asObservable();
  }
}
