import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { GifResponse, GifData } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this.loadLocalHistory();
  }

  private apiKey: string = 'tvMa6zaNXG6AEUY5O1BnO0KO0XeubaQj';
  private gifApi: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];
  public resut: GifData[] = [];

  get historial() {
    //?  se utliza el operador spread `...` para romper la relacion con el arreglo privado del servicio
    return [...this._history];
  }

  private saveHistory(): void {
    localStorage.setItem('historial', JSON.stringify(this._history));
  }

  private loadLocalHistory(): void {
    this._history = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resut = JSON.parse(localStorage.getItem('lastResult')!) || [];
  }

  private updateHistory(searchTag: string) {
    searchTag = searchTag.trim().toLowerCase();

    if (this._history.includes(searchTag)) {
      this._history = this._history.filter((oldTag) => oldTag != searchTag);
    }

    this._history.unshift(searchTag);
    this._history = this._history.splice(0, 10);
    this.saveHistory();
  }

  buscarGifs(searchTag: string) {
    if (searchTag.trim().length == 0) return;
    this.updateHistory(searchTag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', searchTag);

    this.http
      .get<GifResponse>(`${this.gifApi}/search`, { params })
      .subscribe((res) => {
        this.resut = res.data;
        localStorage.setItem('lastResult', JSON.stringify(this.resut));
      });
  }
}
