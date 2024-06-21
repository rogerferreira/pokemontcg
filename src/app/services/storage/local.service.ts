import { Injectable } from '@angular/core';
import {Decks} from "../../interfaces/decks.interface";

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  public get(key: string): Decks[] {
    const local: any = localStorage.getItem(key);
    return local ? JSON.parse(local) : [];
  }
  public save(key: string, decks: Decks[]): void {
    localStorage.setItem(key, JSON.stringify(decks));
  }
  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
