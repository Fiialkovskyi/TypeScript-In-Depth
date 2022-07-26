/* eslint-disable no-redeclare */
import { Category } from './enums';
import { Book, TOptions } from './interfaces';
import { BookOrUndefined, BookProperties } from './types';
import RefBook from './classes/encyclopedia';

export const getAllBooks = (): readonly Book[] => {
    const books = [
        {
            id: 1,
            title: 'Refactoring JavaScript',
            category: Category.JavaScript,
            author: 'Evan Burchard',
            available: true,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            category: Category.JavaScript,
            author: 'Liang Yuxian Eugene',
            available: false,
        },
        {
            id: 3,
            title: 'CSS Secrets',
            category: Category.CSS,
            author: 'Lea Verou',
            available: true,
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            category: Category.CSS,
            author: 'Andrea Chiarelli',
            available: true,
        },
    ];

    return books;
};

export const logFirstAvailable = (books: readonly Book[] = getAllBooks()): void => {
    const firstAvailableBook = books.find(({ available }) => available);
    console.log(`Number of books: ${books.length}`);
    console.log(`First available book: ${firstAvailableBook?.title}`);
};

export const getBookTitlesByCategory = (category: Category = Category.JavaScript): Array<string> => {
    return getAllBooks()
        .filter(item => item.category === category)
        .map(item => item.title);
};

export const logBookTitles = (titles: string[]): void => {
    titles.forEach(item => console.log(item));
};

export const getBookAuthorByIndex = (index: number): [title: string, author: string] => {
    const { title = '', author = '' } = getAllBooks()[index] ?? {};
    return [title, author];
};

export const calcTotalPages = () => {
    const libs = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    return libs.reduce((total, curr) => {
        return total + BigInt(curr.books) * BigInt(curr.avgPagesPerBook);
    }, BigInt(0));
};

export const createCustomerID = (name: string, id: number): string => {
    return `${name}-${id}`;
};

export const createCustomer = (name: string, age?: number, city?: string): void => {
    console.log(`Customer name: ${name}`);
    age && console.log(`Customer age: ${age}`);
    city && console.log(`City: ${city}`);
};

export const getBookByID = (id: Book['id']): BookOrUndefined => {
    return getAllBooks().find(book => book.id === id);
};

export const сheckoutBooks = (customer: string, ...booksIDs: number[]): string[] => {
    console.log(`Customer name: ${customer}`);
    return booksIDs
        .map(id => getBookByID(id))
        .filter(({ available }) => available)
        .map(({ title }) => title);
};

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]): string[] {
    const books = getAllBooks();
    if (args.length === 1) {
        const [arg] = args;
        if (typeof args[0] === 'string') {
            return books.filter(({ author }) => author === arg).map(({ title }) => title);
        } else if (typeof args[0] === 'boolean') {
            return books.filter(({ available }) => available === arg).map(({ title }) => title);
        }
    }

    if (args.length === 2) {
        const [argId, argAvailavle] = args;
        if (typeof argId === 'number' && typeof argAvailavle === 'boolean') {
            return books
                .filter(({ id, available }) => id === argId && available === argAvailavle)
                .map(({ title }) => title);
        }
    }

    return [];
}

export function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw new Error('value should have been a strin');
    }
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not an instance of RefBook');
    }
}

export const bookTitleTransform = (title: any): string => {
    assertStringValue(title);

    return title.split('').reverse().join('');
};

export const printBook = (book: Book): void => {
    console.log(`${book.title} by ${book.author}`);
};

export const printRefBook = (data: any): void => {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
};

export const getProperty = (book: Book, property: BookProperties): any => {
    const value = book[property];

    return typeof value === 'function' ? value.name : value;
};

export function getObjectProperty<TObject, TKey extends keyof TObject>(
    obj: TObject,
    key: TKey,
): TObject[TKey] | string {
    const value = obj[key];

    return typeof value === 'function' ? value.name : value;
}

export const setDefaultConfig = (options: TOptions): TOptions => {
    options.duration ??= 50;
    options.speed ??= 20;
    return options;
};

export const purge = <T>(inventory: T[]): T[] => {
    return inventory.slice(2);
};
