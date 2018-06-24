import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor( private fb: FormBuilder, private authService: AuthService) {
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

  ngOnInit( ) {
    if (this.user.avatar === null){
      this.user.avatar = "//placehold.it/100"
    }
  }


  createProfileForm() {
    this.checkValue();
    const MIN_LENGTH = 6;
    this.profileForm = this.fb.group({
      first_name: [`${this.user.firstname}`, Validators.pattern('^[a-zA-Z]+$')],
      last_name: [`${this.user.lastname}`, Validators.pattern('^[a-zA-Z]+$') ],
      email: [`${this.user.email}`],
      username: [`${this.user.username}`, Validators.pattern('^[a-zA-Z0-9_.-]*$')],
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
    console.log(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[i]);
      fileReader.onload = () => {
        console.log(fileReader.result);
        this.profileForm.value.avatar = fileReader.result;
        console.log('this.profileForm.value.avatar');
      };
    }

  }

}
