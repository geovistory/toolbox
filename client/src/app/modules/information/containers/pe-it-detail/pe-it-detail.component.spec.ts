import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItDetailComponent } from './pe-it-detail.component';

describe('PeItEditableComponent', () => {
  let component: PeItDetailComponent;
  let fixture: ComponentFixture<PeItDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
