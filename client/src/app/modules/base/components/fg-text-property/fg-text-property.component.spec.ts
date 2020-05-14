import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgTextPropertyComponent } from './fg-text-property.component';

describe('FgTextPropertyComponent', () => {
  let component: FgTextPropertyComponent;
  let fixture: ComponentFixture<FgTextPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FgTextPropertyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgTextPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
