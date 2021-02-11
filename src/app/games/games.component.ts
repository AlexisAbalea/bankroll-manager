import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor() { }

  games: Game[] = [];

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    let gameMock1 = new Game('01/01/2021', 'Tournois', 10, 15.50);
    let gameMock2 = new Game('02/01/2021', 'Cash game', 15.50, 8.21);
    const mockGames = [gameMock1, gameMock2];
    this.games.push(...mockGames);
  }

}
