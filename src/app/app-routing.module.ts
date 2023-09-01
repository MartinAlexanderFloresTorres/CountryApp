// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'countries',
    title: 'Countries',
    loadChildren: () =>
      import('./countries/countries.module').then(
        (module) => module.CountriesModule
      ),
  },
  {
    path: '**',
    title: 'Countries',
    redirectTo: 'countries',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
