import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
                                                   
	private heroesUrl: string = 'api/heroes';
	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(
		private http: HttpClient,
		private messageService: MessageService) 
	{ }

	public getHeroes(): Observable<Hero[]>{
		this.messageService.add("HeroService: Heroes has been downloaded.");
		// return of(HEROES);
		return this.http.get<Hero[]>(this.heroesUrl)
			.pipe(
				tap(heroes => console.log(`fetched heroes`)),
				catchError(this.handleError<Hero[]>('getHeroes', []))
			);
	}

	public getHero(id: number): Observable<Hero> {
		this.messageService.add(`HeroService: Fetched hero id=${id}`);
		// return of(HEROES.find(hero => hero.id === id));
		const url: string = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url)
			.pipe(
				tap(_ => console.log(`fetched hero id=${id}`)),
				catchError(this.handleError<Hero>(`getting hero id=${id}`))
			);
	}

	public getHeroNo404<Data>(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/?id=${id}`;
		return this.http.get<Hero[]>(url).pipe(
   			map(heroes => heroes[0]), // returns a {0|1} element array
   			tap(status => {
     			const outcome = status ? `fetched` : `did not find`;
     			this.log(`${outcome} hero id=${id}`);
   			}),
   			catchError(this.handleError<Hero>(`getHero id=${id}`))
 		);
  	}

	public save(hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, this.httpOptions)
			.pipe(
				tap(() => console.log(`Saving hero id:${hero.id} => ${hero.name}`)),
				catchError(this.handleError<any>(`Saving hero ${hero.name}, id:${hero.id}`))
			);
	}

	public addHero(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
			.pipe(
				tap(hero => console.log(`Hero ${hero}.name was added`)),
				catchError(this.handleError<Hero>(`addHero`))
			);
	}

	public searchHeroes(term: string): Observable<Hero[]>{
		if (!term.trim()){
			return of([]);
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
			tap(_ => this.log(`Selecting heroes by term: ${term}`)),
			catchError(this.handleError<Hero[]>('select heroes', []))
		);
	}

	public log(message: string): void {
		this.messageService.add(`HeroService: ${message}`);
	}

	private handleError<T> (operation: string = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	public deleteHero(hero: Hero | number): Observable<Hero>{
		const id = typeof hero === 'number' ? hero : hero.id;
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete<Hero>(url, this.httpOptions)
			.pipe(
				tap(_ => this.log(`Hero id: ${id} was deleted.`)),
				catchError(this.handleError<Hero>('deleteHero'))
			);
	}
}
