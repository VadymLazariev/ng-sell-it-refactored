import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from "./profile.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../core/auth.service";
import {ProfileService} from "../core/profile.service";
import {SessionService} from "../core/session.service";
import {UiModule} from "../ui/ui.module";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ],
  declarations: [
    ProfileComponent,
  ],
  providers:[AuthService,ProfileService,SessionService]
})
export class ProfileModule { }
