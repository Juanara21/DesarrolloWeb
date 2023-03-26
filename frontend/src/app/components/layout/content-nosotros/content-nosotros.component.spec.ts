import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNosotrosComponent } from './content-nosotros.component';

describe('ContentNosotrosComponent', () => {
  let component: ContentNosotrosComponent;
  let fixture: ComponentFixture<ContentNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentNosotrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
