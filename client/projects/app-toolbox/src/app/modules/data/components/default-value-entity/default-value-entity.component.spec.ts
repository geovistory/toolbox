import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultValueEntityComponent } from './default-value-entity.component';

describe('DefaultValueEntityComponent', () => {
  let component: DefaultValueEntityComponent;
  let fixture: ComponentFixture<DefaultValueEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultValueEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultValueEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
