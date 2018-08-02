import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-name-editor',
	templateUrl: './name-editor.component.html',
	styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent implements OnInit {

	public name = new FormControl('');

	public profileForm = new FormGroup({
		firstName: new FormControl(''),
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
    		})
	});

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
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
