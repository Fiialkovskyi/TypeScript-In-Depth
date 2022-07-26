import { timeout } from '../decorators';

/* eslint-disable no-underscore-dangle */
abstract class ReferenceItem {
    private _publisher: string;
    #id: number;
    constructor(id: number, public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    @timeout(5000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        // console.log(ReferenceItem.department);
        console.log(Object.getPrototypeOf(this).constructor.department);
    }

    getID(): number {
        return this.#id;
    }

    get publisher() {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    static department: string = 'Library';

    abstract printCitation(): void;
}

export { ReferenceItem };
