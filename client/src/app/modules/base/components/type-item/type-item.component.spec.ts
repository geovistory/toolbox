import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeItemComponent } from './type-item.component';

describe('TypeItemComponent', () => {
  let component: TypeItemComponent;
  let fixture: ComponentFixture<TypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
