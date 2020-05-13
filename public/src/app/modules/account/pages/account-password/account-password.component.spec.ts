import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPasswordComponent } from './account-password.component';

describe('AccountPasswordComponent', () => {
  let component: AccountPasswordComponent;
  let fixture: ComponentFixture<AccountPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
