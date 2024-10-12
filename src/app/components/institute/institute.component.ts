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
  public InstituteData :any;
  public InstituteImages:any;
  public lat:any;
  public lng:any;
  public mapSrc: SafeResourceUrl | undefined;  // The sanitized URL for the iframe

  
 constructor(private storageService:StorageService,private router:Router,private sanitizer: DomSanitizer){
  this.InstituteData = this.storageService.getInstitute();
  console.log(this.InstituteData)
 this.storageService.instituteImages$.subscribe((res)=>{
    this.InstituteImages= res
  })
  this.storageService.latLng.subscribe((res)=>{
    console.log(res)
    this.lat = res.latitude,
    this.lng = res.longitude
    const url = `https://maps.google.com/maps?width=auto&height=500&hl=en&q=${this.lat},${this.lng}&t=&z=13&ie=UTF8&iwloc=B&output=embed`;
    this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  })

 }


 public goToEdit(){
 this.router.navigateByUrl('/add')
 }

 public goToEditImage(){
  this.router.navigateByUrl('/edit-profile')
 }

 public addCourse(){
  this.router.navigateByUrl('/add-course')
 }

}
