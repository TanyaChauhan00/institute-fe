import { StorageService } from './../../utils/storage.service';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  public logoFileName: string | null = null;
  public thumbnailFileName: string | null = null;
  public logoImage: string | null = null;
  public thumbnailImage: string | null = null;
  public uploadLogoProgress: number = 0;
  public uploadThumbnailProgress: number = 0;
  public isLogoUploading = false;
  public isThumbnailUploading = false;
  public logobase64: any;
  public thumbnailbase64: any;

  constructor(private router: Router, private storageService: StorageService) {
    this.storageService.instituteImages$.subscribe((res)=>{
      console.log(res)
      this.thumbnailImage = res.thumbnail,
      this.logoImage = res.logo
    })
  }

  // Handle Drag and Drop Events
  onDragOver(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    (event.target as HTMLElement).classList.remove('dragover');
  }

  onDrop(event: DragEvent, type: 'logo' | 'thumbnail') {
    event.preventDefault();
    (event.target as HTMLElement).classList.remove('dragover');
    const file = event.dataTransfer?.files?.[0];
    if (file) this.handleFileInput(file, type);
  }

  // Handle File Input (Drop or Select)
  handleFileInput(event: any, type: 'logo' | 'thumbnail') {
    const file = event?.target.files[0];
    const fileName = file.name;
    const fileType = file.type;

    if (fileType !== 'image/png') {
      alert('Only PNG images are allowed.');
      return;
    }

    // Initialize upload state and progress
    const isUploadingKey = type === 'logo' ? 'isLogoUploading' : 'isThumbnailUploading';
    const fileNameKey = type === 'logo' ? 'logoFileName' : 'thumbnailFileName';
    const base64Key = type === 'logo' ? 'logobase64' : 'thumbnailbase64';
    const imageKey = type === 'logo' ? 'logoImage' : 'thumbnailImage';
    const progressKey = type === 'logo' ? 'uploadLogoProgress' : 'uploadThumbnailProgress';

    this[fileNameKey] = fileName;
    this[isUploadingKey] = true; // Set uploading status to true
    this[progressKey] = 0; // Reset progress bar

    this.convertToBase64(file).then((base64: string) => {
      this[base64Key] = base64;
      this[imageKey] = base64; // Update image preview
    });

    // Directly pass the key name of the progress bar to simulateUpload
    this.simulateUpload(progressKey, 10);
  }

  private simulateUpload(progressKey: 'uploadLogoProgress' | 'uploadThumbnailProgress', increment: number) {
    const uploadInterval = setInterval(() => {
      if (this[progressKey] >= 100) {
        clearInterval(uploadInterval);
        this.isLogoUploading = false;
        this.isThumbnailUploading = false;
      } else {
        this[progressKey] += increment;
      }
    }, 300);
  }

  // Convert File to Base64
  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }


  public handleSubmit() {
    this.storageService.setInstituteImageData(this.thumbnailbase64, this.logobase64);
    this.router.navigateByUrl('/')
  }
  

  
  public close() {
    this.router.navigateByUrl('/');
  }
}
