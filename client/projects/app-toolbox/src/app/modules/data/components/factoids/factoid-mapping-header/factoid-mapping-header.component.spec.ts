import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoidMappingHeaderComponent } from './factoid-mapping-header.component';

describe('FactoidMappingHeaderComponent', () => {
  let component: FactoidMappingHeaderComponent;
  let fixture: ComponentFixture<FactoidMappingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoidMappingHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoidMappingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
