import { Component } from '@angular/core';
import { StorageService } from '../../utils/storage.service';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-institute',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './institute.component.html',
  styleUrl: './institute.component.scss'
})
export class InstituteComponent {
  public InstituteData: any;
  public InstituteImages: any;
  public lat: any;
  public lng: any;
  public mapSrc: SafeResourceUrl | undefined;  // The sanitized URL for the iframe
  public domainData: any
  public progress: any = 0;

  constructor(private storageService: StorageService, private router: Router, private sanitizer: DomSanitizer) {
    this.InstituteData = this.storageService.getInstitute();
    let dataLoadedCount = 0;
    const totalDataPoints = 3;
    if (this.InstituteData) {
      dataLoadedCount++;
      this.progress = (((dataLoadedCount / totalDataPoints) * 100).toFixed(2));
    }
    this.storageService.instituteImages$.subscribe((res) => {
      this.InstituteImages = res;
      if (this.InstituteImages.thumbnail && this.InstituteImages.logo !== null) {
        dataLoadedCount++;
        this.progress = (((dataLoadedCount / totalDataPoints) * 100).toFixed(2));
      }
    })

    this.storageService.domainData$.subscribe((res) => {
      this.domainData = res
      if (res.name && res.url !== null) {
        dataLoadedCount++;
        this.progress = (((dataLoadedCount / totalDataPoints) * 100).toFixed(2));
      }

    })
    this.storageService.latLng.subscribe((res) => {
      console.log(res)
      this.lat = res.latitude,
        this.lng = res.longitude
      const url = `https://maps.google.com/maps?width=auto&height=500&hl=en&q=${this.lat},${this.lng}&t=&z=13&ie=UTF8&iwloc=B&output=embed`;
      this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    })

  }

  //  private updateProgress(count: number, total: number) {
  //   this.progress = (count / total) * 100; // Calculate the progress percentage
  // }

  public goToEdit() {
    this.router.navigateByUrl('/add')
  }

  public goToEditImage() {
    this.router.navigateByUrl('/edit-profile')
  }

  public addCourse() {
    this.router.navigateByUrl('/add-course')
  }

}
