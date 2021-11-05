import { Injectable } from '@angular/core';
import { ApiService, handleInvalidRequest, InvalidRequestErrorItem, ResourceId } from '@cheesecake-ui/core/api';
import { catchError, distinctUntilChanged, filter, map, sample, switchMap, withLatestFrom } from 'rxjs/operators';
import { EditActivityCommand } from './edit-activity.domain';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { EditActivityFormService } from './edit-activity-form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class EditActivityFacadeService {
  private submitSubject = new Subject<void>();
  private submittedSubject: Subject<ResourceId> = new Subject<ResourceId>();
  private errorsSubject = new BehaviorSubject<{ summary: string, errors: InvalidRequestErrorItem[] } | null>(null);

  private activityStore = new Subject<EditActivityCommand>();
  private idStore = new Subject<ResourceId>();

  private activity$ = this.activityStore.pipe(distinctUntilChanged());
  private id$ = this.idStore.pipe(distinctUntilChanged());
  private submit$ = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  private formService: EditActivityFormService;

  public readonly submitted$ = this.submittedSubject.asObservable();
  public readonly vm$ = combineLatest([this.errors$]).pipe(
    map(([error]) => ({ error })),
    untilDestroyed(this)
  );


  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new EditActivityFormService(fb);
    this.id$.pipe(
      switchMap((id) => this.fetchActivityEdit(id)),
      untilDestroyed(this)
    ).subscribe(result => this.activityStore.next(result.data));

    this.activity$.pipe(untilDestroyed(this)).subscribe(activity => this.formService.patch(activity));


    this.formService.values$.pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      withLatestFrom(this.id$),
      switchMap(([activity, id]) => this.updateActivity(id, activity)),
      untilDestroyed(this)
    ).subscribe((response) => {
      this.submittedSubject.next(response.data);
    });
  }

  get form(): FormGroup {
    return this.formService.form;
  }

  public submit() {
    this.submitSubject.next();
  }

  public updateActivityId(id: ResourceId) {
    this.idStore.next(id);
  }

  private fetchActivityEdit(id: ResourceId) {
    return this.api.sendQuery<EditActivityCommand>(`api/activities/edit/${id}`);
  }

  private updateActivity(id: ResourceId, command: EditActivityCommand) {
    return this.api.sendCommand<ResourceId>(`api/activities/edit/${id}`, command).pipe(
      catchError(handleInvalidRequest((errorData) => {
        this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
      }))
    );
  }
}
