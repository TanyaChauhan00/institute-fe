import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../utils/storage.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent {
public video:any;
public teaserVideo:any = new FormControl('');
public siteName:any = new FormControl('');
public domainUrl:any = new FormControl('')
public videoFileName: string | null = null;
public videoFile: string | null = null;

constructor(private fb:FormBuilder,private storageService:StorageService){

}


public addDomain(){
  if(this.domainUrl.value && this.siteName.value){
this.storageService.setDomainData(this.siteName.value , this.domainUrl.value)
  }
  alert('hello')
}

uploadVideo(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.video = reader.result as string;
      console.log(this.video, "Base64 encoded video");
    };

    reader.readAsDataURL(file); 
  }
}

}
