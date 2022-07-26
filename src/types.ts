import { createCustomer } from './functions';
import { Author, Book, Person } from './interfaces';

type PersonBook = Person & Book;
type BookOrUndefined = Book | undefined;
type BookProperties = keyof Book;
type BookRequiredFields = Required<Book>;
type UpdatedBook = Partial<Book>;
type AuthorWoEmail = Omit<Author, 'email'>;
type СreateCustomerFunctionType = typeof createCustomer;

type fn = (p1: string, p2: number, p3: boolean) => symbol;
type Param1<T> = T extends (p1: infer U, p2: number, p3: boolean) => symbol ? U : never;
type Param2<T> = T extends (p1: string, p2: infer U, p3: boolean) => symbol ? U : never;
type Param3<T> = T extends (p1: string, p2: number, p3: infer U) => symbol ? U : never;
type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;

type RequiredProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? never : prop;
}[keyof T];
type OptionalProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? prop : never;
}[keyof T];

type BookRequiredProps = RequiredProps<Book>;
type BookOptionalProps = OptionalProps<Book>;

type RemoveProps<T extends object, TProps extends keyof T> = {
    [prop in keyof T as Exclude<prop, TProps>]: T[prop];
};

type BookRequiredPropsType = RemoveProps<Book, BookOptionalProps>;
type BookOptionalPropsType = RemoveProps<Book, BookRequiredProps>;

export {
    PersonBook,
    СreateCustomerFunctionType,
    AuthorWoEmail,
    UpdatedBook,
    BookRequiredFields,
    BookOrUndefined,
    BookProperties,
};

// type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };
