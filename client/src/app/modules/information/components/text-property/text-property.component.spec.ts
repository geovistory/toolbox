import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPropertyComponent } from './text-property.component';

describe('TextPropertyComponent', () => {
  let component: TextPropertyComponent;
  let fixture: ComponentFixture<TextPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
