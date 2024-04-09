import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform,  } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper1',
  templateUrl: './image-cropper1.component.html',
  styleUrl: './image-cropper1.component.scss'
})
export class ImageCropper1Component {
  
  studentPhotoChangedEvent: any;
  croppedStudentPhoto: any;
  imageCroppedEvent: ImageCroppedEvent;
  transform: ImageTransform = {};
  private _scale: number = 1;
  private _rotate:number = 0;
  roundCropper: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ImageCropper1Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.transform = {scale: this._scale, rotate: this._rotate };
   }

  imageCropped(imageCroppedEvent: ImageCroppedEvent) {
    this.imageCroppedEvent = imageCroppedEvent;
  }


  private reTransform() {
    this.transform = {scale: this._scale, rotate: this._rotate };
  }

  zoomIn() {
    this._scale = this.transform.scale? this.transform.scale + 0.2 : 1;
    this.reTransform();
  }

  zoomOut() {
    let tempScale = this.transform.scale? this.transform.scale: 1;
    if (tempScale > 1) {
      this._scale = tempScale - 0.2;
    }

    this.reTransform();
  }

  rotateRight() {
    let tempRotate =  this.transform.rotate? this.transform.rotate: 0;
    if (tempRotate < 180) {
      this._rotate = tempRotate + 90;
    }
    this.reTransform();
  }

  rotateLeft() {
    let tempRotate =  this.transform.rotate? this.transform.rotate: 0;
    if (tempRotate > -180) {
      this._rotate = tempRotate - 90;
    }
    this.reTransform();
  }


  reset() {
    this._scale=1;
    this._rotate=0;
    this.reTransform();
  }

  cropImage() {
    this.dialogRef.close(this.imageCroppedEvent?.base64);
  }

  cancelCrop() {
    this.dialogRef.close();
  }
}

