import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageCropperComponent } from '../../image-cropper/image-cropper.component';
import { SchoolAdminService } from '../../../services/schooladmin.service';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.scss'
})
export class CreateTeacherComponent implements OnInit{
  
  schoolId: number;
  teacherFormGroup: FormGroup;
  maxDate: Date = new Date();

 
  constructor(private schoolAdminService: SchoolAdminService, private utilService: UtilService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.schoolId = Number(this.route.snapshot.paramMap.get('id'));
    this.teacherFormGroup = new FormGroup({
      uploadFile: new FormControl(),
      photoFileName: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      description: new FormControl(),
      birthDate: new FormControl(),
      profilePictureData: new FormControl()

    });
  }

  onProfilePictureChanged(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      let uploadedFile = files[0];
      const _file = URL.createObjectURL(uploadedFile);
      this.teacherFormGroup.controls['photoFileName'].setValue(uploadedFile.name);
      this.teacherFormGroup.controls['profilePictureData'].setValue(_file);

      this.resetInput();   
      this.openAvatarEditor(_file)
      .subscribe(
        (result) => {
          if(result){
            this.teacherFormGroup.controls['profilePictureData'].setValue(result);
          }
        }
      )
    } 
  }

    resetInput() { 
      const input = document.getElementById('avatar-input-file') as HTMLInputElement;
      if(input){
        input.value = "";
      }
   }

   openAvatarEditor(image: string): Observable<any> {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: image,
    });

    return dialogRef.afterClosed();
  }
  


  createTeacher() {

    //adjust utc time.
    let selectedDate: Date = this.teacherFormGroup.controls['birthDate'].value;
    let utcSelectedDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 
          selectedDate.getHours(), selectedDate.getMinutes(), selectedDate.getSeconds()));
    this.teacherFormGroup.controls['birthDate'].setValue(utcSelectedDate);

    this.schoolAdminService.createTeacher(this.schoolId, this.teacherFormGroup.value).subscribe({
      next: (data) =>  {
        this.utilService.showSuccessMessage('Successfully created teacher.');
        this.teacherFormGroup.reset();
      },
      error: (err) => {
         this.utilService.showErrorMessage(err.error, 'Error creating teaching.');
      }
    });
  }

  resetForm() {
    this.teacherFormGroup.reset();
  }
}
