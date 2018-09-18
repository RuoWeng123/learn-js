import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { GrowlModule } from 'primeng/growl';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import {InputSwitchModule, TriStateCheckboxModule} from 'primeng/primeng';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';

declare var require: any;
export function highchartsFactory() {
    return require('highcharts');
}
const Highcharts = require('highcharts');

Highcharts.setOptions({
    global: {
        useUTC: false
    }
});
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      TableModule,
      HttpClientModule,
      InputTextModule,
      DialogModule,
      ButtonModule,
      ChartModule,
      GrowlModule,
      TabViewModule,
      DropdownModule,
      InputSwitchModule,
      AccordionModule,
      CheckboxModule,
      TriStateCheckboxModule
  ],
  providers: [
      {
          provide: HighchartsStatic,
          useFactory: highchartsFactory
      }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
