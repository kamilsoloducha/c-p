import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Person, Resource, ResourceEnum, Starship } from '../../common/models/resource';
import { SwapiHttpService } from '../swapi-http/swapi-http.service';
import { random } from '../utils';

@Injectable({ providedIn: 'root' })
export class CardProvider {
  private readonly swapiClinet = inject(SwapiHttpService);

  getRandomCard(elementCount: number, resourceType: ResourceEnum): Observable<Resource> {
    const randomResourceIndex = random.getRandom(1, elementCount);
    console.log(randomResourceIndex);

    switch (resourceType) {
      case ResourceEnum.People:
        return this.swapiClinet.getOrderedPerson(randomResourceIndex).pipe(
          map((dto) => {
            return { name: dto.result.properties.name, mass: Number(dto.result.properties.mass) } as Person;
          }),
        );
      case ResourceEnum.Starships:
        return this.swapiClinet.getOrderedStarship(randomResourceIndex).pipe(
          map((dto) => {
            return { name: dto.result.properties.name, crew: Number(dto.result.properties.crew) } as Starship;
          }),
        );
    }
  }
}
