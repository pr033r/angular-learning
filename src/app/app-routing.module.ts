import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AngularTestsComponent } from './angular-tests/angular-tests.component';


const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'heroes', component: HeroesComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'detail/:id', component: HeroDetailComponent }
	{ path: 'tests', component: AngularTestsComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }