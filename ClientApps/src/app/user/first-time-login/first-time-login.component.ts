import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-first-time-login',
  templateUrl: './first-time-login.component.html',
  styleUrls: ['./first-time-login.component.scss']
})
export class FirstTimeLoginComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayColumn: string[] = ['UserName',"CreatedDate",'Action'];
  dataSource!: any;
  constructor(private UserService: UserService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getAllFirstTimeLogin();
  }

  getAllFirstTimeLogin(){
    this.UserService.GetFirstTimeLogin().subscribe((res) =>{
      debugger
      this.dataSource = new MatTableDataSource<any>(res);
      this.getPaginator();
    },
    ({error}) =>{
       this.toaster.error(error.message);
    }
    )
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
