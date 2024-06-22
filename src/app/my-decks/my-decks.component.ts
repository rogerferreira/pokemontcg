import {Component, OnInit} from '@angular/core';
import {Decks} from "../interfaces/decks.interface";
import {PokemonTcgService} from "../services/api/pokemon-tcg.service";
import {DecksService} from "../services/decks.service";

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.css']
})
export class MyDecksComponent {

  public decks: Decks[] = this.decksService.getDecks();
  public deck: Decks = this.decksService.getDeck(0);

  constructor(private api: PokemonTcgService,
              private decksService: DecksService) {
  }

  public buscar(id: number): void{
    this.deck = this.decksService.getDeck(id);
  }
}
