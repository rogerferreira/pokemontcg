import {Component, OnInit} from '@angular/core';
import {PokemonTcgService} from "../services/api/pokemon-tcg.service";
import {DecksService} from "../services/decks.service";
import {ResultApi} from "../interfaces/api/result-api.interface";
import {Decks} from "../interfaces/decks.interface";
import {ConfigApiService} from "../services/config-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-decks',
  templateUrl: './create-decks.component.html',
  styleUrls: ['./create-decks.component.css']
})
export class CreateDecksComponent implements OnInit {
  public decks: Decks[] = this.decksService.getDecks();
  public cards: any[] = [];
  public deck: any[] = [];
  public name: string = '';

  constructor(private router: Router,
              private api: PokemonTcgService,
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
        },
        error: () => {
          console.log('erro');
        },
        complete: () => console.log('FInalizou')
      }
    );
  }

  public CheckCardSelected(card: any): boolean {
    return this.deck.filter((cards): boolean => cards.id == card.id).length > 0;
  }

  public selectCard(card: any): void {
    if (this.CheckCardSelected(card)) {
      this.deck = this.deck.filter((cards): boolean => cards != card);
      return;
    }
    this.deck.push(card);
  }

  public async prepareSave(): Promise<void> {
    if (this.validName()) {
      await this.save(this.name);
      await this.router.navigate(['']);
      return ;
    }
  }

  private validName(): boolean {
    return !(this.name.length < 3 || this.name.length > 20);
  }

  private CheckDecksExist(name: string): boolean {
    return this.decks.filter((deck: Decks): boolean => deck.name == name).length > 0;
  }

  public async save(name: string): Promise<void> {
    this.decks = this.decksService.getDecks();
    if (!this.CheckDecksExist(name)) {
      this.decks = this.decksService.addDeck({'name': name, 'cards': this.deck}, this.decks);
      await this.decksService.createDeck(this.decks);
    }
  }
}
