import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, Observable, of } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Need to make it dynamic or universal
  constructor(
    private _auth: AngularFireAuth
  ) { }

  signUp(user: User): Promise<any> {
    // Add user to firebase auth users list
    const EMAIL = `${user.employee_id}@hackideas.com`;
    const PASS = '123456';
    return this._auth.createUserWithEmailAndPassword(EMAIL, PASS);
  }

  login(user: User): Promise<any> {
    // Login user into firebase
    const EMAIL = `${user.employee_id}@hackideas.com`;
    const PASS = '123456';
    return this._auth.signInWithEmailAndPassword(EMAIL, PASS);
  }

  logout(): Promise<void> {
    // Logout current user from firebase
    return this._auth.signOut();
  }

  isLoggedIn(): Promise<boolean> {
    // Check into firebase is there current user
    return this._auth.currentUser.then(user => {
      if(user)
        return true;
      else
        return false;
    });
  }

  getCurrentUserEmployeeId(): Observable<string | undefined>{
    // return current user's employee id from firebase
    const obs = from(this._auth.currentUser);
    return obs.pipe(
      map((user: firebase.User | null) => {
        return user ? user.email?.substr(0, user.email.indexOf('@')) : undefined;
      })
    );
  }
}
