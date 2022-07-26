import { Book } from '../interfaces';

class Reader {
    name: string;
    books: Book[] = [];

    take(book: Book): void {
        this.books.push(book);
    }
}

export { Reader };
