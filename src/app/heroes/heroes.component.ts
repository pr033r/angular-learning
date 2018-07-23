import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[];
	private selectedHero: Hero;

  constructor(private heroService: HeroService) { }

	ngOnInit() {
    this.getHeroes();
	}

	public onSelect(hero: Hero){
		this.selectedHero = hero;
	}

  public getHeroes(): void{
    this.heroService.getHeroes().
      subscribe( 
        heroes => this.heroes = heroes 
       );
  }

  public add(name: string): void{
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  public deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(filterString => filterString !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
