import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillViewComponent } from './quill-view.component';

describe('QuillViewComponent', () => {
  let component: QuillViewComponent;
  let fixture: ComponentFixture<QuillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
