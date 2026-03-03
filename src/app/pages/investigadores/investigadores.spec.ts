import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Investigadores } from './investigadores';

describe('Investigadores', () => {
  let component: Investigadores;
  let fixture: ComponentFixture<Investigadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Investigadores],
    }).compileComponents();

    fixture = TestBed.createComponent(Investigadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
