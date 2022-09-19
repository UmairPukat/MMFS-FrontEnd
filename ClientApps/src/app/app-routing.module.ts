import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './SharedComponent/layout/layout.component';
import { LoginComponent } from './user/login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PublicLayoutComponent } from './SharedComponent/public-layout/public-layout.component';
import { ForgetPasswordComponent } from './user/user-list/forget-password/forget-password.component';


const routes: Routes = [
  { path: '', component: PublicLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgetPassword', component: ForgetPasswordComponent },
      { path:'forbidden',  component: ForbiddenComponent },
    ], 
  },
  {
    path: '', component: LayoutComponent,
    children:[
      {
        path: 'Home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {path: 'User',
      loadChildren: () =>
      import('./user/user.module').then((t) => t.UserModule)}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
