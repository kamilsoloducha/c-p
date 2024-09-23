import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SwapiHttpService } from './swapi-http.service';
import { PersonDto } from '../../common/dtos/person.dto';
import { provideHttpClient } from '@angular/common/http';
import { StarshipDto } from '../../common/dtos/starship.dto';
import { PeopleSummaryDto } from '../../common/dtos/people-summary.dto';
import { StarshipSummaryDto } from '../../common/dtos/starship-summary.dto';

describe('SwapiHttpService', () => {
  let swapiService: SwapiHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting(), SwapiHttpService] }).compileComponents();
    swapiService = TestBed.inject(SwapiHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should getPerson', () => {
    let result: PersonDto | undefined;
    swapiService.getPerson(1).subscribe((v) => (result = v));
    const req = httpMock.expectOne({ url: `${swapiService.swapiUrl}/people/1` });
    req.flush({ result: { properties: { name: 'name', mass: '20' } } } as PersonDto);

    expect(result).toEqual({ result: { properties: { name: 'name', mass: '20' } } } as PersonDto);
  });

  it('should getOrderedPerson', () => {
    let result: PersonDto | undefined;
    swapiService.getOrderedPerson(10).subscribe((v) => (result = v));
    const req2 = httpMock.expectOne({ url: `${swapiService.swapiUrl}/people?page=10&limit=1` });
    req2.flush({ results: [{ uid: '5' }] } as PeopleSummaryDto);
    const req1 = httpMock.expectOne({ url: `${swapiService.swapiUrl}/people/5` });
    req1.flush({ result: { properties: { name: 'name', mass: '20' } } } as PersonDto);

    expect(result).toEqual({ result: { properties: { name: 'name', mass: '20' } } } as PersonDto);
  });

  it('should getPeopleCount', () => {
    let result: number | undefined;
    swapiService.getPeopleCount().subscribe((v) => (result = v));
    const req = httpMock.expectOne({ url: `${swapiService.swapiUrl}/people` });
    req.flush({ total_records: 20 } as PeopleSummaryDto);

    expect(result).toEqual(20);
  });

  it('should getStarship', () => {
    let result: StarshipDto | undefined;
    swapiService.getStarship(1).subscribe((v) => (result = v));
    const req = httpMock.expectOne({ url: `${swapiService.swapiUrl}/starships/1` });
    req.flush({ result: { properties: { name: 'name', crew: '20' } } } as StarshipDto);

    expect(result).toEqual({ result: { properties: { name: 'name', crew: '20' } } } as StarshipDto);
  });

  it('should getStarship', () => {
    let result: number | undefined;
    swapiService.getStarshipCount().subscribe((v) => (result = v));
    const req = httpMock.expectOne({ url: `${swapiService.swapiUrl}/starships` });
    req.flush({ total_records: 20 } as StarshipSummaryDto);

    expect(result).toEqual(20);
  });

  it('should getOrderedStarship', () => {
    let result: StarshipDto | undefined;
    swapiService.getOrderedStarship(10).subscribe((v) => (result = v));
    const req2 = httpMock.expectOne({ url: `${swapiService.swapiUrl}/starships?page=10&limit=1` });
    req2.flush({ results: [{ uid: '5' }] } as StarshipSummaryDto);
    const req1 = httpMock.expectOne({ url: `${swapiService.swapiUrl}/starships/5` });
    req1.flush({ result: { properties: { name: 'name', crew: '20' } } } as StarshipDto);

    expect(result).toEqual({ result: { properties: { name: 'name', crew: '20' } } } as StarshipDto);
  });
});
