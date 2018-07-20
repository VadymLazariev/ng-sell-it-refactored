import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../core/auth.service";
import {ActivatedRoute} from "@angular/router";
import {RegexPattern} from "../core/regex-pattern";
import {ISignUp} from "../core/models/isign-up";
import {map} from "rxjs/operators";
import {group} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  signInForm: FormGroup;
  signUpForm: FormGroup;
  isLoginButton = true;
  public errors: ErrorEvent;
  public errorMessage;


  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute) {
    this.createSignInForm();
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(8),
        Validators.maxLength(15)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(6),],)],
      passwords: this.fb.group(
        {
          password1: ['', Validators.compose([Validators.required, Validators.minLength(8)
            , Validators.pattern('^[a-zA-Z0-9_.-]*$')
            , Validators.minLength(6)])],
          password2: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        },
        {validator: this.matchValidator})
    });
  }

  get password1() {
    return this.signUpForm.get('passwords.password1')
  }

  get password2() {
    return this.signUpForm.get('passwords.password2')
  }

  createSignInForm() {
    this.signInForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  onSubmitSignUp() {
    console.log(this.signUpForm.value)
    const signUpBody = this.initializeBody();
    console.log(signUpBody);
    if (this.signUpForm.valid) {
      this.authService.signUp(signUpBody).pipe().subscribe(data => console.log(data),
        (error: any) => {
          this.errors = error;
          this.errorMessage = Object.values(this.errors.error)[0];
          console.log(this.errors)
        }
      );
      this.signUpForm.reset();
    }
  }

  onSubmitSignIn() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).pipe().subscribe(data => console.log(data),
        (error: any) => {
          this.errors = error;
          this.errorMessage = Object.values(this.errors.error)[0];
        }
      );
      this.signInForm.reset();
    }
  }

  signInFormStatus() {
    this.isLoginButton = true;
  }


  signUpFormStatus() {
    this.isLoginButton = false;
  }

  ngOnInit(): void {
    const key = this.route.snapshot.queryParams['key'];
    console.log(key);
    this.authService.verifyEmail(key).pipe().subscribe(data => {
      console.log(data);
    });
  }

  initializeBody() {

    const body: ISignUp = {
      email: this.signUpForm.controls.email.value,
      username: this.signUpForm.controls.username.value,
      password1: this.signUpForm.controls.passwords.value.password1,
      password2: this.signUpForm.controls.passwords.value.password2,
    };
    return body;
  }

  private matchValidator(group: FormGroup): ValidationErrors {

    let password1 = group.controls.password1.value;
    let password2 = group.controls.password2.value;
    console.log(password1, password2);
    if (password1 !== password2) {
      return {
        mismatch: true
      };
    }
    return null;
  }


}
