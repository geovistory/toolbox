import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColDefEditorComponent } from './col-def-editor.component';

describe('ColDefEditorComponent', () => {
  let component: ColDefEditorComponent;
  let fixture: ComponentFixture<ColDefEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColDefEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColDefEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
