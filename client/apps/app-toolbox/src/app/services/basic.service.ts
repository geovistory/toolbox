import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  geoPosition$ = new BehaviorSubject<GeolocationPosition>(null)
  constructor() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.geoPosition$.next(position);
    });
  }
}
