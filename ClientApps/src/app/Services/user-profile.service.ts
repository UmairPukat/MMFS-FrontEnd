import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  BaseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  GetPaymentMethod(): Observable<any>{
    return this.http.get(this.BaseUrl + 'UserProfile/GetPaymentMethod');
  }
  GetReligion(): Observable<any>{
    return this.http.get(this.BaseUrl + 'UserProfile/GetReligion');
  }
  GetRaces(): Observable<any>{
    return this.http.get(this.BaseUrl + 'UserProfile/GetRaces');
  }
  getAllCity(): Observable<any>{
    return this.http.get(this.BaseUrl + 'UserProfile/GetAllCity');
  }
  getAllState(): Observable<any>{
    return this.http.get(this.BaseUrl + 'UserProfile/GetAllState');
  }
  AddUserPersonalInfo(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'UserProfile/AddUserPersonalInfo',data);
  }
  UpdateUserPersonalInfo(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'UserProfile/UpdateUserPersonalInfo',data);
  }
  AddUserBusinessProfile(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'UserProfile/AddUserBusinessProfile',data);
  }
  UpdateUserBusinessProfile(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'UserProfile/UpdateUserBusinessProfile',data);
  }
  AddUserEmergencyProfile(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'UserProfile/AddUserEmergencyProfile',data);
  }
  UpdateUserEmergencyProfile(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'UserProfile/UpdateUserEmergencyProfile',data);
  }
  AddUserChequeProfile(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'UserProfile/AddUserChequeProfile',data);
  }
  UpdateUserChequeProfile(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'UserProfile/UpdateUserChequeProfile',data);
  }
  getFullProfileOfUser(data: any): Observable<any>{
    return this.http.get(this.BaseUrl + 'UserProfile/getFullProfileOfUser?UserId=' +data);
  }
}
