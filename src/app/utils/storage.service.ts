import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private instituteDataSubject = new BehaviorSubject<any>('');
  private instituteImagesSubject = new BehaviorSubject<any>({
    thumbnail: null,
    logo: null
  });
  public instituteData$ = this.instituteDataSubject.asObservable();
  public instituteImages$ = this.instituteImagesSubject.asObservable();
  private domainSUbject = new BehaviorSubject<any>({
    name:null,
    url:null
  })
  public domainData$ = this.domainSUbject.asObservable()
  public latLng = new BehaviorSubject<any>({
    lat:null,
    lng:null
  })

  constructor(private http: HttpClient) {}

  
  public setInstituteName(value: any): void {
    this.instituteDataSubject.next(value);
  }

  public getInstitute(): any {
    return this.instituteDataSubject.getValue();
  }

  public setInstituteImageData(thumbnail: any, logo: any): void {
    this.instituteImagesSubject.next({thumbnail, logo});
  }


  public setDomainData(name:any , url:any):void{
    this.domainSUbject.next({name,url})
  }

  public getAddressFromCoordinates(latitude: number, longitude: number) {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    return this.http.get<any>(nominatimUrl)
  }
}
