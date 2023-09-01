import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  // Properties
  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  // Implements
  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onValue.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  @Input()
  public placeholder: string = 'Search...';

  @Input()
  public initialValue: string = 'Search...';

  @Output()
  public onValue = new EventEmitter<string>();

  // Methods
  public onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
