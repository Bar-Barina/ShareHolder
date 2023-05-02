import { Injectable } from '@angular/core';
import { storageService } from './async-storage.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const KEY = 'loggedInUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUser() {
    const loggedInUser = storageService.load(KEY);
    if (loggedInUser) {
      return loggedInUser;
    } else {
      return {
        name: 'Ochoa Hyde',
        coins: 100,
        moves: [],
      };
    }
  }
  signup(name: string) {
    const loggedInUser = storageService.load(KEY);
    if (loggedInUser) {
      return;
    } else {
      const user = {
        name,
        coins: 100,
        moves: [],
      };
      storageService.store(KEY, user);
      return user;
    }
  }

  createMove(contact: any, amount: number) {
    const newMove = {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount,
    };
    return newMove;
  }

  transferCoins(amount: number, contact: string) {
    const loggedInUser = storageService.load(KEY);
    const newMove = this.createMove(contact, amount);
    loggedInUser.moves.unshift(newMove);
    loggedInUser.coins -= amount;
    this.update(loggedInUser);
    return loggedInUser;
  }
  update(user: any) {
    storageService.store(KEY, user);
  }
  getUserMoves(id: string): Observable<any[]> {
    const loggedInUser = storageService.load(KEY);
    if (loggedInUser) {
      const moves = loggedInUser.moves.filter((move: { toId: string; }) => move.toId === id);
      return of(moves).pipe(delay(1000)); // simulate async operation with a delay
    } else {
      return of([]).pipe(delay(1000)); // simulate async operation with a delay
    }
  }
}
