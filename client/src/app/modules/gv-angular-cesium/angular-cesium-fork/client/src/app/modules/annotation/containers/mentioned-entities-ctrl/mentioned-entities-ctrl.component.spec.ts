import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionedEntitiesCtrlComponent } from './mentioned-entities-ctrl.component';

describe('MentionedEntitiesCtrlComponent', () => {
  let component: MentionedEntitiesCtrlComponent;
  let fixture: ComponentFixture<MentionedEntitiesCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionedEntitiesCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionedEntitiesCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
