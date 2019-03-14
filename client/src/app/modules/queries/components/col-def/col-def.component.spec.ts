import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColDefComponent } from './col-def.component';

describe('ColDefComponent', () => {
  let component: ColDefComponent;
  let fixture: ComponentFixture<ColDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
