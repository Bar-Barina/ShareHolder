import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
} from 'rxjs';
import { storageService } from './async-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Contact, ContactFilter } from '../models/contact.model';
const ENTITY = 'contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {
    // Handling Demo Data, fetching from storage || saving to storage
    const contacts = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!contacts || contacts.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createContacts()));
    }
  }

  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable();

  private _contactFilter$ = new BehaviorSubject<ContactFilter>({ term: '' });
  public contactFilter$ = this._contactFilter$.asObservable();

  public loadContacts() {
    return from(storageService.query(ENTITY)).pipe(
      tap((contacts) => {
        const filterBy = this._contactFilter$.value;
        if (filterBy && filterBy.term) {
          contacts = this._filter(contacts, filterBy.term);
        }
        this._contacts$.next(this._sort(contacts));
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  public getContactById(id: string): Observable<Contact> {
    return from(storageService.get(ENTITY, id)).pipe(
      catchError(this._handleError)
    );
  }

  public deleteContact(id: string) {
    return from(storageService.remove(ENTITY, id)).pipe(
      tap(() => {
        let contacts = this._contacts$.value;
        contacts = contacts.filter((contact) => contact._id !== id);
        this._contacts$.next(contacts);
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  public saveContact(contact: Contact) {
    return contact._id
      ? this._updateContact(contact)
      : this._addContact(contact);
  }

  public getEmptyContact() {
    return {
      _id: '',
      name: '',
      email: '',
      phone: '',
    };
  }

  private _updateContact(contact: Contact) {
    return from(storageService.put(ENTITY, contact)).pipe(
      tap((updatedContact) => {
        const contacts = this._contacts$.value;
        this._contacts$.next(
          contacts.map((contact) =>
            contact._id === updatedContact._id ? updatedContact : contact
          )
        );
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  private _addContact(contact: Contact) {
    // const newContact = new Contact(
    //   (contact._id = this._getRandomId()),
    //   contact.name,
    //   contact.email,
    //   contact.phone,
    //   (contact.url =
    //     'https://images.pexels.com/photos/14564834/pexels-photo-14564834.jpeg?auto=compress&cs=tinysrgb&w=600')
    // );
    // if (typeof newContact.setId === 'function')
    //   newContact.setId(this._getRandomId());
    return from(storageService.post(ENTITY, contact)).pipe(
      tap((newContact) => {
        const contacts = this._contacts$.value;
        // contacts.unshift(newContact) //added
        this._contacts$.next([...contacts, newContact]);
        return newContact //added
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  private _filter(contacts: Contact[], term: string) {
    term = term.toLocaleLowerCase();
    return contacts.filter((contact) => {
      return (
        contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toString().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
      );
    });
  }

  public setFilter(contactFilter: ContactFilter) {
    this._contactFilter$.next({ ...contactFilter });
    this.loadContacts().subscribe();
  }

  private _createContacts() {
    const contacts = [
      {
        _id: '5a56640269f443a5d64b32ca',
        name: 'Ochoa Hyde',
        email: 'ochoahyde@renovize.com',
        phone: '+1 (968) 593-3824',
      },
      {
        _id: '5a5664025f6ae9aa24a99fde',
        name: 'Hallie Mclean',
        email: 'halliemclean@renovize.com',
        phone: '+1 (948) 464-2888',
      },
      {
        _id: '5a56640252d6acddd183d319',
        name: 'Parsons Norris',
        email: 'parsonsnorris@renovize.com',
        phone: '+1 (958) 502-3495',
      },
      {
        _id: '5a566402ed1cf349f0b47b4d',
        name: 'Rachel Lowe',
        email: 'rachellowe@renovize.com',
        phone: '+1 (911) 475-2312',
      },
      {
        _id: '5a566402abce24c6bfe4699d',
        name: 'Dominique Soto',
        email: 'dominiquesoto@renovize.com',
        phone: '+1 (807) 551-3258',
      },
      {
        _id: '5a566402a6499c1d4da9220a',
        name: 'Shana Pope',
        email: 'shanapope@renovize.com',
        phone: '+1 (970) 527-3082',
      },
      {
        _id: '5a566402f90ae30e97f990db',
        name: 'Faulkner Flores',
        email: 'faulknerflores@renovize.com',
        phone: '+1 (952) 501-2678',
      },
      {
        _id: '5a5664027bae84ef280ffbdf',
        name: 'Holder Bean',
        email: 'holderbean@renovize.com',
        phone: '+1 (989) 503-2663',
      },
      {
        _id: '5a566402e3b846c5f6aec652',
        name: 'Rosanne Shelton',
        email: 'rosanneshelton@renovize.com',
        phone: '+1 (968) 454-3851',
      },
      {
        _id: '5a56640272c7dcdf59c3d411',
        name: 'Pamela Nolan',
        email: 'pamelanolan@renovize.com',
        phone: '+1 (986) 545-2166',
      },
      {
        _id: '5a5664029a8dd82a6178b15f',
        name: 'Roy Cantu',
        email: 'roycantu@renovize.com',
        phone: '+1 (929) 571-2295',
      },
      {
        _id: '5a5664028c096d08eeb13a8a',
        name: 'Ollie Christian',
        email: 'olliechristian@renovize.com',
        phone: '+1 (977) 419-3550',
      },
      {
        _id: '5a5664026c53582bb9ebe9d1',
        name: 'Nguyen Walls',
        email: 'nguyenwalls@renovize.com',
        phone: '+1 (963) 471-3181',
      },
      {
        _id: '5a56640298ab77236845b82b',

        name: 'Glenna Santana',
        email: 'glennasantana@renovize.com',
        phone: '+1 (860) 467-2376',
      },
      {
        _id: '5a56640208fba3e8ecb97305',
        name: 'Malone Clark',
        email: 'maloneclark@renovize.com',
        phone: '+1 (818) 565-2557',
      },
      {
        _id: '5a566402abb3146207bc4ec5',
        name: 'Floyd Rutledge',
        email: 'floydrutledge@renovize.com',
        phone: '+1 (807) 597-3629',
      },
      {
        _id: '5a56640298500fead8cb1ee5',
        name: 'Grace James',
        email: 'gracejames@renovize.com',
        phone: '+1 (959) 525-2529',
      },
      {
        _id: '5a56640243427b8f8445231e',
        name: 'Tanner Gates',
        email: 'tannergates@renovize.com',
        phone: '+1 (978) 591-2291',
      },
      {
        _id: '5a5664025c3abdad6f5e098c',
        name: 'Lilly Conner',
        email: 'lillyconner@renovize.com',
        phone: '+1 (842) 587-3812',
      },
    ];
    return contacts;
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('error in pet service:', err);
    return throwError(() => err);
  }

  private _getRandomId(length = 8): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
}
