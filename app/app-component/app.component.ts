import {Component} from "@angular/core";
import {ColorPickerDirective} from "../color-picker/color-picker.directive.ts";
import {ChartGraphDirective} from "../chart-component/chart.directive.ts";
import {HTTP_PROVIDERS} from "@angular/http";
import {MdButton, MdAnchor} from "@angular2-material/button/button";
import {MdIcon, MdIconRegistry} from "@angular2-material/icon/icon";

@Component({
    selector: 'main-app',
    templateUrl: 'app/app-component/app.component.html',
    directives: [ColorPickerDirective, ChartGraphDirective, MdButton, MdAnchor, MdIcon],
    viewProviders: [HTTP_PROVIDERS, MdIconRegistry],
})
export class AppComponent {
    private color2:string = "#127bdc";
    private position:string = "top";
}
