import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCatalogoComponent } from './content-catalogo.component';

describe('ContentCatalogoComponent', () => {
  let component: ContentCatalogoComponent;
  let fixture: ComponentFixture<ContentCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCatalogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
