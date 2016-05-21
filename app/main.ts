import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";
import {ColorPickerService} from "./color-picker/color-picker.service";
import {ChartGraphComponent} from "./chart-component/chart-graph-component";
//import {LineChartDemoComponent} from "./line-chart-demo";

bootstrap(ChartGraphComponent);
//bootstrap(LineChartDemoComponent);
bootstrap(AppComponent, [ColorPickerService]);
