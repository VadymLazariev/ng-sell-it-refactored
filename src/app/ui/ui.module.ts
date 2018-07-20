import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterModule} from "@angular/router";
import {UserBlockComponent} from "./header/user-block/user-block.component";
import {AuthService} from "../core/auth.service";
import {ProfileService} from "../core/profile.service";
import {SessionService} from "../core/session.service";

@NgModule({
  imports: [CommonModule, RouterModule,],
  declarations: [HeaderComponent, FooterComponent, UserBlockComponent],
  exports: [HeaderComponent, FooterComponent],
  providers: [AuthService, ProfileService, SessionService]
})
export class UiModule {
}
