import { Component, OnInit } from '@angular/core';
import { Observable, of, interval, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { retry, catchError, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit {

	public observableMessages: Array<string> = [];

	public myObservable = of(1, 2, 3, 4, 5);
	public myObserver = {
		next: x => this.observableMessages.push(x),
		error: err => this.observableMessages.push(`err: ${err}`),
		complete: () => this.observableMessages.push('observer is complete')
	};

	public ESC_KEY: number = 27;

	public mouseX: number = 0;
	public mouseY: number = 0;

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

		const inputBox = document.getElementById('name') as HTMLInputElement;
		const subscription = fromEvent_custom(inputBox, 'keydown').subscribe(
			(e: KeyboardEvent) => {
				if (e.keyCode === this.ESC_KEY) {
					this.observableMessages.push(`'escape' key pressed`);
					console.log(`'escape' key pressed`);
				}
			}
		);

		const myInterval = interval(5000);
		myInterval.subscribe(
			x => console.warn(`after ${x} iteration has been called this observable`)
		);

		const mouseBox = document.getElementById('mouse-box') as HTMLInputElement;
		const mouseMoves = fromEvent(mouseBox, 'mousemove');

		const mouseMovesObservable = mouseMoves.subscribe(
			(e: MouseEvent) => {
				this.mouseX = e.clientX;
				this.mouseY = e.clientY;
			}
		);

		const apiData$ = ajax('api/data') // $ means, that this is an Observable variable
		.pipe(
			retry(3), // do not use for user authentication
			map(res => {
				if (!res.response){
					throw new Error('Some error');
				}
				return res.response;	
			}),
			catchError(err => of([]))
		).subscribe({
			next(res) { console.log('data: ', res); },
			error(err) { console.log('errors already caught... will not run'); }
		});

		const numbers = of(1, 5, 7);
		const squareNumbers = map(val => +val * +val);
		const squaredNumbers = squareNumbers(numbers);
		squaredNumbers.subscribe(x => console.log(`squared number: ${x}`));

		numbers.pipe(
			filter(x => x > 1),
			map(x => x + 1)
		).subscribe(x => console.log(`pipes nubmers: ${x}`));
	}

}


// CUSTOM OBSERVABLE
// equivalent of Observable.of(...)
function customObservable(observer: any) {
	observer.next(20);
	observer.next(30);
	observer.next(40);
	observer.complete();

	// nothing more to do -> unsubscribe
	return {unsubscribe() {}};
}

// CUSTOM OBSERVABLE
// equivalent of Observable.of(...)
function fromEvent_custom(target: any, eventName: string) {
	return new Observable((observer) => {

		const handler = x => observer.next(x);
		target.addEventListener(eventName, handler);

		return () => {
			target.removeEventListener(eventName, handler);
		};

	});
}