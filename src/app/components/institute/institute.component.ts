import { Component } from '@angular/core';
import { StorageService } from '../../utils/storage.service';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';

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

 constructor(private storageService:StorageService,private router:Router){
  this.InstituteData = this.storageService.getInstitute();
  console.log(this.InstituteData)
 this.storageService.instituteImages$.subscribe((res)=>{
    this.InstituteImages= res
  })

 }


 public goToEdit(){
 this.router.navigateByUrl('/add')
 }

 public goToEditImage(){
  this.router.navigateByUrl('/edit-profile')
 }

 public addCourse(){
  
 }

}
