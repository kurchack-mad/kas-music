import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public showUi: boolean = true;
  public nodeError: string | undefined;
  public retryConnect$: Subject<void> = new Subject<void>();

  constructor() {
    const showUi = localStorage.getItem('showUi') === null ? true : localStorage.getItem('showUi') === 'true';
    this.showUi = showUi;
  }
}
