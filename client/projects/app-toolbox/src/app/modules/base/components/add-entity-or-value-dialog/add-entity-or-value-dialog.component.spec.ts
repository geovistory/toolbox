import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEntityOrValueDialogComponent } from './add-entity-or-value-dialog.component';


describe('AddEntityOrValueDialogComponent', () => {
  let component: AddEntityOrValueDialogComponent;
  let fixture: ComponentFixture<AddEntityOrValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEntityOrValueDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntityOrValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
