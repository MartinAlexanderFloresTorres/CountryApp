import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  // Properties
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = [
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];
  public activeRegion?: Region | '';

  // Contructor
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.data;
    this.activeRegion = this.countriesService.cacheStore.byRegion.region;
  }

  // Methods
  public searchByRegion(region: Region): void {
    this.isLoading = true;
    this.activeRegion = region;

    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
