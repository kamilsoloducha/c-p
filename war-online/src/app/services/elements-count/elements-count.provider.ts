import { Injectable, inject, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceEnum } from '../../common/models/resource';
import { SwapiHttpService } from '../swapi-http/swapi-http.service';

@Injectable()
export abstract class ResourceElementsCountProvider {
  abstract type(): ResourceEnum;
  abstract getCount(): Observable<number>;
}

@Injectable()
export class PeopleElementsCountProvider implements ResourceElementsCountProvider {
  private readonly swapiClient = inject(SwapiHttpService);

  getCount(): Observable<number> {
    return this.swapiClient.getPeopleCount();
  }

  type(): ResourceEnum {
    return ResourceEnum.People;
  }
}

@Injectable()
export class StarshipElementsCountProvider implements ResourceElementsCountProvider {
  private readonly swapiClient = inject(SwapiHttpService);

  getCount(): Observable<number> {
    return this.swapiClient.getStarshipCount();
  }

  type(): ResourceEnum {
    return ResourceEnum.Starships;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ResourceElementsCountProviderResolver {
  constructor(
    @Inject(ResourceElementsCountProvider)
    private readonly providers: ResourceElementsCountProvider[],
  ) {}

  getProvider(resourceType: ResourceEnum): ResourceElementsCountProvider {
    return this.providers.find((x) => x.type() === resourceType)!;
  }
}
