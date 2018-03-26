import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityEditorSettingsComponent } from './entity-editor-settings.component';

describe('EntityEditorSettingsComponent', () => {
  let component: EntityEditorSettingsComponent;
  let fixture: ComponentFixture<EntityEditorSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityEditorSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
