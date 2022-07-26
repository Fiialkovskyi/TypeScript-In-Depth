/* eslint-disable no-underscore-dangle */
import { ReferenceItem } from '../classes';
import { positiveInteger } from '../decorators';

export default class Encyclopedia extends ReferenceItem {
    _copies: number;

    @positiveInteger
    get copies(): number {
        return this._copies;
    }

    set copies(value: number) {
        this._copies = value;
    }

    constructor(id: number, title: string, year: number, public edition: number) {
        super(id, title, year);
    }
    override printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} edition ${this.year}`);
    }

    printCitation(): void {
        console.log(`${this.year} - ${this.title}`);
    }
}