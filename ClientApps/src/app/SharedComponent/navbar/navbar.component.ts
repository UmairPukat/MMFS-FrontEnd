import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('displayResetPasswordModal') private displayResetPasswordModal!: any;
  @ViewChild('displayImageUplaodModal') private displayImageUplaodModal!: any;
  
  UserName!: string;
  ResetForm: any;
  ImageForm: any;
  ImageName: any;
  DisabledBtn: boolean = true;
  CurrentUserImage: any;
  constructor(private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.ResetForm = this.fb.group({
      CurrentPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      NewPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      ConfirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    })
    this.ImageForm = this.fb.group({
      Image: ['',[Validators.required]]
    })
    this.UserName = localStorage.getItem('userName')!;
    this.getUserById();
  }
  getUserById(){
    const userId = localStorage.getItem("userId");
    this.userService.GetUserById(userId).subscribe((res: any) =>{
      this.CurrentUserImage = res.image;
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('role');
    localStorage.removeItem('userRoleName');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
  
  ChangePassword(){
    this.ResetForm.reset();
    this.dialog.open(this.displayResetPasswordModal, { height: '75%', width: '40%' });
  }

  BackBtn(){
    this.ResetForm.reset();
    this.dialog.closeAll();
  }
  ForgetPassword(){
    this.DisabledBtn = false;
    this.spinner.show();
    const key = {
      UserId: localStorage.getItem("userId"),
      CurrentPassword: this.ResetForm.value.CurrentPassword,
      Password: this.ResetForm.value.NewPassword,
      ConfirmPassword: this.ResetForm.value.ConfirmPassword
    }
    if(key.Password === key.ConfirmPassword){
      this.userService.ResetPass(key).subscribe((res: any) => {
        this.spinner.hide();
        this.toaster.success(res.message);
        this.BackBtn();
  
      },
      ({error}) => {
        this.spinner.hide();
        this.DisabledBtn = true;
        this.toaster.error(error.message);
      }
      )
    }else(
      this.spinner.hide(),
      this.toaster.error("Password and confirm Password not match")
    )
   
  }
  ChangeImage(){
    this.ImageForm.reset();
    this.dialog.open(this.displayImageUplaodModal, { height: '50%', width: '30%' });
  }
  onFileChanged(event:any) {
   this.ImageName = event.target.files[0];
  }
  SellerOnFileSelect() {
    const res = this.ImageName;
    debugger
    if (res !== null) {
      const key = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append('file', res);
      formData.append('UserId', JSON.stringify(key));
      this.userService.ImageUpload(formData).subscribe((res: any) =>{
        this.getUserById();
        this.dialog.closeAll();
        this.toaster.success(res.message);
        
      },
      ({error}) =>{
        this.toaster.error(error.message);
      }
      )
    }
  }
}
