import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalEntityListComponent } from './temporal-entity-list.component';

describe('TemporalEntityListComponent', () => {
  let component: TemporalEntityListComponent;
  let fixture: ComponentFixture<TemporalEntityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalEntityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalEntityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
