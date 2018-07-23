import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-tests',
  templateUrl: './angular-tests.component.html',
  styleUrls: ['./angular-tests.component.css']
})
export class AngularTestsComponent implements OnInit {

	public events: string = '';
	public keys: string = '';
	public values: Array<string> = ['Adam', 'Hanz', 'Richard']

	constructor() { }

	// in event are too much data what we dont need...
	public keyUpEvent(event: any | KeyboardEvent) {
		this.events += event.target.value + ' | ';
		this.keys += event.key + ' | ';
	}

	public keyUpValue(value: string) {
		if (value.trim()){
			this.values.push(value);
		}
	}

	ngOnInit() {
	}

}
