import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-signup-page',
templateUrl: './signup.component.html',
styleUrls: ['./signup.component.scss']
})
export class SignupPageComponent {
name: string = '';

constructor(private userService: UserService, private router: Router) {}

onSignup(event: Event) {
event.preventDefault();
this.userService.signup(this.name);
this.router.navigate(['/userDetails']);
}

onHandleChange(event: Event) {
this.name = (event.target as HTMLInputElement).value;
}
}