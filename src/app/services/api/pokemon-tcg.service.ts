import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultApi} from "../../interfaces/api/result-api.interface";
@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  private params: string = '';
  private pageSize: number = 60;
  private apiUrl: string = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) {
  }

  getCards(page: number = 1): Observable<ResultApi>  {
    this.params = `?page=${page}&pageSize=${this.pageSize}`;
    return this.http.get<ResultApi>(`${this.apiUrl + this.params}`);
  }

  findCardByName(name: string): Observable<ResultApi> {
    this.params = `?orderBy=name&q=name:"*${name}*"`;
    return this.http.get<ResultApi>(`${this.apiUrl + this.params}`);
  }
}
