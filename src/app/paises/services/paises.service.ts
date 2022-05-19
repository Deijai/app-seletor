import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Region } from '../interfaces/interface';
import { Fronteira } from '../interfaces/fronteira';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private  _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get getRegions(): string[] {
    return [ ...this._regions ];
  }

  constructor(private http: HttpClient) { }

  getPaisesRegion(region: string): Observable<Region[]>{
    return this.http.get<Region[]>(`${url}region/${region}`);
  }

  getFronteiraByCode(code: string): Observable<Fronteira | null>{
    if ( !code ){
      return of(null)
    }

    return this.http.get<Fronteira>(`${url}alpha/${code}`);
  }


}
