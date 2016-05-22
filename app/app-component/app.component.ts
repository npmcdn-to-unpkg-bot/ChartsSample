import {Component} from "@angular/core";
import {ColorPickerDirective} from "../color-picker/color-picker.directive.ts";
import {ChartGraphDirective} from "../chart-component/chart.directive.ts";

@Component({
    selector: 'main-app',
    templateUrl: 'app/app-component/app.component.html',
    directives: [ColorPickerDirective, ChartGraphDirective],
})
export class AppComponent {
    private color2:string = "#127bdc";
    private position:string = "top";
}
