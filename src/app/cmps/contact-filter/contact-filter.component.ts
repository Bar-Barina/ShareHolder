import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ContactFilter } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
})
export class ContactFilterComponent implements OnInit, OnDestroy {
  
  constructor(private contactService: ContactService) {}
  destroySubject$ = new Subject<null>();
  filterSubject$ = new Subject();
  contactFilter = {} as ContactFilter;

  ngOnInit(): void {
    this.contactService.contactFilter$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((contactFilter) => {
        this.contactFilter = contactFilter;
      });

    this.filterSubject$
      .pipe(
        takeUntil(this.destroySubject$),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(() => {
        console.log('calling query');
        this.contactService.setFilter(this.contactFilter)
      });
  }

  onSetFilter(val: string) {
    console.log('val:', val);
    this.contactService.setFilter(this.contactFilter)
    this.filterSubject$.next(val);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }
}
