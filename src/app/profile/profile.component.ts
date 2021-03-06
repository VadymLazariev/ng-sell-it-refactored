import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createProfileForm();
  }

  public profileForm: FormGroup;

  public user = {
    firstname: this.authService.sessionService.user.first_name,
    lastname: this.authService.sessionService.user.last_name,
    email: this.authService.sessionService.user.email,
    username: this.authService.sessionService.user.username,
    avatar: this.authService.sessionService.user.avatar,
  };

  ngOnInit() {
    if (this.user.avatar === null) {
      this.user.avatar = "//placehold.it/100"
    }
  }

  /* Validators.compose([Validators.required, Validators.minLength(8),
                        Validators.maxLength(15)])]*/
  createProfileForm() {
    this.checkValue();
    this.profileForm = this.fb.group({
      first_name: [`${this.user.firstname}`, Validators.compose([Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),Validators.required])],
      last_name: [`${this.user.lastname}`, Validators.compose([Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),Validators.required]) ],
      email: [`${this.user.email}`],
      username: [`${this.user.username}`, Validators.compose([Validators.pattern('^[a-zA-Z0-9_.-]*$'),
        Validators.minLength(5), Validators.maxLength(15),Validators.required],),],
      avatar: ['']
    });
  }

  checkValue() {
    Object.keys(this.user).forEach(key => {
      if (this.user[key] === undefined) {
        this.user[key] = '';
      }
    });
  }

  patch() {
    this.authService.profileService.patch(this.profileForm.value).subscribe();
  }

  onChange(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[i]);
      fileReader.onload = () => {
        this.profileForm.value.avatar = fileReader.result;
      };
    }

  }

}
