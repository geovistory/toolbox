import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityLabelConfigDialogComponent } from './entity-label-config-dialog.component';

describe('EntityLabelConfigDialogComponent', () => {
  let component: EntityLabelConfigDialogComponent;
  let fixture: ComponentFixture<EntityLabelConfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityLabelConfigDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityLabelConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
