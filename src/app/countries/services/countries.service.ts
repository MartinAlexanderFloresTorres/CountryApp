import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  // Properties
  private API_URL: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', data: [] },
    byRegion: { region: '', data: [] },
    byCountries: { term: '', data: [] },
  };

  // Constructor
  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  // Methods
  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem('cacheStore');
    if (data) {
      this.cacheStore = JSON.parse(data);
    }
  }

  private getCountriesRequest<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError((error) => {
        console.error(error.statusText);
        return of([] as T);
      })
    );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.API_URL}/alpha/${code}`).pipe(
      map((countries) => (countries?.length > 0 ? countries[0] : null)),
      catchError((error) => {
        console.error(error.statusText);
        return of(null);
      })
    );
  }

  public searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest<Country[]>(
      `${this.API_URL}/capital/${term}`
    ).pipe(
      tap((countries) => {
        this.cacheStore.byCapital = { term, data: countries };
      }),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesRequest<Country[]>(
      `${this.API_URL}/region/${region}`
    ).pipe(
      tap((countries) => {
        this.cacheStore.byRegion = { region, data: countries };
      }),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest<Country[]>(
      `${this.API_URL}/name/${term}`
    ).pipe(
      tap((countries) => {
        this.cacheStore.byCountries = { term, data: countries };
      }),
      tap(() => this.saveToLocalStorage())
    );
  }
}
