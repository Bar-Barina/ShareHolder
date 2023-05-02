import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent {
  @Input() contact: any;
  amount = 0;

  constructor(private userService: UserService) {}

  onSetAmount(event: Event) {
    this.amount = Number((<HTMLInputElement>event.target).value);
  }

  onTransferCoins(contact: any) {
    const updatedUser = this.userService.transferCoins(this.amount, contact);
    this.userService.update(updatedUser);
  }
}
