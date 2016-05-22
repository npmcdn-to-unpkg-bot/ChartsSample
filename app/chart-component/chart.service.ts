import {Injectable} from '@angular/core';

@Injectable()
export class ChartService {

    private colors:Array<any> = [];
    private dataSet:Array<any> = [];

    constructor() {
        this.addItem({data: 100, label: "caption 1", backgroundColor: "#ff0000"});
        this.addItem({data: -50, label: "Another text", backgroundColor: "#00ff00"});
    }

    public addItem(item:any):void {
        this.dataSet.push({data: [item.data], label: item.label});
        this.colors.push({backgroundColor: item.backgroundColor});
    }

    public removeItem(index:number):void {
        this.colors.splice(index, 1);
        this.dataSet.splice(index, 1);
    }
}
