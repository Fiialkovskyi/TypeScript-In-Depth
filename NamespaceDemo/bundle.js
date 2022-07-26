var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        Fees.calculateLateFee = function (daysLate) {
            return daysLate * 25;
        };
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    Utility.maxBooksAllowed = function (age) {
        return age < 12 ? 3 : 10;
    };
    var privateFunc = function () {
        console.log('This is a private function');
    };
})(Utility || (Utility = {}));
/// <reference path="utility-functions.ts"/>
var util = Utility.Fees;
console.log(util.calculateLateFee(25));
