import { UL, ReferenceItem, RefBook, Shelf } from './classes';
import { BookRequiredFields, PersonBook, UpdatedBook, СreateCustomerFunctionType } from './types';
import { Category } from './enums';
import { Book, Logger, Author, Librarian, TOptions, Magazine } from './interfaces';
import {
    bookTitleTransform,
    calcTotalPages,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getBookAuthorByIndex,
    getBookByID,
    getBookTitlesByCategory,
    getObjectProperty,
    getProperty,
    getTitles,
    logBookTitles,
    logFirstAvailable,
    printBook,
    printRefBook,
    purge,
    setDefaultConfig,
    сheckoutBooks,
} from './functions';
import { Library } from './classes/library';
import Encyclopedia from './classes/encyclopedia';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ================================================

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
// const logDamage: Logger = (val: string): void => {
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
// const ref = new ReferenceItem(1, 'Learn TypeScript', 2022);
// ref.printItem();
// ref.publisher = 'some publisher';
// console.log(ref.publisher);
// console.log(ref.getID());

// Task 05.02
// const refBook = new RefBook(2, 'Common Encyclopedia', 2022, 1);
// refBook.printItem();

// Task 05.03
// const refBook = new Encyclopedia(2, 'Common Encyclopedia', 2022, 1);
// refBook.printCitation();

// Task 05.04
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name =  'Anna';
// favoriteLibrarian.assistCustomer('Boris', getAllBooks()[0].title);

// Task 05.05
// const personBook: PersonBook = {
//     author: 'Anna',
//     available: true,
//     category: Category.Angular,
//     email: 'anna@example.com',
//     id: 1,
//     name: 'Anna',
//     title: 'Angular Book'
// };
// const options: TOptions = {}
// console.log(setDefaultConfig(options));

// Task 06.03
// const refBook = new RefBook(2, 'Common Encyclopedia', 2022, 1);
// printRefBook(refBook);
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// printRefBook(favoriteLibrarian);

// Task 06.05
// const flag = true;

// if (flag) {
//     import('./classes').then(classes => {
//         const reader = new classes.Reader();
//         console.log(reader);
//     });
// }

// if (flag) {
//     const module = await import('./classes');
//     const reader = new module.Reader();
//     console.log(reader);
// }

// Task 06.06
// let lib: Library = new Library();
// lib.id = 1;
// console.log(lib);

// Task 07.01
// const inventory: Book[] = [
//     { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
//     { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
//     { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
//     { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
// ];

// const books = purge<Book>(inventory);
// console.log(books);
// const numbers = purge([1, 2, 3]);
// console.log(numbers);

// Task 07.02 07.03
// const bookShelf = new Shelf<Book>();
// inventory.forEach(book => bookShelf.add(book));
// const firstBook = bookShelf.getFirst();
// console.log(firstBook.title);

// const magazines: Magazine[] = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' },
// ];

// const magazineShelf = new Shelf<Magazine>();
// magazines.forEach(book => magazineShelf.add(book));
// const firstBook2 = magazineShelf.getFirst();
// console.log(firstBook2.title);

// magazineShelf.printTitles();
// console.log(magazineShelf.find('Five Points'));
// console.log(getObjectProperty(magazines[0], 'publisher'));

// Task 07.04
// const bookRequiredFields: BookRequiredFields = {
//     id: 1,
//     title: 'Some Title',
//     author: 'Anna',
//     category: Category.Angular,
//     available: false,
//     pages: 155,
//     markDamaged: (val: string): void => {
//         console.log(`${val} was damaged`);
//     },
// };

// const updatedBook: UpdatedBook = {};

// const params: Parameters<СreateCustomerFunctionType> = ['Anna'];
// createCustomer(...params);

// Task 08.01
// const lib: Librarian = new UL.UniversityLibrarian();
// lib['test'] = 'test string';
// UL.UniversityLibrarian['a'] = 55;
// UL.UniversityLibrarian.prototype['b'] = 44;

// Task 08.02
// const fLibrarian = new UL.UniversityLibrarian();
// fLibrarian.name = 'Anna';
// fLibrarian['printLibrarian']();

// Task 08.03
// const lib = new UL.UniversityLibrarian();
// lib.assistFaculty = () => {
//     console.log('new assistFaculty');
// };
// lib.teachCommunity = () => {
//     console.log('new teachCommunity');
// };

// Task 08.04
// const refBook = new Encyclopedia(2, 'Common Encyclopedia', 2022, 1);
// refBook.printItem();

// Task 08.05
// const lib = new UL.UniversityLibrarian();
// lib.name = 'Anna';
// lib.assistCustomer('Boris', 'Learn Decorators');

// Task 08.06
// const lib = new UL.UniversityLibrarian();
// lib.name = 'Anna';
// console.log(lib.name);

// Task 08.07
// const refBook = new Encyclopedia(2, 'Common Encyclopedia', 2022, 1);
// refBook.copies = -10;
// refBook.copies = 0;
// refBook.copies = 4.5;
// refBook.copies = 5;
