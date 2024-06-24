import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PokemonTcgService} from "../services/api/pokemon-tcg.service";
import {DecksService} from "../services/decks.service";
import {ResultApi} from "../interfaces/api/result-api.interface";
import {Decks} from "../interfaces/decks.interface";
import {ConfigApiService} from "../services/config-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigApi} from "../interfaces/storage/config-api.interface";
import {HorizontalAlignment, IgxToastComponent, VerticalAlignment} from "igniteui-angular";

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
  public cardName: string = '';
  public selected:  number = 1;
  public update:boolean = false;
  public loader:boolean = false;
  private settings:{
    verticalDirection: VerticalAlignment
  } = {
    verticalDirection: VerticalAlignment.Middle,
  };

  @ViewChild('toastWarning', {read: IgxToastComponent}) public toastWarning!: IgxToastComponent;
  @ViewChild('divOverlay') divOverlay!: ElementRef;
  @ViewChild('imageZoom') imageZoom!: ElementRef;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private api: PokemonTcgService,
              private decksService: DecksService,
              private configService: ConfigApiService) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']){
      this.update = true;
      this.deck = this.decksService.getDeck(this.activatedRoute.snapshot.params['id']);
      this.name = this.deck.name;
      this.cards = this.deck.cards;
    }
  }

  public find(): void {
    this.loader = true;
    this.api.findCardByName(this.cardName).subscribe({
        next: (result: ResultApi): void => {
          this.getCards.data = result.data;
          this.cardName = '';
        },
        error: (): void => {
          this.toastWarning.open('Erro ao buscar api!', this.settings);

        },
        complete: ():boolean => this.loader = false
      }
    );
  }
  public findPage(id: number){
    this.loader = true;
    this.api.getCards(id).subscribe({
        next: (data: ResultApi): void => {
           this.getCards.data = data.data;
           this.selected = id;
        },
        error: ():void => {
          this.toastWarning.open('Erro ao buscar api!', this.settings);
        },
        complete: (): boolean => this.loader = false
      }
    );
  }

  public CheckCardSelected(card: any): boolean {
    return this.cards.filter((cards): boolean => cards.id == card.id).length > 0;
  }

  public CheckCardNameRepet(card: any): boolean {
    return this.cards.filter((cards): boolean => cards.name == card.name).length == 4;
  }

  public selectCard(card: any): void {
    if (this.CheckCardSelected(card)) {
      this.cards = this.cards.filter((cards): boolean => cards.id != card.id);
      return;
    }
    if (this.CheckCardNameRepet(card)){
      console.log(this.cards);
      this.toastWarning.open('Erro nome repetido', this.settings);
      return;
    }
    this.openImage(card);
    this.cards.push(card);
  }

  public async prepareSave(): Promise<void> {
    if (this.valid()) {
      await this.save(this.name);
      return ;
    }
  }

  private valid(): boolean {
    if ((this.name.length < 3 || this.name.length > 40)){
      this.toastWarning.open('Digite pelo menos 3 letras no nome', this.settings);
      return false;
    }
    if ((this.cards.length < 24 || this.cards.length > 60)){
      this.toastWarning.open('Mínimo de 24 cartas', this.settings);
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

    if (this.update){
      this.decks = this.decksService.updateDeck(this.activatedRoute.snapshot.params['id'], this.name, this.cards, this.decks);
      await this.decksService.createDeck(this.decks);
      await this.router.navigate(['list']);
      return;
    }

    this.toastWarning.open('Deck com nome duplicado', this.settings);
  }
  openImage(card: any): void {
    this.imageZoom.nativeElement.src = card.images.large;
    this.divOverlay.nativeElement.style.display = 'flex';
  }

  closeImage(): void {
    this.divOverlay.nativeElement.style.display = 'none';
  }

}
