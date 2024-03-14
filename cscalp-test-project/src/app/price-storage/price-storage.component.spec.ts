import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceStorageComponent } from './price-storage.component';

describe('PriceStorageComponent', () => {
  let component: PriceStorageComponent;
  let fixture: ComponentFixture<PriceStorageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceStorageComponent]
    });
    fixture = TestBed.createComponent(PriceStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
