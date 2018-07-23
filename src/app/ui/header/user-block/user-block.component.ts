import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth.service";


@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.scss']
})
export class UserBlockComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  public authenticated$: boolean;
  public currentUser;

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(data => {
      this.authenticated$ = data;
    });
    this.authService.profileService.profile.subscribe(data => {
      this.currentUser = data;
      if (!data) {
        this.currentUser = this.authService.sessionService.user;
      }
    });
  }

  signOut() {
    this.authService.signOut().subscribe();
  }
}
