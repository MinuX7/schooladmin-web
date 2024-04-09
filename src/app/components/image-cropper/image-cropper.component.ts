import { AfterViewInit, Component, DoCheck, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Cropper from 'cropperjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrl: './image-cropper.component.scss'
})
export class ImageCropperComponent implements OnInit, AfterViewInit{
  
  // @Input()
  // public image: string;
  cropper: Cropper;
  sanitizedUrl: SafeUrl;
  
  constructor(
    public dialogRef: MatDialogRef<ImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public image: string,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

  ngAfterViewInit() {
    this.initCropper();
  }

  // ngOnChanges(changes: SimpleChanges) {
        
  //   if (changes['image'].currentValue !== changes['image'].previousValue) {
  //     this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.image);
  //     this.initCropper();
  //   }
  //  }  

  initCropper() {
    const image = document.getElementById('image') as HTMLImageElement;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      guides: false,
      
    });
  }

  // make the crop box rounded

getRoundedCanvas(sourceCanvas: any) {
  var canvas = document.createElement('canvas');
  var context: any = canvas.getContext('2d');
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  return canvas;
}

//get the cropped image and closes the dialog 
//returning an url or null if no image

crop() {
  const croppedCanvas = this.cropper.getCroppedCanvas();
  const roundedCanvas = this.getRoundedCanvas(croppedCanvas);

  let roundedImage = document.createElement('img');

  if (roundedImage) {
    this.dialogRef.close(roundedCanvas.toDataURL());
  } else {
    return this.dialogRef.close(null);
  }
}

// resets the cropper
reset(){
  this.cropper.clear();
  this.cropper.crop();
}
}
