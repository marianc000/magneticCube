export class Tail {
    constructor(size) {
        this.size=size;
        this.vals = [];
    }
 
    add(...vals) {
        this.vals.push(...vals);
    }

    getTail() {
        return [...new Set(this.vals.slice(-this.size))];
    }
}