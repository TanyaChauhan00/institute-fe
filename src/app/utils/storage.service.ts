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

 
  public setInstituteName(value: any): void {
    this.instituteDataSubject.next(value);
  }

  public getInstitute(): any {
    return this.instituteDataSubject.getValue();
  }

  public setInstituteImageData(thumbnail: any, logo: any): void {
    this.instituteImagesSubject.next({thumbnail, logo});
  }

 
}
