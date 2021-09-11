import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/service/auth/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

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
