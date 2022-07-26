namespace Utility {
    export namespace Fees {
        export const calculateLateFee = (daysLate: number): number => {
            return daysLate * 25;
        };
    }

    export const maxBooksAllowed = (age: number): number => {
        return age < 12 ? 3 : 10;
    };

    const privateFunc = (): void => {
        console.log('This is a private function');
    };
}
