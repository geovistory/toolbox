import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysConfigComponent } from './sys-config.component';

describe('SysConfigComponent', () => {
  let component: SysConfigComponent;
  let fixture: ComponentFixture<SysConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
