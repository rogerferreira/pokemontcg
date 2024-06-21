import {Component, OnInit} from '@angular/core';
import {PokemonTcgService} from "../services/api/pokemon-tcg.service";
import {DecksService} from "../services/decks.service";
import {ResultApi} from "../interfaces/api/result-api.interface";
import {Decks} from "../interfaces/decks.interface";
import {ConfigApiService} from "../services/config-api.service";


@Component({
  selector: 'app-create-decks',
  templateUrl: './create-decks.component.html',
  styleUrls: ['./create-decks.component.css']
})
export class CreateDecksComponent implements OnInit {
  public decks: Decks[] = this.decksService.getDecks();
  public cards: any[] = [];

  constructor(private api: PokemonTcgService,
              private decksService: DecksService,
              private configService: ConfigApiService) {
  }

  ngOnInit(): void {
    this.cards = this.configService.getConfig().data;
  }

  public find() {
    this.api.findCardByName('PIKACHU').subscribe({
        next: (result: ResultApi): void => {
          this.cards = result.data;
          // this.save('Baralho5',this.cards);
        },
        error: () => {
          console.log('erro');
        },
        complete: () => console.log('FInalizou')
      }
    );
  }

  private save(name: string, cards: any[]): void {
    this.decks = this.decksService.getDecks();
    const buscando: Decks[] = this.decks.filter((deck: Decks): boolean => deck.name == name);
    if (!(buscando.length > 0)) {
      this.decks = this.decksService.addCard({'name': name, 'cards': cards}, this.decks);
      this.decksService.addDeck(this.decks);
    }
  }
}
