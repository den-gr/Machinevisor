import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchOffDialogComponent } from './switch-off-dialog.component';

describe('SwitchOffDialogComponent', () => {
  let component: SwitchOffDialogComponent;
  let fixture: ComponentFixture<SwitchOffDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchOffDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchOffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
