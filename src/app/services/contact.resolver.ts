import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { ContactService } from "./contact.service";
import { delay } from "rxjs";

export function contactResolver(route: ActivatedRouteSnapshot) {
    const id = route.params['id']
    return inject(ContactService).getContactById(id).pipe(delay(10))
}