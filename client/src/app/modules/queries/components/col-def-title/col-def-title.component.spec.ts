import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColDefTitleComponent } from './col-def-title.component';

describe('ColDefTitleComponent', () => {
  let component: ColDefTitleComponent;
  let fixture: ComponentFixture<ColDefTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColDefTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColDefTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
