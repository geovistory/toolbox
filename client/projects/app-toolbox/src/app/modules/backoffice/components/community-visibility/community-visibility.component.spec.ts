import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityVisibilityComponent } from './community-visibility.component';

describe('CommunityVisibilityComponent', () => {
  let component: CommunityVisibilityComponent;
  let fixture: ComponentFixture<CommunityVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityVisibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
