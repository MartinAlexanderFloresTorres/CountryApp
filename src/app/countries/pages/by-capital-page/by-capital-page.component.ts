import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent implements OnInit {
  // Properties
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValueTerm = 'Search by capital';

  // Contructor
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.data;
    this.initialValueTerm = this.countriesService.cacheStore.byCapital.term;
  }

  // Methods
  public searchByCapital(capital: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(capital).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
