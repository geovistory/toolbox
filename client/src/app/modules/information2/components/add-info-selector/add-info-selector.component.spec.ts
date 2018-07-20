import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfoSelectorComponent } from './add-info-selector.component';

describe('AddInfoSelectorComponent', () => {
  let component: AddInfoSelectorComponent;
  let fixture: ComponentFixture<AddInfoSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInfoSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
