import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css'],
  styles: [],
})
export class CountryPageComponent implements OnInit {
  // Properties
  public country: Country | null = null;

  // Contructor
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.countriesService.searchCountryByAlphaCode(id);
        })
      )
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('/');

        return (this.country = country);
      });
  }
}
