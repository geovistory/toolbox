import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionedEntitiesViewComponent } from './mentioned-entities-view.component';

describe('MentionedEntitiesViewComponent', () => {
  let component: MentionedEntitiesViewComponent;
  let fixture: ComponentFixture<MentionedEntitiesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionedEntitiesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionedEntitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
