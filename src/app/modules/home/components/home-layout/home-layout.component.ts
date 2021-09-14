import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/service/auth/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _spinner: SpinnerService
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this._spinner.show();
    // Logout user from auth service
    this._auth.logout().then(data => {
      console.log("User Logged out!");
      // Redirect them to login page!
      this._router.navigate(['/login']);
      this._spinner.hide();
    }).catch(err => console.log(err));
  }

}
