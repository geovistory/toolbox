import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateComponent } from './dialog-create.component';

describe('DialogCreateComponent', () => {
  let component: DialogCreateComponent;
  let fixture: ComponentFixture<DialogCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
