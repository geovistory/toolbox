import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesOfAKindComponent } from './roles-of-a-kind.component';

describe('RolesOfAKindComponent', () => {
  let component: RolesOfAKindComponent;
  let fixture: ComponentFixture<RolesOfAKindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesOfAKindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesOfAKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
