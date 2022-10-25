import chalk from "chalk";


// 1+1   === 2

// compare(1+1, direction) =>

// compare(1+1), false) => true
// compare(1+1, true) => false


// expected === this.actual

const compare = (expression, direction) => {
    if (expression === true) {
        return direction;
    } else {
        if (direction === false) {
            return true
        }
    }
    return false
}


const addSpace = (amount) => {
    let newAmount = amount;
    let spaces = ""
    while (0 < newAmount) {
        spaces += " "
        newAmount--
    }
    return spaces
}

const addNewLine = () => {
    return "\n"
}

const log = (text, spaces = 0) => console.log(addSpace(spaces) + text)

const printSuccess = (test) => log(chalk.greenBright(test), 2)
const printInfo = (test) => log(chalk.bgBlackBright.yellowBright(test), 1)
const printSuite = (test) => log(chalk.bgGreenBright.whiteBright(addNewLine() + "Test Suite - " + test))
const printError = (test) => log(chalk.red(test), 2)


class Matchers {
    constructor(actual) {
        this.actual = actual
        this.isPositiveOutlook = true
    }

    toBe(expected) {
        if (expected === this.actual) {
            printSuccess("Success ")
        } else {
            printError('Fail')
        }
    }

    toBeFlippable(expected) {
        if (compare(expected === this.actual, this.isPositiveOutlook)) {
            printSuccess("Success ")
        } else {
            printError('Fail')
        }
    }

    toBeTruthy() {
        if (this.actual) {
            printSuccess("Success ")
        } else {
            printError('Fail')
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

expect(1 + 1).toBeTruthy()
expect(1 + 1).toBe(3)

function it(testName, fn) {
    printInfo(testName)
    fn()
}


function describe(suiteName, fn) {
    try {
        printSuite(suiteName)
        fn();
    } catch (err) {
        console.log(err.message);
    }
}


describe("Basic maths tests", () => {
    it("1+1 should equal 2", () => {
        expect(1 + 1).toBe(2)
    })
    it("1+2 should not equal 3", () => {
        expect(1 + 1).toBe(3)
    })
})

describe("Flippable statement", () => {
    it("1+1 should be 2", () => {
        expect(1 + 1).toBeFlippable(2)
    })
    it("1+1 should not be 4", () => {
        expect(1 + 1).not().toBeFlippable(3)
    })
})