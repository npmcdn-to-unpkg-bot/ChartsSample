import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";
import {ColorPickerService} from "./color-picker/color-picker.service";
import {ChartService} from "./chart-component/chart.service.ts"
//import {ChartGraphDirective} from "./chart-component/chart-graph-component";

//import {enableProdMode} from '@angular/core'
//enableProdMode();

//bootstrap(ChartGraphDirective);
bootstrap(AppComponent, [ColorPickerService, ChartService]);
