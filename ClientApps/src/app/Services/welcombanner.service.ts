import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WelcomeBanner } from '../uimodels/WelcomeBanner';

@Injectable({
  providedIn: 'root'
})
export class WelcombannerService {

  welcomeBannerdata = this.http.get<WelcomeBanner>('assets/data/welcome-banner.json');

  constructor(private http: HttpClient) { }

  getWelcomeBannerdata(): Observable<WelcomeBanner> {
    return this.welcomeBannerdata;
  }

}
