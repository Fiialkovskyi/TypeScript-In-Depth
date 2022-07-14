/* eslint-disable no-underscore-dangle */
/* eslint-disable no-redeclare */

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ================================================
// type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular,
}

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
}

interface DamageLogger {
    (val: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}

const getAllBooks = (): readonly Book[] => {
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
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
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

const logFirstAvailable = (books: readonly Book[] = getAllBooks()): void => {
    const firstAvailableBook = books.find(({ available }) => available);
    console.log(`Number of books: ${books.length}`);
    console.log(`First available book: ${firstAvailableBook?.title}`);
};

const getBookTitlesByCategory = (category: Category = Category.JavaScript): Array<string> => {
    return getAllBooks()
        .filter(item => item.category === category)
        .map(item => item.title);
};

const logBookTitles = (titles: string[]): void => {
    titles.forEach(item => console.log(item));
};

const getBookAuthorByIndex = (index: number): [title: string, author: string] => {
    const { title = '', author = '' } = getAllBooks()[index] ?? {};
    return [title, author];
};

const calcTotalPages = () => {
    const libs = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    return libs.reduce((total, curr) => {
        return total + BigInt(curr.books) * BigInt(curr.avgPagesPerBook);
    }, BigInt(0));
};

const createCustomerID = (name: string, id: number): string => {
    return `${name}-${id}`;
};

const createCustomer = (name: string, age?: number, city?: string): void => {
    console.log(`Customer name: ${name}`);
    age && console.log(`Customer age: ${age}`);
    city && console.log(`City: ${city}`);
};

const getBookByID = (id: Book['id']): Book | undefined => {
    return getAllBooks().find(book => book.id === id);
};

const сheckoutBooks = (customer: string, ...booksIDs: number[]): string[] => {
    console.log(`Customer name: ${customer}`);
    return booksIDs
        .map(id => getBookByID(id))
        .filter(({ available }) => available)
        .map(({ title }) => title);
};

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: any[]): string[] {
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

function assertStringValue(val: any): asserts val is string {
    if (typeof val !== 'string') {
        throw new Error('value should have been a strin');
    }
}

const bookTitleTransform = (title: any): string => {
    assertStringValue(title);

    return title.split('').reverse().join('');
};

const printBook = (book: Book): void => {
    console.log(`${book.title} by ${book.author}`);
};

type BookProperties = keyof Book;

const getProperty = (book: Book, property: BookProperties): any => {
    const value = book[property];

    return typeof value === 'function' ? value.name : value;
};

class ReferenceItem {
    private _publisher: string;
    #id: number;
    constructor(id: number, public title: string, private year: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

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
}

// Task 02.01
// logFirstAvailable(getAllBooks());
// logBookTitles(getBookTitlesByCategory(Category.JavaScript));
// console.log(getBookAuthorByIndex(2));
// console.log(calcTotalPages());

// Task 03.01
// const myID = createCustomerID('Ann', 10);
// console.log(myID);
// let idGenerator: (name: string, id: number) => string;
// idGenerator = createCustomerID;
// console.log(idGenerator('Ben', 20));

// Task 03.02
// createCustomer('Ann');
// createCustomer('Ann', 20);
// createCustomer('Ann', 20, 'London');
// logBookTitles(getBookTitlesByCategory());
// logFirstAvailable();
// console.log(getBookByID(1));
// const myBooks = сheckoutBooks('Ann', 1, 2, 4);
// console.log(myBooks);

// Task 03.03
// const checkedOutBooks = getTitles(false);
// console.log(checkedOutBooks);

// Task 03.04
// console.log(bookTitleTransform('Learn TypeScript'));
// console.log(bookTitleTransform(375));

// Task 04.01
// const myBook = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     pages: 200,
//     markDamaged: (reason: string): void => console.log(`Damaged: ${reason}`),
// };

// printBook(myBook);
// myBook.markDamaged('missing back cover');

// Task 04.02
// const logDamage: DamageLogger = (val: string): void => {
//     console.log(val);
// };
// logDamage('missing back cover');

// Task 04.03
// const favoriteAuthor: Author = {
//     name: 'Boris',
//     email: 'boris@example.com',
//     numBooksPublished: 2,
// };

// const favoriteLibrarian: Librarian = {
//     name: 'Anna',
//     email: 'anna@example.com',
//     department: 'head library',
//     assistCustomer: (custName: string, bookTitle: string): void => {
//         console.log(custName);
//     },
// };

// Task 04.04
// const offer: any = {
//     book: {
//         title: 'Essential TypeScript',
//     },
// };

// console.log(offer.magazine);
// console.log(offer.magazine?.getTitle?.());
// console.log(offer.book?.getTitle?.());
// console.log(offer.book?.authors?.[0]);

// Task 04.05
// console.log(getProperty(getAllBooks()[0], 'title'));
// console.log(getProperty(getAllBooks()[2], 'markDamaged'));
// console.log(getProperty(getAllBooks()[0], 'isbn'));

// Task 05.01
const ref = new ReferenceItem(1, 'Learn TypeScript', 2022);
ref.printItem();
ref.publisher = 'some publisher';
console.log(ref.publisher);
console.log(ref.getID());
