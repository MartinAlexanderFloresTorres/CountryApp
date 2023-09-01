import { Country } from './country';
import { Region } from './region.type';

export interface CacheStore {
  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: TermRegions;
}

export interface TermCountries {
  term: string;
  data: Country[];
}

export interface TermRegions {
  region: Region | '';
  data: Country[];
}
