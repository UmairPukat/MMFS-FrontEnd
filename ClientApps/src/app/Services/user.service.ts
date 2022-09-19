import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BaseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  loginUser(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Auth/Login',data);
  }

  getUserPermission(data: any): Observable<any>{
    return this.http.get(this.BaseUrl + 'Security/getUserPermission?RoleId='+ data);
  }
  AddFirstTimeLogin(key: any): Observable<any> {
    return this.http.get(this.BaseUrl + 'Application/AddFirstTimeLogin?UserName=' + key);
  }
  GetFirstTimeLogin(): Observable<any> {
    return this.http.get(this.BaseUrl + 'Application/GetFirstTimeLogin');
  }
  GetUserById(data: any): Observable<any>{
    return this.http.get(this.BaseUrl + 'Application/getUserById?UserId='+data);
  }
  SendVarificationCode(data: any): Observable<any>{
    return this.http.get(this.BaseUrl +'Application/SendVarificationCode?UserName='+data);
  }
  forgetPassword(data: any): Observable<any>{
    return this.http.post(this.BaseUrl +'Application/forgetPassword',data);
  }
  ResetPass(data: any): Observable<any>{
    return this.http.post(this.BaseUrl +'Application/ResetPassword',data);
  }
  ImageUpload(data: any): Observable<any>{
    return this.http.post(this.BaseUrl +'Application/UserImage',data);
  }
  getAllRole(): Observable<any>{
    return this.http.get(this.BaseUrl + 'Application/GetAllRole');
  }
  addUser(data:any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Auth/Register',data);
  }
  AddRole(data:any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Application/AddRole',data);
  }
  UpdateRole(data:any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Application/UpdateRole',data);
  }
  DeleteRole(data:any): Observable<any>{
    return this.http.get(this.BaseUrl + 'Application/DeleteRole?RoleId='+data);
  }
  getAssignedRole(data:any): Observable<any>{
    return this.http.get(this.BaseUrl + 'Application/getAssignedRole?RoleId='+data);
  }
  getAllUserRole(): Observable<any>{
    return this.http.get(this.BaseUrl + 'Application/GetAllUserRole');
  }
  getAccessingComponent(data: any): Observable<any>{
    return this.http.get(this.BaseUrl + 'Security/getAccessingComponent?RoleId='+data);
  }
  UpdatePermission(data:any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Security/UpdatePermission', data);
  }
  GetUserProfile(): Observable<any>{
    return this.http.get(this.BaseUrl + 'UserProfile/GetAllUserProfile');
  }
  DeleteUser(data:any): Observable<any>{
    return this.http.get(this.BaseUrl + 'UserProfile/DeleteUserById?UserId='+data);
  }
}
