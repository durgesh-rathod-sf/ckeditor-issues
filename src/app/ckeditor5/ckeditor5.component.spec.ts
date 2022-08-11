import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ckeditor5Component } from './ckeditor5.component';

describe('Ckeditor5Component', () => {
  let component: Ckeditor5Component;
  let fixture: ComponentFixture<Ckeditor5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ckeditor5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ckeditor5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
