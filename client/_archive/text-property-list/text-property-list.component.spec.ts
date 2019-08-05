import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPropertyListComponent } from './text-property-list.component';

describe('TextPropertyListComponent', () => {
  let component: TextPropertyListComponent;
  let fixture: ComponentFixture<TextPropertyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPropertyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
