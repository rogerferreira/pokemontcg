import {Component, OnInit} from '@angular/core';
import {PokemonTcgService} from "../services/api/pokemon-tcg.service";
import {DecksService} from "../services/decks.service";
import {ResultApi} from "../interfaces/api/result-api.interface";
import {Decks} from "../interfaces/decks.interface";
import {ConfigApiService} from "../services/config-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigApi} from "../interfaces/storage/config-api.interface";

@Component({
  selector: 'app-create-decks',
  templateUrl: './create-decks.component.html',
  styleUrls: ['./create-decks.component.css']
})
export class CreateDecksComponent implements OnInit {
  public decks: Decks[] = this.decksService.getDecks();
  public getCards: ConfigApi = this.configService.getConfig();
  public cards: any[] = [];
  public deck: Decks = {'name':'', 'cards':[]};
  public name: string = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private api: PokemonTcgService,
              private decksService: DecksService,
              private configService: ConfigApiService) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']){
      this.deck = this.decksService.getDeck(this.activatedRoute.snapshot.params['id']);
      this.name = this.deck.name;
      this.cards = this.deck.cards;
    }
  }

  public find() {
    this.api.findCardByName('PIKACHU').subscribe({
        next: (result: ResultApi): void => {
          this.getCards = result;
        },
        error: () => {
          console.log('erro');
        },
        complete: () => console.log('FInalizou')
      }
    );
  }

  public CheckCardSelected(card: any): boolean {
    return this.cards.filter((cards): boolean => cards.id == card.id).length > 0;
  }

  public selectCard(card: any): void {
    if (this.CheckCardSelected(card)) {
      this.cards = this.cards.filter((cards): boolean => cards != card);
      return;
    }
    this.cards.push(card);
  }

  public async prepareSave(): Promise<void> {
    if (this.valid()) {
      await this.save(this.name);
      return ;
    }
    alert('erro');
  }

  private valid(): boolean {
    if ((this.name.length < 3 || this.name.length > 20)){
      console.log('Erro Nome');
      return false;
    }
    if ((this.cards.length < 24 || this.name.length > 60)){
      console.log('Erro card');
      return false;
    }
    return true;
  }

  private CheckDecksExist(name: string): boolean {
    return this.decks.filter((deck: Decks): boolean => deck.name == name).length > 0;
  }

  public async save(name: string): Promise<void> {
    this.decks = this.decksService.getDecks();
    if (!this.CheckDecksExist(name)) {
      this.decks = this.decksService.addDeck({'name': name, 'cards': this.cards}, this.decks);
      await this.decksService.createDeck(this.decks);
      await this.router.navigate(['']);
      return;
    }

    if (this.activatedRoute.snapshot.params['id']){
      this.decks = this.decksService.updateDeck(this.activatedRoute.snapshot.params['id'], this.name, this.cards, this.decks);
      await this.decksService.createDeck(this.decks);
      await this.router.navigate(['list']);
      return;
    }

    alert('Nome Duplicado');
  }
}
