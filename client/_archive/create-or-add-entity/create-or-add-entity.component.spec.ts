import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrAddEntityComponent } from './create-or-add-entity.component';

describe('CreateOrAddEntityComponent', () => {
  let component: CreateOrAddEntityComponent;
  let fixture: ComponentFixture<CreateOrAddEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrAddEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrAddEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
