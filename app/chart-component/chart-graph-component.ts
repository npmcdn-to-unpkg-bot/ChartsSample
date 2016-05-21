import {Component} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from "@angular/common";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";

@Component({
    selector: 'chart-graph-component',
    templateUrl: "app/chart-component/chart-graph.html",
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ChartGraphComponent {
    private chartGraphLegend:boolean = false;
    private chartGraphType:string = 'bar';
    private chartGraphLabels:Array<string> = [];
    private chartGraphOptions:any = {
        animation: false,
        responsive: true
    };
    private chartGraphData:Array<any> = [
        {data: [65], label: 'Series A'},
        {data: [28], label: 'Series B'},
        {data: [18], label: 'Series C'}
    ];
    private chartGraphColours:Array<any> = [
        {
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

}
