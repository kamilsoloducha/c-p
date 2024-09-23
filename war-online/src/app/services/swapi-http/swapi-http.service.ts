import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { PeopleSummaryDto } from '../../common/dtos/people-summary.dto';
import { StarshipSummaryDto } from '../../common/dtos/starship-summary.dto';
import { StarshipDto } from '../../common/dtos/starship.dto';
import { PersonDto } from '../../common/dtos/person.dto';

@Injectable({
  providedIn: 'root',
})
export class SwapiHttpService {
  readonly swapiUrl = 'https://www.swapi.tech/api';
  readonly httpClient = inject(HttpClient);

  public getPerson(personId: number): Observable<PersonDto> {
    return this.httpClient.get<PersonDto>(`${this.swapiUrl}/people/${personId}`);
  }

  public getOrderedPerson(index: number): Observable<PersonDto> {
    return this.httpClient.get<PeopleSummaryDto>(`${this.swapiUrl}/people?page=${index}&limit=1`).pipe(switchMap((peopleSummaryDto) => this.getPerson(Number(peopleSummaryDto.results[0].uid))));
  }

  public getPeopleCount(): Observable<number> {
    return this.httpClient.get<PeopleSummaryDto>(`${this.swapiUrl}/people`).pipe(map((response: PeopleSummaryDto) => response.total_records));
  }

  public getStarship(starshipId: number): Observable<StarshipDto> {
    return this.httpClient.get<StarshipDto>(`${this.swapiUrl}/starships/${starshipId}`);
  }

  public getStarshipCount(): Observable<number> {
    return this.httpClient.get<StarshipSummaryDto>(`${this.swapiUrl}/starships`).pipe(map((response: StarshipSummaryDto) => response.total_records));
  }

  public getOrderedStarship(index: number): Observable<StarshipDto> {
    return this.httpClient.get<StarshipSummaryDto>(`${this.swapiUrl}/starships?page=${index}&limit=1`).pipe(switchMap((starshipDto) => this.getStarship(Number(starshipDto.results[0].uid))));
  }
}
