import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  public thumbnailFileName: string | null = null;
  public logoFileName: string | null = null;
  public logoImage: string | null = null;
  public uploadLogoProgress: any = 0;
  public isLogoUploading: boolean = false;

  // Drag Over Event
  onDragOver(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.add('dragover');
  }

  // Drag Leave Event
  onDragLeave(event: DragEvent) {
    (event.target as HTMLElement).classList.remove('dragover');
  }

  // Drop Event
  onDrop(event: DragEvent, type: 'profile') {
    event.preventDefault();
    (event.target as HTMLElement).classList.remove('dragover');

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileInput(files[0], type);
    }
  }

  // File Selected from Input
  onlogoSelected(event: any, type: 'profile') {
    const file = event.target.files[0];
    if (file) {
      this.handleFileInput(file, type);
    }
  }

  onThumbnailSelected(event: any, type: 'profile') {
    const file = event.target.files[0];
    if (file) {
      this.handleFileInput(file, type);
    }
  }

  // Handle File Input (Drop or Select)
  handleFileInput(file: File, type: 'profile') {
    const fileName = file.name;
    const fileType = file.type;

    // Validate the file type (Only PNG allowed)
    if (fileType !== 'image/png') {
      alert('Only PNG images are allowed.');
      return;
    }

    if (type === 'profile') {
      this.logoFileName = fileName;
      this.isLogoUploading = true;  // Set uploading status to true
      this.uploadLogoProgress = 0;  // Reset progress bar

      // Read the file and create an image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoImage = e.target.result; // base64 image string
      };
      reader.readAsDataURL(file); // Convert the file into a base64 string

      // Simulate the upload process and update progress
      const uploadInterval = setInterval(() => {
        if (this.uploadLogoProgress >= 100) {
          clearInterval(uploadInterval);  // Stop updating once progress reaches 100%
          // Keep the progress bar at 100%, don't hide it by setting isLogoUploading to false
        } else {
          this.uploadLogoProgress += 10;  // Simulate upload progress by incrementing by 10%
        }
      }, 300);  // Simulate upload progress every 300ms
    }
  }


}
