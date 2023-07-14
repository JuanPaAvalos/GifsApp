import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, GifData } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resutado = JSON.parse(localStorage.getItem('ultimoResultado')!) || [];

    // if (localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }
  }


  private apiKey     : string    = "tvMa6zaNXG6AEUY5O1BnO0KO0XeubaQj";
  private gifApi     : string    = "https://api.giphy.com/v1/gifs";
  private _historial : string[]  = [];
  public resutado    : GifData[] = [];



  get historial() {
    //?  se utliza el operador spread `...` para romper la relacion con el arreglo privado del servicio
    return [...this._historial];
  }


  buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    // si la busqueda ya esta en el hostorial no lo agrega al historial
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      //? se guarda el historial en localstorage pasando el arreglo a string con una funcon de JSON
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }


    //? http params permite construir parametros de una peticion ( valorDeLaApi , datoEnviado)
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q' , query);

    //? Se creo una interface en https://app.quicktype.io/ con la respuesta de la peticon en postman
    //? La interface permite recibir la data con un tipado al hacer la peticion
    this.http.get<SearchGIFResponse>(`${this.gifApi}/search`, { params })
      .subscribe((res) => {
        console.log(res.data);
        this.resutado = res.data;
        localStorage.setItem('ultimoResultado', JSON.stringify(this.resutado));
      });

  }
}
