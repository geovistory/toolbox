import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoidMappingsDialogComponent } from './factoid-mappings-dialog.component';

describe('FactoidMappingsDialogComponent', () => {
  let component: FactoidMappingsDialogComponent;
  let fixture: ComponentFixture<FactoidMappingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoidMappingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoidMappingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
