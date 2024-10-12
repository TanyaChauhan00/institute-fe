import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent {
public siteDataForm:FormGroup;
public video:any;
public teaserVideo:any = new FormControl('');
public siteName:any = new FormControl('');
public domainUrl:any = new FormControl('')

constructor(private fb:FormBuilder){
this.siteDataForm = this.fb.group({

})
this.teaserVideo.valueChanges.subscribe((res:any)=>{
  console.log(typeof res , "Response")
})
}
public videoFileName: string | null = null;
public videoFile: string | null = null;

// Handle Video Input
handleVideoInput(event: any) {
  const file = event?.target.files[0];
  if (!file) return;

  const fileType = file.type;
  if (fileType !== 'video/mp4') {
    alert('Only MP4 videos are allowed.');
    return;
  }

  this.videoFileName = file.name;
  this.convertToVideoUrl(file);
}

// Convert Video to URL for Preview
private convertToVideoUrl(file: File) {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    this.videoFile = e.target.result; // Video preview source
  };
  reader.readAsDataURL(file);
}

// Remove Video
removeVideo() {
  this.videoFileName = null;
  this.videoFile = null;
}

public addDomain(){

}

uploadVideo(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    // Convert file to Base64 string
    reader.onload = () => {
      this.video = reader.result as string;
      console.log(this.video, "Base64 encoded video");
    };

    reader.readAsDataURL(file); // Reads the file as a data URL (Base64 string)
  }
}

}
