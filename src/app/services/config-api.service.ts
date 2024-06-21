import { Injectable } from '@angular/core';
import {SessionService} from "./storage/session.service";
import {ConfigApi} from "../interfaces/storage/config-api.interface";

@Injectable({
  providedIn: 'root'
})
export class ConfigApiService {

  constructor(private session: SessionService) {}
  public getConfig() : ConfigApi{
    return this.session.get('config');
  }
  public addConfig(config: ConfigApi): void{
    this.session.save('config', config);
  }
}
