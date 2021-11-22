import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ResourceId } from '@cheesecake-ui/core/api';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class DetailsCalendarFacadeService {
  private idStore = new Subject<ResourceId>();

  public updateActivityId(id: ResourceId) {
    this.idStore.next(id);
  }
}
