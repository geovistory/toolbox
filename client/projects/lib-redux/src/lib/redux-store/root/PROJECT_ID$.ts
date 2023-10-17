import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';


export const PROJECT_ID$ = new InjectionToken<Observable<number>>('Observable project id');
