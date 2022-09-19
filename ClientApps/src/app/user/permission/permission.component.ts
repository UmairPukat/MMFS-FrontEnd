import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';
import { PermissionAssignedComponent } from './permission-assigned/permission-assigned.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayColumn: string[] = ['Name','Email','Role',"Action"];
  dataSource!: any;
  constructor(private userService: UserService,
    private toaster: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUserRole();
  }

  getAllUserRole(){
    this.userService.getAllUserRole().subscribe((res) =>{
      this.dataSource = new MatTableDataSource<any>(res);
      this.getPaginator();
    },
    ({error}) =>{
       this.toaster.error(error.message);
    }
    )
  }
  AssignPermission(element: any){
    const RoleId = element.roleId;
    this.router.navigate(['User/PermissionAssigned/' + RoleId]);
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
