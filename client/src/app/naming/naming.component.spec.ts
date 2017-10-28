import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamingComponent } from './naming.component';

describe('NamingComponent', () => {
  let component: NamingComponent;
  let fixture: ComponentFixture<NamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
