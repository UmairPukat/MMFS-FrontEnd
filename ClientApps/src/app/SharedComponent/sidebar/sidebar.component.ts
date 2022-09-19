import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isShown: boolean = true;
  PermissionDDL: any;
  constructor(private UserService: UserService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getUserPermission();
  }
  
  getUserPermission(){
    const key = localStorage.getItem('roleId');
    debugger
    this.UserService.getUserPermission(key).subscribe(res =>{
      this.PermissionDDL = res;
    },
    (error) => {
      this.toaster.error(error.message);
    })
  }
}
