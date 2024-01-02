import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FactoidPropertyMappingComponent } from './factoid-property-mapping.component';


describe('FactoidPropertyMappingComponent', () => {
  let component: FactoidPropertyMappingComponent;
  let fixture: ComponentFixture<FactoidPropertyMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactoidPropertyMappingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoidPropertyMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
