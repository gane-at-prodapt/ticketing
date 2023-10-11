import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesandaccessComponent } from './rolesandaccess.component';

describe('RolesandaccessComponent', () => {
  let component: RolesandaccessComponent;
  let fixture: ComponentFixture<RolesandaccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesandaccessComponent]
    });
    fixture = TestBed.createComponent(RolesandaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
