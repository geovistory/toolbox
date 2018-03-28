import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleSetListComponent } from './pe-it-role-set-list.component';

describe('PeItRoleSetListComponent', () => {
  let component: PeItRoleSetListComponent;
  let fixture: ComponentFixture<PeItRoleSetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleSetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
