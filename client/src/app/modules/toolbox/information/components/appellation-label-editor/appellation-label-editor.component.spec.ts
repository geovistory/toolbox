import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationLabelEditorComponent } from './appellation-label-editor.component';

describe('AppellationLabelEditorComponent', () => {
  let component: AppellationLabelEditorComponent;
  let fixture: ComponentFixture<AppellationLabelEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationLabelEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationLabelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
