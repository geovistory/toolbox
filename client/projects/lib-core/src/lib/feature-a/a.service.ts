import { Injectable } from '@angular/core';
import { BService } from '@kleiolab/lib-core/src/lib/feature-b';

@Injectable({
  providedIn: 'root'
})
export class AService {

  constructor(private b: BService) { }
}
