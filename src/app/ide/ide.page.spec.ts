import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdePage } from './ide.page';

describe('IdePage', () => {
  let component: IdePage;
  let fixture: ComponentFixture<IdePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IdePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
