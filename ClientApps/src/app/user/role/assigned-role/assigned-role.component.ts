import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-assigned-role',
  templateUrl: './assigned-role.component.html',
  styleUrls: ['./assigned-role.component.scss']
})
export class AssignedRoleComponent implements OnInit {
  @ViewChild('displayRoleModal') private displayRoleModal!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayColumn: string[] = ['SN','UserName','Name'];
  dataSource: any;
  RoleId: any;
  RoleName: any;

  constructor(private router: ActivatedRoute,
    private userService: UserService,
    private toaster:ToastrService) {
    this.RoleId = this.router.snapshot.params?.['RoleId'];
   }

  ngOnInit(): void {
    this.getRoleAssignedUser();
  }

  getRoleAssignedUser(){
    this.userService.getAssignedRole(this.RoleId).subscribe((res: any) =>{
      this.RoleName = res[0].roleName;
      this.dataSource = new MatTableDataSource<any>(res);
      this.getPaginator();
      debugger
    },
    ({error}) =>{
      this.toaster.error(error.message);
    })
  }
  editUserRole(element: any){

  }
  getPaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  Reset() {
    //this.RoleForm.reset();
  }
  applyFilter(event: any): void{
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
