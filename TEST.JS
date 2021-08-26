class Prod {
    constructor(price) {
        this.price = price
    }

    getRupiah() {
        return `Rp ${this.price}`
    }
}

let a = new Prod(15000)
console.log(a.getRupiah())