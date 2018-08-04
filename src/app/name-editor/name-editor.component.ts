import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-name-editor',
	templateUrl: './name-editor.component.html',
	styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent implements OnInit {

	public name = new FormControl('');

	public profileForm = new FormGroup({
		firstName: new FormControl('', [
			Validators.required,
			Validators.minLength(4)
			]),
		lastName: new FormControl(''),
		address: new FormGroup({
      		street: new FormControl(''),
      		city: new FormControl(''),
      		state: new FormControl(''),
      		zip: new FormControl('')
    		})
	});

	public profileFormBuilder = this.fb.group({
		firstName: ['', Validators.required],
		lastName: [''],
		address: this.fb.group({
      		street: [''],
      		city: [''],
      		state: [''],
      		zip: ['']
    		}),
		aliases: this.fb.array([
			this.fb.control('1st form builder control'),
			this.fb.control('2nd form builder control')
			])
	});

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
	}

	public get firstName() {
		return this.profileForm.get('firstName');
	}

	public get aliases() {
		return this.profileFormBuilder.get('aliases') as FormArray;
	}

	public addAlias() {
		this.aliases.push(this.fb.control('defaultValue'));
	}

	public updateName(): void {
		const newName = 'value getted from Backend API';
		this.name.setValue(newName);
	}

	public updateProfile(): void {
		this.profileForm.patchValue({
			firstName: 'Till',
			address: {
				city: 'Berlin'
			}
		});
	}

	public updateProfileFormBuilder(): void {
		this.profileFormBuilder.patchValue({
			firstName: 'Till',
			address: {
				city: 'Berlin'
			}
		});	
	}

	public onSubmit(): void {
		console.warn(this.profileForm.value);
	}

	public onSubmitFormBuilder(): void {
		console.warn(this.profileFormBuilder.value);	
	}

}

// if name contains regex expresion
export function forbiddenNameValidator(name: RegExp): ValidatorFn {
	return (control: AbstractControl): {/* f-ction*/};
}