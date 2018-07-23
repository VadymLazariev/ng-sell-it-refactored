import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from "./login.component";
import {AuthService} from "../core/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionService} from "../core/session.service";
import {ProfileService} from "../core/profile.service";
import {AppErrorHandlerModule} from "../shared/components/error-handler/app-error-handler.module";
import {AngularFontAwesomeModule} from "angular-font-awesome";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppErrorHandlerModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [AuthService, SessionService, ProfileService,],
})
export class LoginModule {
}
