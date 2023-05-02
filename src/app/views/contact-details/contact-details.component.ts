import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, lastValueFrom, map, switchMap, tap } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  // user: User | null = null;
  // moves: any[] = [];
  // title = '';
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router // private location: Location
  ) {}

  location = inject(Location);
  contact: Contact | null = null;
  contact$!: Observable<Contact>;
  ans$!: string;
  ans = '';

  ngOnInit(): void {
    console.log('test');
    this.route.paramMap.subscribe((params) => {
      const contactId = params.get('id');

      if (contactId) {
        this.contact$ = this.contactService.getContactById(contactId);
      }
    });
  }

  onBack() {
    this.router.navigateByUrl('/');
  }
}
