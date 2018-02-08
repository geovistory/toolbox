import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItAppellationComponent } from './pe-it-appellation.component';

describe('PeItAppellationComponent', () => {
  let component: PeItAppellationComponent;
  let fixture: ComponentFixture<PeItAppellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItAppellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItAppellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
