import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItEntityAddComponent } from './pe-it-entity-add.component';

describe('PeItEntityAddComponent', () => {
  let component: PeItEntityAddComponent;
  let fixture: ComponentFixture<PeItEntityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItEntityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItEntityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
