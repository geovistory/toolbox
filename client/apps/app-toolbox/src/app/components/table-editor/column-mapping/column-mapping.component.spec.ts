import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnMappingComponent } from './column-mapping.component';

describe('ColumnMappingComponent', () => {
  let component: ColumnMappingComponent;
  let fixture: ComponentFixture<ColumnMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
