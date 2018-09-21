import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSettingsComponent } from './class-settings.component';

describe('ClassSettingsComponent', () => {
  let component: ClassSettingsComponent;
  let fixture: ComponentFixture<ClassSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
