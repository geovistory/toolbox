import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  // the entity type to search
  entityType$ = new BehaviorSubject<'teEn' | 'peIt' | undefined>(undefined);

  // the classes to search
  pkAllowedClasses$: Observable<number[]>;
}
