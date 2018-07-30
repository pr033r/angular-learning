import { Component, OnInit } from '@angular/core';
import { HeroForForms } from '../hero-for-forms';

@Component({
	selector: 'app-hero-form',
	templateUrl: './hero-form.component.html',
	styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

	public powers: Array<string> = [
		'huge',
		'flexible',
		'both of them',
		'Rammstein'
	];

	public defaultHero: HeroForForms = new HeroForForms(
		0, 'Till', this.powers[3], 'poems'
	);

	public heroes: Array<HeroForForms> = new Array<HeroForForms>();

	public submitted: boolean = false;

	constructor() { }

	ngOnInit() {
		this.heroes.push(this.defaultHero);
	}

	public onSubmit() {
		this.submitted = true;
	}

	public newHero() {
		this.heroes.push(new HeroForForms(
			this.getLastId() + 1,
			this.defaultHero.name,
			this.defaultHero.power,
			this.defaultHero.alterEgo
		));
	}

	private getLastId(): number {
		return this.heroes[this.heroes.length - 1].id;
	}

}
