import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _spinner: SpinnerService
  ) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this._spinner.show();
    this.loginForm = this._fb.group({
      employeeId: this._fb.control('', [
        Validators.required, Validators.minLength(3)
      ])
    });
    this._spinner.hide();
  }

  public loginUser() {
    this._spinner.show();
    if(this.loginForm.valid) {

      // Login user using auth service
      this._auth.login({
        employee_id: this.loginForm.value.employeeId
      }).then(data => {
        this._spinner.hide();
        console.log(data);
        // Route redirect
        this._router.navigate(['/home']);
      }).catch(err => console.log(err));

      // Error handling using common service
    }
    this._spinner.hide();
  }

}
