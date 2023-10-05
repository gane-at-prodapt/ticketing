import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNetworkComponent } from './update-network.component';

describe('UpdateNetworkComponent', () => {
  let component: UpdateNetworkComponent;
  let fixture: ComponentFixture<UpdateNetworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateNetworkComponent]
    });
    fixture = TestBed.createComponent(UpdateNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
