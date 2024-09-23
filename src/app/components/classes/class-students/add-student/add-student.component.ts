import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SchoolAdminService } from '../../../../services/schooladmin.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropper1Component } from '../../../image-cropper1/image-cropper1.component';
import { UtilService } from '../../../../services/util.service';


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
    private schoolAdminService: SchoolAdminService, private utilService: UtilService, private matDialog: MatDialog) {
    this.createStudentForm =  new FormGroup({
        profilePictureData: new FormControl(),
        photoFileName: new FormControl(),
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[\\+]?[0-9]+$') ]),
        registrationNumber: new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z]{2,4}\\-[0-9]+')]),
        birthDate: new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
        fatherName: new FormControl(),
        motherName: new FormControl(),
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
    formValueCopy.hobbies = hobbies;

    let selectedDate: Date = this.createStudentForm.controls['birthDate'].value;
    let utcSelectedDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 
          selectedDate.getHours(), selectedDate.getMinutes(), selectedDate.getSeconds()));
    formValueCopy.birthDate = utcSelectedDate;

    delete formValueCopy['hobbiesChecked'];
    delete formValueCopy['hobbiesInput'];
    this.schoolAdminService.createStudent(this.data.schoolId, this.data.classId, formValueCopy).subscribe({
      next:(data) => {
        this.dialogRef.close(data);
        this.utilService.showSuccessMessage(`Successfully added student ${data.firstName} ${data.lastName}.`);
      },
      error: (err) => {
        this.utilService.showErrorMessage(err.error, 'An unexpected error occured while creating student.');
      }
    })
  }
}
