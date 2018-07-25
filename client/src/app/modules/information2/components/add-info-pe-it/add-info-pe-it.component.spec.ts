import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfoTeEntComponent } from './add-info-te-ent.component';

describe('AddInfoTeEntComponent', () => {
  let component: AddInfoTeEntComponent;
  let fixture: ComponentFixture<AddInfoTeEntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInfoTeEntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfoTeEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
