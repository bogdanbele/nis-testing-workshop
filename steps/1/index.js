class Matchers {
    constructor(actual) {
        this.actual = actual
    }

    toBe(expected) {
        if (this.actual === expected) {
            console.log("succes")
        } else {
            console.log("error")
        }
    }
}


const expect = (actual) => new Matchers(actual)

expect(1+1).toBe(2)



