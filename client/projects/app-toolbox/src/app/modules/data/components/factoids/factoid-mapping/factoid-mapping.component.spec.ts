import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoidMappingComponent } from './factoid-mapping.component';

describe('FactoidMappingComponent', () => {
  let component: FactoidMappingComponent;
  let fixture: ComponentFixture<FactoidMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoidMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoidMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
