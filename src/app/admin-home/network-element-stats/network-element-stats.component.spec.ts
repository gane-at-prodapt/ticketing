import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkElementStatsComponent } from './network-element-stats.component';

describe('NetworkElementStatsComponent', () => {
  let component: NetworkElementStatsComponent;
  let fixture: ComponentFixture<NetworkElementStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkElementStatsComponent]
    });
    fixture = TestBed.createComponent(NetworkElementStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
