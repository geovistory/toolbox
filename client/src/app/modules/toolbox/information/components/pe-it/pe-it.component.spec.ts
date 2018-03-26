import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItComponent } from './pe-it.component';

describe('PeItComponent', () => {
  let component: PeItComponent;
  let fixture: ComponentFixture<PeItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
