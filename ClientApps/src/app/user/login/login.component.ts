import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('displayResetPasswordModal') private displayResetPasswordModal!: any;
  @ViewChild('FirstTimeLogInModal') private FirstTimeLogInModal!: any;
  leftBannerImgurl = 'assets/images/login-banner.png';
  loginForm: any;
  ResetForm: any;
  FirstTimeLogInForm: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private UserService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
    this.ResetForm = this.fb.group({
      UserName: ['', [Validators.required,Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]],
    })
    this.FirstTimeLogInForm = this.fb.group({
      UserName: ['', [Validators.required,Validators.pattern("^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\\.[aA-zZ]{2,4}$")]],
    })
  }
  login(){
    const key ={
      UserName: this.loginForm.value.email,
      Password: this.loginForm.value.password
    }
    this.UserService.loginUser(key).subscribe((res) =>{
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('expiryDate', res.expiration);
      localStorage.setItem('role', res.role);
      localStorage.setItem('roleId', res.roleId);
      localStorage.setItem('userRoleName', res.role);
      localStorage.setItem('userName', res.userName);
      this.toaster.success(res.message);
      this.resetForm();
      this.router.navigate(['/Home/Dashboard']);
    },
    ({error}) => {
      this.toaster.error(error.message);
    }
    )
  }
  BackBtn(){
    this.ResetPasswordForm();
    this.dialog.closeAll();
    
  }
  ResetPassword(){
    this.ResetPasswordForm();
    this.dialog.open(this.displayResetPasswordModal, { height: '70%', width: '30%' });
  }
  FirstTimelogin(){
    this.dialog.open(this.FirstTimeLogInModal, { height: '70%', width: '30%' });
  }
  FirstLogin(){
    const key = this.FirstTimeLogInForm.value.UserName;
    this.UserService.AddFirstTimeLogin(key).subscribe((res: any) =>{
      this.toaster.success(res.message);
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  resetForm() {
    this.loginForm.reset();
  }
  ResetPasswordForm(){
    this.ResetForm.reset();
  }

  SendVarificationCode(){
    debugger
    const key = this.ResetForm.value.UserName;

    this.UserService.SendVarificationCode(key).subscribe((res: any) => {
      this.toaster.success(res.message);
    },
    ({error}) => {
      this.toaster.error(error.message);
    })
  }
}
