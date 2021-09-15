import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';
import { ToastrService } from 'src/app/shared/services/toastr/toastr.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _spinner: SpinnerService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._spinner.show();
    this.signupForm = this._fb.group({
      employeeId: this._fb.control('', [
        Validators.required, Validators.minLength(3)
      ])
    });
    this._spinner.hide();
  }

  signup() {
    this._spinner.show();

    // Signup using auth service
    this._auth.signUp({
      employee_id: this.signupForm.value.employeeId
    }).then(user => {

      this._toastr.show("SignUp", "SignUp successful!!");
      // Redirect to login page
      this._router.navigate(['/home']);

      this._spinner.hide();
    }).catch(err => this._toastr.show("Error", err));
    // Error handling
    this._spinner.hide();
  }

}
