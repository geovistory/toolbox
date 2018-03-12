import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItDateComponent } from './pe-it-date.component';

describe('PeItDateComponent', () => {
  let component: PeItDateComponent;
  let fixture: ComponentFixture<PeItDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
