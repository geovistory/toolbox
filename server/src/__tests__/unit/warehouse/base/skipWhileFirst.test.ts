import {marbles} from "rxjs-marbles/mocha";
import {skipWhileFirst} from '../../../../warehouse/base/functions';

describe('skipWhileFirst', function () {


  it('should fullfill marble test with hot', marbles(m => {
    const source = m.hot<string>("--^-a-b-cd----e-f-g-h---------ijj--------|");
    const subs = "                  ^--------------------------------------!";
    const expected = "              ----------a---------e---------------i--|";

    const destination = source.pipe(
      // tap(_ => console.log('t1', new Date().toISOString())),
      skipWhileFirst(8),
      // tap(_ => console.log('t2', new Date().toISOString())),

    );
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
  }))

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

