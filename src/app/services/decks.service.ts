import {Injectable} from '@angular/core';
import {LocalService} from "./storage/local.service";
import {Decks} from "../interfaces/decks.interface";

@Injectable({
  providedIn: 'root'
})
export class DecksService {
  constructor(private local: LocalService) {
  }

  public addCard(card: Decks, decks: Decks[]): Decks[] {
    decks.push(card)
    return decks;
  }

  public removeCard(index: number, decks: Decks[]) {
    decks.splice(index, 1);
    return decks;
  }

  public getDeck(index: number): Decks {
    return this.local.get('decks')[index];
  }

  public getDecks(): Decks[] {
    return this.local.get('decks');
  }

  public addDeck(decks: Decks[]): void {
    this.local.save('decks', decks);
  }

  public removeDeck(): void {
    this.local.remove('decks');
  }
}
