
/*
 * Complex.js:
 * This file defines a Complex class to represent complex numbers.
 * Recall that a complex number is the sum of a real number and an
 * imaginary number and that the imaginary number i is the square root of -1.
 * https://www.inkling.com/read/javascript-definitive-guide-david-flanagan-6th/chapter-9/complex-js-a-complex-number
 */

class Complex
{
    r: number;
    i: number;

    public static ZERO = new Complex(0,0);
    public static ONE = new Complex(1,0);
    public static I = new Complex(0,1);

    /*
     * This constructor function defines the instance fields r and i on every
     * instance it creates.  These fields hold the real and imaginary parts of
     * the complex number: they are the state of the object.
     */
    constructor(real: number, imaginary: number){
        if (isNaN(real) || isNaN(imaginary))    // Ensure that both args are numbers.
        throw new TypeError();                  // Throw an error if they are not.
        this.r = real;                          // The real part of the complex number.
        this.i = imaginary;                     // The imaginary part of the number.
    }

    // Add a complex number to this one and return the sum in a new object.
    add(that: Complex): Complex{
        return new Complex(this.r + that.r, this.i + that.i);
    }

    // Multiply this complex number by another and return the product.
    mul(that: Complex): Complex{
        return new Complex(this.r * that.r - this.i * that.i,
                       this.r * that.i + this.i * that.r);
    }

    // Return the real magnitude of a complex number. This is defined
    // as its distance from the origin (0,0) of the complex plane.
    mag(): number{
        return Math.sqrt(this.r*this.r + this.i*this.i);
    }

    // Return a complex number that is the negative of this one.
    neg(): Complex{
        return new Complex(-this.r, -this.i);
    }

    // Convert a Complex object to a string in a useful way.
    toString(): string{
        return "{" + this.r + "," + this.i + "}";
    }

    // Test whether this Complex object has the same value as another.
    equals(that: Complex): boolean{
        return that != null &&                      // must be defined and non-null
        this.r === that.r && this.i === that.i;     // and have the same values.
    }

    // This class method parses a string in the format returned by the toString
    // instance method and returns a Complex object or throws a TypeError.
    parse(s: string): Complex{
        try {          // Assume that the parsing will succeed
            var m = Complex._format.exec(s);  // Regular expression magic
            return new Complex(parseFloat(m[1]), parseFloat(m[2]));
        } catch (x) {  // And throw an exception if it fails
            throw new TypeError("Can't parse '" + s + "' as a complex number.");
        }
    }

    // A "private" class field used in Complex.parse() above.
    // The underscore in its name indicates that it is intended for internal
    // use and should not be considered part of the public API of this class.
    private static _format = /^\{([^,]+),([^}]+)\}$/;
}

export = Complex;