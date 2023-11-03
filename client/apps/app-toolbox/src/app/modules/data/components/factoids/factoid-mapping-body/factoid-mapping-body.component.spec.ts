import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoidMappingBodyComponent } from './factoid-mapping-body.component';

describe('FactoidMappingBodyComponent', () => {
  let component: FactoidMappingBodyComponent;
  let fixture: ComponentFixture<FactoidMappingBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoidMappingBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoidMappingBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
