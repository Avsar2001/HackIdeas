import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      employeeId: this._fb.control('', [
        Validators.required, Validators.minLength(3)
      ])
    });
  }

  signup() {
    // Signup using auth service
    this._auth.signUp({
      employee_id: this.signupForm.value.employeeId
    }).then(user => {
      console.log("Signed Up");
      // Redirect to login page
      this._router.navigate(['/home']);
    }).catch(err => console.log(err));
    // Error handling
  }

}
