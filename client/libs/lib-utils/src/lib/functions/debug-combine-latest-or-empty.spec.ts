import { BehaviorSubject, Subject } from 'rxjs';
import { debugCombineLatestOrEmpty } from './debug-combine-latest-or-empty';

describe('debugCombineLatestOrEmpty', function () {


  it('should report correctly', (done) => {
    const a$ = new BehaviorSubject('a')
    const b$ = new BehaviorSubject('b')
    debugCombineLatestOrEmpty([a$, b$])
    setTimeout(() => { done() }, 501)
  })
  it('should report correctly with error', (done) => {
    const a$ = new BehaviorSubject('a')
    const b$ = new Subject()
    debugCombineLatestOrEmpty([a$, b$])
    setTimeout(() => { done() }, 501)
  })

})

