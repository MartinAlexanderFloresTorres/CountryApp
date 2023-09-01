import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent implements OnInit {
  // Properties
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValueTerm = 'Search by country';

  // Contructor
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.data;
    this.initialValueTerm = this.countriesService.cacheStore.byCountries.term;
  }

  // Methods
  public searchByCountry(region: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(region).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
