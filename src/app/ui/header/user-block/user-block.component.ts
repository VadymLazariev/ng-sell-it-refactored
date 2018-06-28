import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../../core/profile.service";
import {SessionService} from "../../../core/session.service";
import {AuthService} from "../../../core/auth.service";
import {Observable} from "rxjs/internal/Observable";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.scss']
})
export class UserBlockComponent implements OnInit {
  constructor(private authService: AuthService) { }

  public authenticated$: boolean;
  public currentUser;

  ngOnInit() {
    this.authService.isAuthenticated().subscribe( data => {
       this.authenticated$ = data;
    });
    console.log("AUTH",this.authenticated$);
    this.authService.profileService.profile.subscribe(data => {
      this.currentUser = data;
      if (!data) {
        this.currentUser = this.authService.sessionService.user;
      }
    });
  }

  signOut(){
    this.authService.signOut();
  }
}
