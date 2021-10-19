import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoidPropertyDisplayComponent } from './factoid-property-display.component';

describe('FactoidPropertyDisplayComponent', () => {
  let component: FactoidPropertyDisplayComponent;
  let fixture: ComponentFixture<FactoidPropertyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoidPropertyDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoidPropertyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
