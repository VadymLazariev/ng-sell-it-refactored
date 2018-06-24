import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'advert' ,
    loadChildren: './advert/advert.module#AdvertModule'
  },
  {
    path:'login' ,
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path:'profile' ,
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path:'add-product' ,
    loadChildren: './add-product/add-product.module#AddProductModule'
  },
  {
    path:'**',
    loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule'
  },
  {
    path:'', redirectTo: 'advert', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
