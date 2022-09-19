import { Component, Inject, OnInit, Optional, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';
import {SelectionModel} from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-permission-assigned',
  templateUrl: './permission-assigned.component.html',
  styleUrls: ['./permission-assigned.component.scss']
})
export class PermissionAssignedComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayColumn: string[] = ['Select','Name'];
  dataSource!: any;
  selection = new SelectionModel<any>(true, []);
  data: any[] = [];
  local_data: any;
  Result: any[] = [];
  UserPermissionAssigned: any[]= [];
  RoleId: any;
  List: any[] =[];
  constructor(private userService: UserService,
    private toaster: ToastrService ,public dialogRef: MatDialogRef<PermissionAssignedComponent>,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,) {
      this.RoleId = this.router.snapshot.params?.['RoleId'];
      debugger
    }

  ngOnInit(): void {
    this.getAccessingComponent();
  }

  getAccessingComponent(){
    const key = localStorage.getItem('roleId');
    this.userService.getAccessingComponent(key).subscribe((res) =>{
      this.dataSource = new MatTableDataSource<any>(res);
      this.getPaginator();
    },
    ({error}) =>{
       this.toaster.error(error.message);
    })
  }
  isAllSelected() {
     const numSelected = this.selection.selected.length;
     this.data= this.selection.selected;
     const numRows = this.dataSource.data.length;
     return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if(this.isAllSelected()){
      this.selection.clear();
      this.data = [];
    }
    else{
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
    }
  }
  SaveUserPermission(){
  //   if(this.UserPermissionAssigned.length === 0){
  //    for(let i = 0; i < this.data.length; i++){
  //     this.List.push({
  //       id: null,
  //       userId:  this.UserId,
  //       applicationUser:  null,
  //       accessingCompId: this.data[i].id,
  //       accessingComponent:  null
  //     })
  //    }
  //   }else{
  //     for(let i = 0; i < this.data.length; i++){
  //       for(let j = 0; j < this.UserPermissionAssigned.length; j++){
  //         if(this.data[i].id === this.UserPermissionAssigned[j].accessingCompId){
  //           const index = this.UserPermissionAssigned.indexOf(this.UserPermissionAssigned[j], 0);
  //           if (index > -1) {
  //             this.UserPermissionAssigned.splice(index, 1);
  //           }
  //         }
  //         else{
  //            if(this.UserPermissionAssigned.filter(x => x.accessingCompId === this.data[i].id).length === 0 )
  //            {
  //             this.List.push({
  //               id: null,
  //               userId:  this.UserId,
  //               applicationUser:  null,
  //               accessingCompId: this.data[i].id,
  //               accessingComponent:  null
  //             })
  //            }   
  //         }
  //       }
  //     }
  //   }
  //   const uniqueArray = this.List.filter((thing: any, index: any) => {
  //     const _thing = JSON.stringify(thing);
  //     return index === this.List.findIndex(obj => {
  //       return JSON.stringify(obj) === _thing;
  //     });
  //   });
  //   for(let m = 0; m < uniqueArray.length; m++){
  //     this.UserPermissionAssigned.push(uniqueArray[m]);
  //   }
  //  const key =  this.UserPermissionAssigned;
  //  debugger
  //   this.userService.UpdatePermission(key).subscribe((res: any) => {
  //     this.toaster.success(res.message);
  //     window.location.reload();
  //   },
  //   ({error}) =>{
  //      this.toaster.error(error.message);
  //   })
  }
  getPaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
  applyFilter(event: any): void{
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

