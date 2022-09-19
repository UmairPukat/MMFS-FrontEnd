import { Component, Input, OnInit } from '@angular/core';
import { WelcombannerService } from 'src/app/Services/welcombanner.service';
import { WelcomeBanner } from 'src/app/uimodels/WelcomeBanner';

@Component({
  selector: 'app-welcome-banner',
  templateUrl: './welcome-banner.component.html',
  styleUrls: ['./welcome-banner.component.scss']
})
export class WelcomeBannerComponent implements OnInit {

  @Input() bgImage!: string;
  welcomeBannerData!: WelcomeBanner;
  constructor(private welcomeBannerService: WelcombannerService) { }

  ngOnInit(): void {
    debugger
    this.welcomeBannerService.getWelcomeBannerdata().subscribe((data: WelcomeBanner) => {
      debugger
      this.welcomeBannerData = data;
    });
  }

}

