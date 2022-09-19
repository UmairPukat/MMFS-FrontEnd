import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './SharedComponent/sidebar/sidebar.component';
import { NavbarComponent } from './SharedComponent/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './SharedComponent/layout/layout.component';
import { ForgetPasswordComponent } from './user/user-list/forget-password/forget-password.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './user/login/login.component';
import { PublicLayoutComponent } from './SharedComponent/public-layout/public-layout.component';
import { WelcomeBannerComponent } from './SharedComponent/welcome-banner/welcome-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule} from '@angular/material/menu';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    LayoutComponent,
    ForbiddenComponent,
    ForgetPasswordComponent,
    PublicLayoutComponent,
    WelcomeBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
