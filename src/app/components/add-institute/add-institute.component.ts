import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../utils/storage.service';
import { Router } from '@angular/router';
import { InstituteData } from '../../utils/institute.interface';

@Component({
  selector: 'app-add-institute',
  standalone: true,
  imports: [HttpClientModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-institute.component.html',
  styleUrl: './add-institute.component.scss'
})
export class AddInstituteComponent {
  public address: any = new FormControl('');
  public instituteForm: FormGroup;
  public instituteData :InstituteData;
  public countries: any[] = [
    {
      name: 'India',
      code: 'India',
      states: [
        { name: 'Haryana', code: 'HR' },
        { name: 'Punjab', code: 'PB' },
      ]
    },
    {
      name: 'United Kingdom',
      code: 'United Kingdom',
      states: [
        { name: 'England', code: 'ENG' },
        { name: 'Scotland', code: 'SCT' },
        { name: 'Wales', code: 'WLS' }
      ]
    },
    {
      name: 'United States',
      code: 'United States',
      states: [
        { name: 'California', code: 'CA' },
        { name: 'Texas', code: 'TX' },
        { name: 'New York', code: 'NY' }
      ]
    },
    {
      name: 'Australia',
      code: 'Australia',
      states: [
        { name: 'New South Wales', code: 'NSW' },
        { name: 'Victoria', code: 'VIC' },
        { name: 'Queensland', code: 'QLD' }
      ]
    }
  ];
  public filteredStates: any[] = [];
  

  constructor(private router:Router,private http: HttpClient,private fb: FormBuilder,private storageService:StorageService) {
    this.instituteForm = this.fb.group({
      instituteName: ['', Validators.required],
      ownerName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['' , Validators.required],
      country: ['' , Validators.required],
      state: ['' , Validators.required],
    });
    this.instituteForm.get('country')?.valueChanges.subscribe(selectedCountryCode => {
      this.updateFilteredStates(selectedCountryCode);
    });

    this.instituteData = this.storageService.getInstitute();
    if(this.instituteData){
      this.instituteForm.patchValue({
        instituteName: this.instituteData.instituteName,
        ownerName: this.instituteData.ownerName,
        mobileNumber: this.instituteData.mobileNumber,
        email: this.instituteData.email,
        address: this.instituteData.address,
        country: this.instituteData.country,
        state: this.instituteData.state,
      })
    }
  }

  updateFilteredStates(countryCode: string): void {
    const selectedCountry = this.countries.find(country => country.code === countryCode);
    this.filteredStates = selectedCountry ? selectedCountry.states : [];
  }


  
public detectLocation(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Latitude: ', latitude, 'Longitude: ', longitude);
        this.getAddressFromCoordinates(latitude, longitude);
        this.storageService.latLng.next({latitude,longitude})
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
      this.instituteForm.get('address')?.setValue(address)
      console.log('Address: ', address);
    },
    (error) => {
      console.error('Error fetching address:', error);
    }
  );
}

public onSave(){
this.storageService.setInstituteName(this.instituteForm.value)
this.router.navigateByUrl('/')
}

  
public close() {
  this.router.navigateByUrl('')
}

public restrictAlpha(event:KeyboardEvent){
const regex = /^[a-zA-z]*$/
if(regex.test(event.key)){
  event.preventDefault();
  return false;
}
return true;
}
}
