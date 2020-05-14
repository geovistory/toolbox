import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultingEntitiesDialogComponent } from './resulting-entities-dialog.component';

describe('ResultingEntitiesDialogComponent', () => {
  let component: ResultingEntitiesDialogComponent;
  let fixture: ComponentFixture<ResultingEntitiesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultingEntitiesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultingEntitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
