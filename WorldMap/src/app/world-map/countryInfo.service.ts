import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export type WorldMapResponse = [ResponseMeta, ResponseData[]];

export interface ResponseMeta {
  page: number;
  pages: number;
  per_page: string;
  total: number;
}

export interface ResponseData {
  id: string;
  iso2Code: string;
  name: string;
  region: Region;
  adminregion: Adminregion;
  incomeLevel: IncomeLevel;
  lendingType: LendingType;
  capitalCity: string;
  longitude: string;
  latitude: string;
}

export interface Region {
  id: string;
  iso2code: string;
  value: string;
}

export interface Adminregion {
  id: string;
  iso2code: string;
  value: string;
}

export interface IncomeLevel {
  id: string;
  iso2code: string;
  value: string;
}

export interface LendingType {
  id: string;
  iso2code: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryInfoService {
  constructor(private http: HttpClient) {}

  callAPI(countryCode: string) {
    // API basic call structures. API Basic Call Structures – World Bank Data Help Desk. (n.d.).
    //  https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures
    const _url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;
    return this.http.get<WorldMapResponse>(_url);
  }
}
