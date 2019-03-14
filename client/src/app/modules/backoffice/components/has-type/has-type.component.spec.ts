import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HasTypeComponent } from './has-type.component';

describe('HasTypeComponent', () => {
  let component: HasTypeComponent;
  let fixture: ComponentFixture<HasTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HasTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
