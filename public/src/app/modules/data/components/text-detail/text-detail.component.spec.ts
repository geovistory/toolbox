import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDetailComponent } from './text-detail.component';

describe('TextDetailComponent', () => {
  let component: TextDetailComponent;
  let fixture: ComponentFixture<TextDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
