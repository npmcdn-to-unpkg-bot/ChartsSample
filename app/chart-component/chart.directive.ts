import {Component} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from "@angular/common";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {ChartService} from "./chart.service.ts"

@Component({
    selector: 'chart-graph-component',
    templateUrl: "app/chart-component/chart.html",
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ChartGraphDirective {
    private chartGraphLegend:boolean = true;
    private chartGraphType:string = 'bar';
    private chartGraphLabels:Array<string> = [];
    private chartGraphOptions = {
        animation: true,
        responsive: true
    };

    constructor(private chartService:ChartService) {
    }
}
