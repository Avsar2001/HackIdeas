import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('openClose', [
      state('close', style({
        top: 0,
        right: 0,
        width: '40px',
        borderLeft: '1px solid rgba(0,0,0,.2)',
        borderRadius: '12px 0 0 12px',
        position: 'fixed',
        bottom: 0,
        zIndex: 1045,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        backgroundColor: '#FFF',
        backgroundClip: 'padding-box',
        outline: 0
      })),
      state('open', style({
        visibility: 'visible',
        transform: 'none',
        top: 0,
        right: 0,
        width: '400px',
        borderLeft: '1px solid rgba(0,0,0,.2)',
        borderRadius: '12px 0 0 12px',
        position: 'fixed',
        bottom: 0,
        zIndex: 1045,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        backgroundColor: '#F7F7F7',
        backgroundClip: 'padding-box',
        outline: 0
      })),
      transition('open <=> close', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  isExpanded = false;

  ngOnInit(): void {
  }

  public logout() {
    // Logout user from auth service
    this._auth.logout().then(data => {
      console.log("User Logged out!");
      // Redirect them to login page!
      this._router.navigate(['/login']);
    }).catch(err => console.log(err));

  }

}
