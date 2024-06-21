import { Injectable } from '@angular/core';
import {ConfigApi} from "../../interfaces/storage/config-api.interface";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  get(key: string): ConfigApi {
    const session: any = sessionStorage.getItem(key);
    return session ? JSON.parse(session) : null;
  }
  save(key: string, config: ConfigApi): void {
    sessionStorage.setItem(key, JSON.stringify(config));
  }
}
