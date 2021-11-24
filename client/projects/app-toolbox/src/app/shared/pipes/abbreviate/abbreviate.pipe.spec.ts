import { AbbreviatePipe } from './abbreviate.pipe';

fdescribe('AbbreviatePipe', () => {
  it('create an instance', () => {
    const pipe = new AbbreviatePipe();
    expect(pipe).toBeTruthy();
  });
  it('abbreviate Person Appellation in a Language', () => {
    const pipe = new AbbreviatePipe();
    expect(pipe).toBeTruthy();
  });
});
