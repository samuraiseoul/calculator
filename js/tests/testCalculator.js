$('document').ready(function(){
	var display = $('#display');

	function testExpression(input, display) {
		for(var i = 0 ; i < input.length ; i++) {
			handleInput(input[i], display);
		}
		handleInput("=", display);
		clear(display);
	}

	testExpression("((2+2)*3)", display);
	testExpression("((2+(2*3))+(3*(2+2)))", display);
});