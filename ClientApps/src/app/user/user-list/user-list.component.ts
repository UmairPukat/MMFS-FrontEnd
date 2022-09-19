import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('displayResetPasswordModal') private displayResetPasswordModal!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  SearchUserForm: any;
  displayColumn: string[] = ['UserName', 'Email', 'Role','Phone','DOB','Status',"Action"];
  dataSource!: any;
  userAction: boolean = true;
  ResetForm: any;
  UserDDL: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private UserService: UserService,
    private toaster: ToastrService) { 
      
    }

  ngOnInit(): void {
    this.ResetForm = this.fb.group({
      UserId: new FormControl(''),
      Password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
      ConfirmPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
    })
    this.getAllUser();
  }

  getAllUser(){
   this.UserService.GetUserProfile().subscribe(res => {
    this.dataSource = new MatTableDataSource<any>(res);
    this.getPaginator();
   },
   ({error}) =>{
     this.toaster.error(error.message);
   })
  }
  AddUser(){
    const dialogRef = this.dialog.open(RegisterComponent,{
      width: '65%',
      height: '95%'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUser();
    })
  }

  editUser(element: any){
    const UserProfile = false;
    const dialogRef = this.dialog.open(RegisterComponent,{
      width: '65%',
      height: '95%',
      data: {element,UserProfile}
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUser();
    })
  }
  UserProfile(element: any){
    const UserProfile = true;
    const dialogRef = this.dialog.open(RegisterComponent,{
      width: '65%',
      height: '95%',
      data: {element,UserProfile}
    })
  }
  deleteUser(element: any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Delete User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        const key = element.userId;
        debugger
        this.UserService.DeleteUser(key).subscribe((res: any) =>{
          Swal.fire({
            title: 'Deleted!',
            text: 'Your selected User has been Deleted.',
            icon: 'success',
            timer: 800,
            showConfirmButton: false,
          })
          this.getAllUser();
        },
        ({error}) =>{
          this.toaster.error(error.message);
        });  
      }
    });
  }
  ForgetPassword(){
    const key = {
      UserId: this.ResetForm.value.UserId
    } 
  }
  BackBtn(){
    this.dialog.closeAll();
    
  }
 
  ForgetPasswordPopUp(element: any){
    this.dialog.open(this.displayResetPasswordModal, { height: '75%', width: '30%'});
  }
  getPaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: any): void{
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
