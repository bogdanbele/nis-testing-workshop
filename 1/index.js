import {printError, printInfo, printSuccess, printSuite} from "../ utils.js";


class Matchers {
    constructor(actual) {
        this.actual = actual
        this.continueOnError = true
        this.isPositiveOutlook = true
    }

    #compare(expression) {
        if (Boolean(expression) === true) {
            return this.isPositiveOutlook;
        } else {
            if (this.isPositiveOutlook === false) {
                return true
            }
        }
        return false
    }

    #handleError(error) {
        if (this.continueOnError) {
            printError(error)
        } else {
            throw Error(error)
        }
    }

    #outputErrorOutlook() {
        if (this.isPositiveOutlook === false) {
            return " not to be"
        }
        return ""
    }

    toBe(expected) {
        if (this.#compare(expected === this.actual)) {
            printSuccess()
        } else {
            this.#handleError(`Fail - Expected${this.#outputErrorOutlook()}: [${expected}] Actual: [${this.actual}]`)
        }
    }

    toBeTruthy() {
        if (this.#compare(this.actual)) {
            printSuccess()
        } else {
            this.#handleError(`Fail - Expected [${this.actual}] to be truthy.`)
        }
    }

    not() {
        this.isPositiveOutlook = false
        return this
    }

}

function expect(actual) {
    return new Matchers(actual)
}

function it(testName, fn) {
    printInfo(testName)
    fn()
}

function describe(suiteName, fn) {
    try {
        printSuite(suiteName)
        fn();
    } catch (err) {
        printError(err)
    }
}


describe("Basic math tests", () => {
    it("1+1 should be 2", () => {
        expect(1 + 1).toBe(2)
    })
    it("1+1 should not be 3", () => {
        expect(1 + 1).not().toBe(3)
    })
    it("null should not be truthy", () => {
        expect(null).not().toBeTruthy()
    })
    it("one digit test", () => {
        expect(123).toBe(123)
    })
    it("Different sums lead to same results", () => {
        expect(1+2+3).toBe(4+1+1)
    })
    it("123 should be truthy", () => {
        expect(123).toBeTruthy()
    })
})

describe("Tests that should fail", () => {
    it("Null should be truthy", () => {
        expect(null).toBeTruthy()
    })
    it("Wrong sum: 1+3=3", () => {
        expect(1 + 3).toBe(3)
    })
    it("1+1 should not equal 2", () => {
        expect(1 + 1).not().toBe(2)
    })
})