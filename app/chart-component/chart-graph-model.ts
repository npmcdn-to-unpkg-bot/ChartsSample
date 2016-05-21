class GraphicsModel<T> {

    private items:Array<T>;
    private listeners:Array<GraphicsModelListener<T>>;

    constructor() {
        this.items = [];
        this.listeners = [];
    }

    push(value:T):void {
        this.items.push(value);
        this.listeners.forEach((listener) => {
            listener.onElementPushed(this);
        });
    }

    update(value:T, index:number):void {
        if (index >= 0 && index < this.items.length) {
            this.items[index] = value;
            this.listeners.forEach((listener) => {
                listener.onElementUpdated(this, index);
            });
        }
    }

    remove(index:number) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.listeners.forEach((listener) => {
                listener.onElementRemoved(this, index);
            });
        }
    }

    length():number {
        return this.items.length;
    }

    itemAt(index:number):T {
        return this.items[index];
    }

    addModelListener(listener:GraphicsModelListener<T>):void {
        this.listeners.push(listener);
    }

    removeModelListener(listener:GraphicsModelListener<T>):void {
        let index = this.listeners.indexOf(listener, 0);
        if (index >= 0) {
            this.listeners.splice(index, 1);
        }
    }
}

interface GraphicsModelListener<T> {

    onElementPushed(model:GraphicsModel<T>):void;

    onElementRemoved(model:GraphicsModel<T>, index:number):void;

    onElementUpdated(model:GraphicsModel<T>, index:number):void;
}
