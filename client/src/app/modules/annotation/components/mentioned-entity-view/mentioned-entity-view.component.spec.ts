import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionedEntityViewComponent } from './mentioned-entity-view.component';

describe('MentionedEntityViewComponent', () => {
  let component: MentionedEntityViewComponent;
  let fixture: ComponentFixture<MentionedEntityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionedEntityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionedEntityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
