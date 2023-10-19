import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export const PROJECT_ID$ = new InjectionToken<BehaviorSubject<number>>('Observable project id');
