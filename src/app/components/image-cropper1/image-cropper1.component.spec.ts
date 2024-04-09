import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropper1Component } from './image-cropper1.component';

describe('ImageCropper1Component', () => {
  let component: ImageCropper1Component;
  let fixture: ComponentFixture<ImageCropper1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageCropper1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageCropper1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
