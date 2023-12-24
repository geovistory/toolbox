import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTimeSpanItemPreviewComponent } from './view-time-span-item-preview.component';


describe('TimeSpanItemPreviewComponent', () => {
  let component: ViewTimeSpanItemPreviewComponent;
  let fixture: ComponentFixture<ViewTimeSpanItemPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTimeSpanItemPreviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeSpanItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
