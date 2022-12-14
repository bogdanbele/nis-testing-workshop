import {printError, printInfo, printSuccess, printSuite} from "../../utils/printing-utils.js";


class Matchers {
    constructor(actual) {
        this.actual = actual
        this.shouldContinueOnError = true
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
        const errorMessage = `Fail - ${error}`
        if (this.shouldContinueOnError) {
            printError(errorMessage)
        } else {
            throw Error(errorMessage)
        }
    }

    #outputErrorOutlook() {
        if (this.isPositiveOutlook === false) {
            return "not "
        }
        return ""
    }

    toBe(expected) {
        if (this.#compare(expected === this.actual)) {
            printSuccess()
        } else {
            this.#handleError(`Expected: [${this.#outputErrorOutlook()}${expected}] Received: [${this.actual}]`)
        }
    }

    toBeTruthy() {
        if (this.#compare(this.actual)) {
            printSuccess()
        } else {
            this.#handleError(`Expected [${this.actual}] ${this.#outputErrorOutlook()}to be truthy.`)
        }
    }

    not() {
        this.isPositiveOutlook = false
        return this
    }
}

export function expect(actual) {
    return new Matchers(actual)
}

export function it(testName, fn) {
    printInfo(testName)
    fn()
}

export function describe(suiteName, fn) {
    try {
        printSuite(suiteName)
        fn();
    } catch (err) {
        printError(err)
    }
}


describe("Basic math tests", () => {
    it("final+final should be 2", () => {
        expect(1 + 1).toBe(2)
    })
    it("final+final should not be 3", () => {
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
    it("Wrong sum: final+3=3", () => {
        expect(1 + 3).toBe(3)
    })
    it("final+final should not equal 2", () => {
        expect(1 + 1).not().toBe(2)
    })
    it("Value should not be truthy", ()=> {
        expect(123).not().toBeTruthy()
    })
})