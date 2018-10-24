import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprosComponent } from './repros.component';

describe('ReprosComponent', () => {
  let component: ReprosComponent;
  let fixture: ComponentFixture<ReprosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
