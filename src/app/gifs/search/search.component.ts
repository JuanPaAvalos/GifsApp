import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  //* el "ElementRef" es el tipo que se obtiene desde el html al pedir el elemento
  //* el simbolo ! sirve para garantizar que un elemento no sera nulo nucna
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){
    
  }

  buscar(){
      const valor = this.txtBuscar.nativeElement.value;
      
      if (valor.trim().length === 0 ){
        return;
      }

      this.gifsService.buscarGifs(valor);
      
      this.txtBuscar.nativeElement.value = ''; 
  }

}
