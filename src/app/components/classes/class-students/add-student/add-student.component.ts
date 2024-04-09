import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SchoolAdminService } from '../../../../services/schooladmin.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropper1Component } from '../../../image-cropper1/image-cropper1.component';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {

  availableHobbies: Array<string> =  ['Sport', 'Music', 'Reading', 'Painting', 'Travelling', 'Hiking', 'Cooking', 'Photography', 'Video game' ];
  croppedStudentPhoto: any;
  maxDate: Date = new Date();
  
  createStudentForm:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddStudentComponent>,
    private schoolAdminService: SchoolAdminService, private matDialog: MatDialog, private domSanitizer: DomSanitizer) {
    this.createStudentForm =  new FormGroup({
        profilePictureData: new FormControl(),
        photoFileName: new FormControl(),
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phoneNumber: new FormControl(null, [Validators.required ]),
        registrationNumber: new FormControl(null, [Validators.required]),
        birthDate: new FormControl(),
        gender: new FormControl(null, [Validators.required]),
        fatherName: new FormControl(null, [Validators.required ]),
        motherName: new FormControl(null, Validators.required),
        hobbiesChecked: new FormGroup({}),
        hobbiesInput: new FormArray([

        ])
     })

     for (let hobby of this.availableHobbies) {
      this.hobbiesCheckedFormGroup.registerControl(hobby, new FormControl(false));
     }
  }
  
  ngOnInit(): void {

  }

  onProfilePictureChanged(event: any): void {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      let uploadedFile = files[0];
      this.createStudentForm.controls['photoFileName'].setValue(uploadedFile.name);
      let reader: FileReader = new FileReader();
      reader.onloadend = () => {
        let imageData = reader.result as string;
        let croperDialogRef = this.matDialog.open(ImageCropper1Component, 
          {
            width: '35vw',
            height: '70vh',
            data: {
              base64Image: imageData
            } 
          })
          croperDialogRef.afterClosed().subscribe({
            next: (data) => {
              console.log(data);
              // let reader1: FileReader = new FileReader();
              // reader1.onloadend = () => {
              //   let imageData = reader.result as string;
              //   this.croppedStudentPhoto = imageData;
              // console.log(this.croppedStudentPhoto);
              // };
              // reader1.readAsDataURL(data.blob);
              if (data) {
                this.createStudentForm.get('profilePictureData')?.setValue(data); 
              }

            }
          })
      }
      const base64Image = reader.readAsDataURL(uploadedFile);
    
    }
  } 



  get hobbiesCheckedFormGroup(): FormGroup {
    return this.createStudentForm.get('hobbiesChecked') as FormGroup;
  }

  get hobbiesInputFormArray(): FormArray<any> {
    return this.createStudentForm.get('hobbiesInput') as FormArray;
  }

  addNewInputHobby() {
    this.hobbiesInputFormArray.push(new FormControl())
  }

  removeHobby(index: number) {
    this.hobbiesInputFormArray.removeAt(index);
  }

  close(): void {
    this.dialogRef.close();
  }

  createStudent() {
    let formValueCopy: any = {};
    Object.assign(formValueCopy, this.createStudentForm.value );
    let hobbies: Array<string> =  Object.keys(formValueCopy.hobbiesChecked).filter( key => formValueCopy.hobbiesChecked[key] === true);
 
    formValueCopy.hobbiesInput.forEach((hobbyInput: string) => {
        if (hobbyInput) {
          hobbies.push(hobbyInput);
        }
    });
    console.log(hobbies);
    formValueCopy.hobbies = hobbies;
    delete formValueCopy['hobbiesChecked'];
    delete formValueCopy['hobbiesInput'];
    console.log(formValueCopy)
    this.schoolAdminService.createStudent(this.data.schoolId, this.data.classId, formValueCopy).subscribe({
      next:(data) => console.log(data),
      error: (err) => console.error(err)
    })
  }
}
