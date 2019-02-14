import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';

import { Subject, Observable, SubscriptionLike, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[appTimer]'
})
export class TimerDirective implements OnChanges, OnDestroy {

  private _timer = new Subject<any>();
  private _timerSub: SubscriptionLike;

  @Input() timer: number;
  @Input() interval: number;
  @Output() value = new EventEmitter<number>();

  constructor() {

    this._timerSub = this._timer.pipe(
      switchMap((options: any) =>
        timer(0, options.interval).pipe(
          take(options.count),
          tap(() => this.value.emit(--options.count))
        )
      )
    ).subscribe();
  }

  ngOnChanges() {
    this._timer.next({ count: this.timer, interval: this.interval });
  }

  ngOnDestroy(): void {
    this._timerSub.unsubscribe();
  }
}
