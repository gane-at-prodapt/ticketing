import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkHomepageComponent } from './network-homepage.component';

describe('NetworkHomepageComponent', () => {
  let component: NetworkHomepageComponent;
  let fixture: ComponentFixture<NetworkHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkHomepageComponent]
    });
    fixture = TestBed.createComponent(NetworkHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
