import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {GuestGuard} from "./core/guest.guard";
import {AuthGuard} from "./core/auth.guard";

const routes: Routes = [
  {
    path: 'advert',
    loadChildren: './advert/advert.module#AdvertModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [GuestGuard]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'add-product',
    loadChildren: './add-product/add-product.module#AddProductModule',
    canActivate: [AuthGuard]
  },
  /* {
     path:'**',
     component:PageNotFoundComponent
   },*/
  {
    path: '', redirectTo: 'advert', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
