// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

const routes: Routes = [
  {
    path: 'by-capital',
    title: 'By Capital',
    component: ByCapitalPageComponent,
  },
  {
    path: 'by-country',
    title: 'By Country',
    component: ByCountryPageComponent,
  },
  {
    path: 'by-region',
    title: 'By Region',
    component: ByRegionPageComponent,
  },
  {
    path: 'by/:id',
    title: 'Country',
    component: CountryPageComponent,
  },

  {
    path: '**',
    redirectTo: 'by-capital',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
