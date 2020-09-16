import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityLabelConfigOpenBtnComponent } from './entity-label-config-open-btn.component';

describe('EntityLabelConfigOpenBtnComponent', () => {
  let component: EntityLabelConfigOpenBtnComponent;
  let fixture: ComponentFixture<EntityLabelConfigOpenBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityLabelConfigOpenBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityLabelConfigOpenBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
