import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePartsViewComponent } from './name-parts-view.component';

describe('NamePartsViewComponent', () => {
  let component: NamePartsViewComponent;
  let fixture: ComponentFixture<NamePartsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamePartsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamePartsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
