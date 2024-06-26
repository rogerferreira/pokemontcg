import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Decks} from "../interfaces/decks.interface";
import {PokemonTcgService} from "../services/api/pokemon-tcg.service";
import {DecksService} from "../services/decks.service";
import {Router} from "@angular/router";

interface countCard {
  multipleType: number,
  uniqueType: number,
  typeFind: any[]
}

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.css']
})
export class MyDecksComponent implements OnInit {

  public decks: Decks[] = this.decksService.getDecks();
  public deck: Decks = this.decksService.getDeck(0);
  public countCards: countCard = {'multipleType': 0, 'uniqueType': 0, 'typeFind': []};
  public detail:boolean = false;

  @ViewChild('divOverlay') divOverlay!: ElementRef;
  @ViewChild('imageZoom') imageZoom!: ElementRef;
  constructor(private router: Router,
              private api: PokemonTcgService,
              private decksService: DecksService) {
  }

  ngOnInit(): void {
  }

  public get(id: number): void {
    this.detail = true;
    this.deck = this.decksService.getDeck(id);
  }

  public getCardsCountSuperType(cards: any[], type: string): number {
    return cards.filter((card: { supertype: string; }) => card.supertype === type).length;
  }

  public getCardsCountType(cards: any[]): any {
    let typeFind: any = [];
    let uniqueType: any = [];
    let multipleType: any = [];
    let contagem: countCard = {'multipleType': 0, 'uniqueType': 0, 'typeFind': []};
    cards.forEach((card): void => {
      if (Array.isArray(card.types)) {
        card.types.forEach((type: any): void => {
          if (typeFind.hasOwnProperty(type)) {
            typeFind[type] = typeFind[type] + 1;
            return;
          }
          typeFind[type] = 1;
        });
        if (card.types.length == 1) {
          uniqueType.push(1);
          return
        }
        multipleType.push(1);
      }
    });
    Object.keys(typeFind).forEach((teste: any): void => {
      contagem.typeFind.push({'name': teste, 'value': typeFind[teste]});
    });
    contagem.multipleType = multipleType.length;
    contagem.uniqueType = uniqueType.length;
    return contagem;
  }

  public hide() {
    this.detail = false;
  }
  public update(id: number) {
    this.router.navigate(['/update/' + id]);
  }

  public async removeDeck(id: number): Promise<void> {
    this.decks = this.decksService.removeDeck(id, this.decks);
    await this.decksService.createDeck(this.decks);
    this.deck = this.decksService.getDeck(0);
  }

  public async dropDecks(): Promise<void> {
    await this.decksService.dropDeck();
    await this.router.navigate(['']);
  }

  openImage(card: any): void {
    this.imageZoom.nativeElement.src = card.images.large;
    this.divOverlay.nativeElement.style.display = 'flex';
  }

  closeImage(): void {
    this.divOverlay.nativeElement.style.display = 'none';
  }
}
