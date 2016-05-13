"use strict";

class Testable {
  runTest(description, result, expectation) {
    var testPassed = result == expectation;
    console.log(` - ${description}: ${( testPassed ? "PASSED" : "FAILED" )}`);
    
    if( !testPassed ) {
      console.log(` - - EXPECTED: ${expectation}`);
      console.log(` - - RESULTED: ${result}`);
    }
  }

  testMethod(method, tests) {
    console.log(`TESTING METHOD ${method}`);
    tests.forEach( function( testVars ) {
      this.runTest(testVars[0], testVars[1], testVars[2])
    }, this);
    console.log();
  }
}

class BasicMath extends Testable {
  add(v1, v2) {
    return v1 + v2;
  }

  divide(v1, v2) {
    if( v2 == 0 ) { return Infinity }
    
    var quotient = 0;
    var sign = 1;
    
    if( v1 < 0 ) {
      v1 = -v1;
      sign = -sign;
    }

    if( v2 < 0 ) {
      v2 = -v2;
      sign = -sign;
    }

    while( v1 >= v2 ) {
      v1 = this.subtract(v1, v2);
      quotient = this.add(quotient, 1);
    }

    return ( sign < 0 ? -quotient : quotient);
  }

  multiply(v1, v2) {
    var product = 0;
    var sign = 1;

    if( v1 < 0 ) {
      v1 = -v1;
      sign = -sign;
    }

    if( v2 < 0 ) {
      v2 = -v2;
      sign = -sign;
    }

    for( var i = 0; i < v1; i = this.add(i,1) ) {
      product = this.add(product, v2);
    }

    return ( sign < 0 ? -product : product );
  }

  subtract(v1, v2) {
    return this.add(v1,-v2);
  }

  // Runs all BasicMath method unit tests
  test() {
    console.log("\n### TESTING CLASS BasicMath ###\n");
    
    this.testMethod("#add(v1,v2)", [
      ["should return the integer sum of adding integers v1 and v2 correctly", this.add(1,10), 11],
      ["should return the integer sum of adding integers v1 and v2 correctly when one is negitive", this.add(-1,10), 9],
      ["should return the integer sum of adding integers v1 and v2 correctly when both are negitive", this.add(-1,-10), -11],
    ]);
    
    this.testMethod("#divide(v1,v2)", [
      ["should return the integer quotient of v1 divided by v2 correctly", this.divide(10,2), 5],
      ["should return the integer quotient of v1 divided by v2 correctly when v1 is negitive", this.divide(-10,2), -5],
      ["should return the integer quotient of v1 divided by v2 correctly when v2 is negitive", this.divide(10,-2), -5],
      ["should return the integer quotient of v1 divided by v2 correctly when both are negitive", this.divide(-10,-2), 5],
      ["should return the integer quotient of v1 divided v2 correctly when v1 is zero", this.divide(0,1), 0],
      ["should return the integer quotient of v1 divided v2 correctly when v2 is zero", this.divide(1,0), Infinity],
      ["should return the integer quotient of v1 divided v2 correctly when both are zero", this.divide(0,0), Infinity],
      ["should return the integer quotient of v1 divided v2 correctly when it results in a fraction", this.divide(3,2), 1]
    ]);
    
    this.testMethod("#multiply(v1,v2)", [
      ["should return the integer product of v1 and v2 correctly", this.multiply(5,6), 30],
      ["should return the integer product of v1 and v2 correctly when v1 is negitive", this.multiply(-5,6), -30],
      ["should return the integer product of v1 and v2 correctly when v2 is negitive", this.multiply(5,-6), -30],
      ["should return the integer product of v1 and v2 correctly when both are negitive", this.multiply(-5,-6), 30],
      ["should return the integer product of v1 and v2 correctly when v1 is zero", this.multiply(0,6), 0],
      ["should return the integer product of v1 and v2 correctly when v2 is zero", this.multiply(5,0), 0],
      ["should return the integer product of v1 and v2 correctly when both are zero", this.multiply(0,0), 0],
    ]);

    this.testMethod("#subtract(v1,v2)", [
      ["should return the integer difference of v2 from v1 correctly", this.subtract(25,10), 15],
      ["should return the integer difference of v2 from v1 correctly when one is negitive", this.subtract(25,-10), 35],
      ["should return the integer difference of v2 from v1 correctly when both are negitive", this.subtract(-25,-10), -15],
    ]);
  }
}

class AdvancedMath extends BasicMath {
  add() {
    var sum = 0;

    for( var i = 0; i < arguments.length; i = super.add(i,1) ) {
      sum = super.add(sum, arguments[i]);
    }

    return sum;
  }
  
  isRightTriangle(a, b, c) {
    if( a <= 0 || b <= 0 || c <= 0 ) { return false }
   
    return this.posPower(a, 2) + this.posPower(b, 2) == this.posPower(c, 2);
  }

  posPower(base, exponent) {
    if( exponent < 0 ) { return 0 }
    
    var power = 1; 

    // using parent add just because it's a whole lot simpler method
    for( var i = 0; i < exponent; i = super.add(i,1) ) {
      power = this.multiply(power, base);  
    }
    
    return power;
  }

  // runs all AdvancedMath method unit tests
  test() {
    console.log("\n### TESTING CLASS AdvancedMath ###\n");

    this.testMethod("#add(v1,...,vN)", [
      ["should return the sum of any number of parameters sent into it", this.add(1,2,3,2,1), 9]
    ]);
  
    this.testMethod("#isRightTriangle", [
      ["should return false if any side length is negitive", this.isRightTriangle(1,-1,1), false],
      ["should return false if any side length is zero because that is a line", this.isRightTriangle(1,0,1), false],
      ["should return false if a squared plus b squared does not equal c squared", this.isRightTriangle(2,2,2), false],
      ["should return true if a squared plus b squared equals c squared", this.isRightTriangle(3,4,5), true]
    ]);
    
    this.testMethod("#posPower(base,exponent)", [
      ["should return base to the power of exponent correctly", this.posPower(5,3), 125],
      ["should return a negitive base to the power of exponent correctly", this.posPower(-5,3), -125],
      ["should return base to the power of a negitive exponent as zero", this.posPower(5,-1), 0],
      ["should return base to the power of zero as one", this.posPower(5,0), 1]
    ]);
  }
}

var basicMath = new BasicMath();
basicMath.test();

var advancedMath = new AdvancedMath();
advancedMath.test();
