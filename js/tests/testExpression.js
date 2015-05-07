function assertEquals(val1, val2) {
	if(val1 != val2) {
		throw new Error("Values are not equal! Value 1: " + val1 + " Value 2: " + val2);
	}
}

function assertUndefined(val) {
	if(typeof val != 'undefined') {
		throw new Error("Value is not undefined! Value: " + val);
	}
}

function assertNaN(val) {
	if(!isNaN(val)) {
		throw new Error("Value is not NaN! Value: " + val);
	}
}

function assertInfinite(val) {
	if(isFinite(val)) {
		throw new Error("Value is not Infinit! Value: " + val);
	}
}

function testEqualExpression(expression, expectedValue) {
	assertEquals(expression.evaluate(), expectedValue);
	console.log("Expression, " + expression.tostring() + ", evaluation result: " + expression.evaluate());	
}

function testUndefinedExpression(expression) {
	assertUndefined(expression.evaluate());
	console.log("Expression, " + expression.tostring() + ", evaluation result: " + expression.evaluate());	
}

function testNaNExpression(expression) {
	assertNaN(expression.evaluate());
	console.log("Expression, " + expression.tostring() + ", evaluation result: " + expression.evaluate());	
}

function testInifiniteExpression(expression) {
	assertInfinite(expression.evaluate());
	console.log("Expression, " + expression.tostring() + ", evaluation result: " + expression.evaluate());	
}

function testExpressions() {
	testEqualExpression(new Expression(5, 8, "+"), 13); //addition
	testEqualExpression(new Expression(7, 4, "-"), 3); //subtraction
	testEqualExpression(new Expression(7, 3, "*"), 21); //multiplication
	testEqualExpression(new Expression(15, 3, "/"), 5); //division
	testEqualExpression(new Expression(4, 2, "^"), 16); //exponents
	testEqualExpression(new Expression(9, 0.5, "^"), 3); //rooting

	testEqualExpression(new Expression(-9, 3, "+"), -6); //negative number test
	testEqualExpression(new Expression(1.5, 2.25, "+"), 3.75); //floating point test

	testNaNExpression(new Expression(-2, 0.5, "^")); //imaginary number test
	testInifiniteExpression(new Expression(4, 0, "/")); //divide by zero test

	testEqualExpression(new Expression(new Expression(3, 4, "+") , 2, "+"), 9); //using one expression as an arg
	testEqualExpression(new Expression(new Expression(3, 4, "+") , new Expression(1, 1, "+") , "*"), 14); //using two expressions as args
	testEqualExpression(new Expression(new Expression(3, new Expression(2, 2, "/"), "+") , 2, "+"), 6); //nesting expressions

	testUndefinedExpression(new Expression(1, 2, "d"), 'undefined'); //invalid input

	assertEquals(true, false); //test error_catching.
}

$(document).ready(function(){
	try{
		testExpressions();
	} catch (e) {
		$('#error').text(e.message);
	}
});