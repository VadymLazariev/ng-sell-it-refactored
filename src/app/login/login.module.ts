import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from "./login.component";
import {AuthService} from "../core/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionService} from "../core/session.service";
import {ProfileService} from "../core/profile.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../core/auth.interceptor";
import {ErrorHandlerComponent} from "../shared/components/error-handler/error-handler.component";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    ErrorHandlerComponent
  ],
  providers:[AuthService,SessionService,ProfileService,],
})
export class LoginModule { }
