import { BehaviorSubject, Subject } from 'rxjs';
import { debugCombineLatestOrEmpty } from './debug-combine-latest-or-empty';

describe('debugCombineLatestOrEmpty', function () {


  it('should report correctly', async (done) => {
    const a$ = new BehaviorSubject('a')
    const b$ = new BehaviorSubject('b')
    debugCombineLatestOrEmpty([a$, b$])
    setTimeout(() => { done() }, 501)
  })
  it('should report correctly with error', async (done) => {
    const a$ = new BehaviorSubject('a')
    const b$ = new Subject()
    debugCombineLatestOrEmpty([a$, b$])
    setTimeout(() => { done() }, 501)
  })

  // it('should fullfill marble test with cold', marbles(m => {
  //   const source = m.cold<string>("---a-b-cd----e-f-g-h---------ijj--------|");
  //   const expected = "              ----------a---------e---------------i--|";

  //   const destination = source.pipe(
  //     // tap(_ => console.log('t1', new Date().toISOString())),
  //     skipWhileFirst(8),
  //     // tap(_ => console.log('t2', new Date().toISOString())),

  //   );
  //   m.expect(destination).toBeObservable(expected);
  // }))


})

