import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VfolderComponent } from './vfolder.component';

describe('VfolderComponent', () => {
  let component: VfolderComponent;
  let fixture: ComponentFixture<VfolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VfolderComponent]
    });
    fixture = TestBed.createComponent(VfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
