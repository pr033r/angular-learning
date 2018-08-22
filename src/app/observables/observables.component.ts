import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit {

	public observableMessages: Array<string> = [];
	public customObservableMessages: Array<string> = [];

	public myObservable = of(1, 2, 3, 4, 5);
	public myObserver = {
		next: x => this.observableMessages.push(x),
		error: err => this.observableMessages.push(`err: ${err}`),
		complete: () => this.observableMessages.push('observer is complete')
	};

	constructor() { }

	ngOnInit() {
		this.myObservable.subscribe(this.myObserver);
		this.myObservable.subscribe(
			x => this.observableMessages.push(`inline observable: ${x}`)
		);

		const sequence = new Observable(customObservable);
		sequence.subscribe({
			next(x) { console.log(x) },
			complete() { console.log('complete sequence') }
		});
	}

}

function customObservable(observer: any) {
	observer.next(20);
	observer.next(30);
	observer.next(40);
	observer.complete();

	// nothing more to do -> unsubscribe
	return {unsubscribe() {}};
}