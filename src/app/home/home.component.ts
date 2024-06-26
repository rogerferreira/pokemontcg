import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonTcgService} from "../services/api/pokemon-tcg.service";
import {ConfigApi} from "../interfaces/storage/config-api.interface";
import {ResultApi} from "../interfaces/api/result-api.interface";
import {DecksService} from "../services/decks.service";
import {Decks} from "../interfaces/decks.interface";
import {ConfigApiService} from "../services/config-api.service";
import {IgxToastComponent, VerticalAlignment} from "igniteui-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public decks: Decks[]  = this.decksService.getDecks();
  public config: ConfigApi = this.configService.getConfig();
  public loader: boolean = false;
  private settings:{
    verticalDirection: VerticalAlignment
  } = {
    verticalDirection: VerticalAlignment.Middle,
  };

  @ViewChild('toastWarning', {read: IgxToastComponent}) public toastWarning!: IgxToastComponent;

  constructor(private api: PokemonTcgService,
              private decksService: DecksService,
              private configService: ConfigApiService) {
  }

  ngOnInit(): void {
    this.getCards();
  }

  private getCards(): void {
    if (this.configService.getConfig() === null) {
      this.loader = true;
      this.api.getCards().subscribe({
          next: (data: ResultApi): void => {
              this.configService.addConfig( {
                  'page': data.page,
                  'data': data.data,
                  'pageSize': data.pageSize,
                  'maxPage':  Array(Math.round(17000 / 60)).fill(0).map((x,i)=>i+1),
                  'totalCount': data.totalCount
                }
              );
            this.config = this.configService.getConfig();
          },
          error: ():void => {
            this.toastWarning.open('Erro ao usar api', this.settings);
          },
          complete: (): boolean => this.loader = false
        }
      );
    }
  }
}
