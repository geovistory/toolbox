import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtrlEntityOrValueMatcherComponent } from './ctrl-entity-or-value-matcher.component';


describe('CtrlEntityOrValueMatcherComponent', () => {
  let component: CtrlEntityOrValueMatcherComponent;
  let fixture: ComponentFixture<CtrlEntityOrValueMatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CtrlEntityOrValueMatcherComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrlEntityOrValueMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
