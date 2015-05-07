$('document').ready(function(){
	var display = $('#display');

	function testExpression(input, display) {
		for(var i = 0 ; i < input.length ; i++) {
			handleInput(input[i], display);
		}
		handleInput("=", display);

		var value = display.val();
		handleInput("clear", display);
		return value;
	}

	assertEquals(testExpression("5+8", display), 13); //addition
	assertEquals(testExpression("5-2", display), 3); //subtraction
	assertEquals(testExpression("7*3", display), 21); //multiplication
	assertEquals(testExpression("15/3", display), 5); //division
	assertEquals(testExpression("4^2", display), 16); //exponents
	assertEquals(testExpression("9^0.5", display), 3); //rooting

	assertEquals(testExpression("-9+3", display), -6); //negative number test
	assertEquals(testExpression("1.5+2.25", display), 3.75); //floating point test

	assertEquals(isNaN(testExpression("-2^0.5", display)), true); //imaginary number test
	assertEquals(isFinite(testExpression("4/0", display)), false); //divide by zero test

	assertEquals(testExpression("(2+2)", display), 4); //parenthesis
	assertEquals(testExpression("((2+2)*3)", display), 12); //nested parenthesis
	assertEquals(testExpression("((2+(2*3))+(3*(2+2)))", display), 20); //nested and consecutive parenthes
});