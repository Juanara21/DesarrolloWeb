import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentQuienesomosComponent } from './content-quienesomos.component';

describe('ContentQuienesomosComponent', () => {
  let component: ContentQuienesomosComponent;
  let fixture: ComponentFixture<ContentQuienesomosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentQuienesomosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentQuienesomosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
