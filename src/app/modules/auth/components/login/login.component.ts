import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private _router: Router
  ) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      employeeId: this._fb.control('', [
        Validators.required, Validators.minLength(3)
      ])
    });
  }

  public loginUser() {
    if(this.loginForm.valid) {

      // Login user using auth service
      this._auth.login({
        employee_id: this.loginForm.value.employeeId
      }).then(data => {
        console.log(data);
        // Route redirect
        this._router.navigate(['/home']);
      }).catch(err => console.log(err));

      // Error handling using common service
    }
  }

}
