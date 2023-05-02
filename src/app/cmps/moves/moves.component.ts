import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.scss'],
})
export class MovesComponent implements OnInit {
  @Input()
  userId!: string;
  moves: any[] = [];
  title: string = 'Moves';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || this.userId;
    if (id) {
      this.userService.getUserMoves(id).subscribe((moves: any[]) => {
        this.moves = moves.filter((move) => move.toId === id);
      });
    }
  }
}
