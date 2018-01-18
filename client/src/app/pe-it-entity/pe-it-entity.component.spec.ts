import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItEntityComponent } from './pe-it-entity.component';

describe('PeItEntityComponent', () => {
  let component: PeItEntityComponent;
  let fixture: ComponentFixture<PeItEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
