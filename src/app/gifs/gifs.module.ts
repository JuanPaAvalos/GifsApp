import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { HttpClientModule } from "@angular/common/http";
import { GifCardComponent } from './gif-card/gif-card.component';
import { SharedModule } from '../shared/shared.module';
import { GifsPageComponent } from './gifs-page/gifs-home-page.component';



@NgModule({
  declarations: [
    GifsPageComponent,
    SearchComponent,
    ResultsComponent,
    GifCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    GifsPageComponent
  ]
})
export class GifsModule { }
