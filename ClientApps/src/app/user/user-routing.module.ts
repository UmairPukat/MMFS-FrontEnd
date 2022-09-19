import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstTimeLoginComponent } from './first-time-login/first-time-login.component';
import { PermissionAssignedComponent } from './permission/permission-assigned/permission-assigned.component';
import { PermissionComponent } from './permission/permission.component';
import { AssignedRoleComponent } from './role/assigned-role/assigned-role.component';
import { RoleComponent } from './role/role.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {path: 'UserList', component: UserListComponent},
  {path: 'role', component: RoleComponent},
  {path: 'RoleAssignUser/:RoleId', component: AssignedRoleComponent},
  {path: 'Firstlogin', component: FirstTimeLoginComponent},
  {path: 'Permission', component: PermissionComponent},
  {path: 'PermissionAssigned/:RoleId', component: PermissionAssignedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
