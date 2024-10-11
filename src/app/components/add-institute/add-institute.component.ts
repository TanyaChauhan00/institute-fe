import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-institute',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './add-institute.component.html',
  styleUrl: './add-institute.component.scss'
})
export class AddInstituteComponent {
  address: string = '';
  constructor(private http: HttpClient) {}

  
public   detectLocation(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Latitude: ', latitude, 'Longitude: ', longitude);
        this.getAddressFromCoordinates(latitude, longitude);
      },
      (error) => {
        console.error('Error detecting location:', error);
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}


getAddressFromCoordinates(latitude: number, longitude: number): void {
  const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  
  this.http.get(nominatimUrl).subscribe(
    (response: any) => {
      const address = response.display_name;
      this.address = address;
      console.log('Address: ', address);
    },
    (error) => {
      console.error('Error fetching address:', error);
    }
  );
}

}
