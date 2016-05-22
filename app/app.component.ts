import {Component, OnInit} from "@angular/core";
import {ColorPickerDirective} from "./color-picker/color-picker.directive";
import {ChartGraphDirective} from "./chart-component/chart.directive";
import {ChartService} from "./chart-component/chart.service.ts";

@Component({
    selector: 'main-app',
    templateUrl: 'app/app.component.html',
    directives: [ColorPickerDirective, ChartGraphDirective],
    providers: [
        ChartService
    ]
})
export class AppComponent implements OnInit {
    private color2:string = "#127bdc";
    private position:string = "top";

    ngOnInit() {
        console.log("ngOnInit");
    }
}
