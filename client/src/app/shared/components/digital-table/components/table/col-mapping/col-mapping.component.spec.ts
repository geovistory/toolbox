import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColMappingComponent } from './col-mapping.component';

describe('ColMappingComponent', () => {
  let component: ColMappingComponent;
  let fixture: ComponentFixture<ColMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
