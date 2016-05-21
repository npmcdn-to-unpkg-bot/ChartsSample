import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";
import {ColorPickerService} from "./color-picker/color-picker.service";
import {LineChartDemoComponent} from "./line-chart-demo";

bootstrap(LineChartDemoComponent);
bootstrap(AppComponent, [ColorPickerService]);
