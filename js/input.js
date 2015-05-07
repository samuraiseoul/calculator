var inputs = [];

var undoneInputs = [];

var unclosedParenthesis = 0;

function clearDisplay() {		
	inputs = [];
}

function parenthesis(input) {
	if(input == "(") {
		unclosedParenthesis++;
		inputs.push(input);
	}

	if(input == ")") {
		if(unclosedParenthesis == 0) {
			return;
		}
		unclosedParenthesis--;
		inputs.push(input);
	}
}

function minusNegative(input, display) {
	if(input == "-" && 
		(inputs.length == 0 
			|| (inputs.length > 1 
				&& (
					isOperator(inputs[inputs.length - 1]) && !isOperator(inputs[inputs.length - 2])
					)
				)
		)
	) {
		inputs.push("-");
		display.val(inputs.join(" "));
	}
}

function undo(input) {
	if(input == "undo") {
		undoneInputs.push(inputs.splice((inputs.length - 1), 1)[0]);
	}	
}

function redo(input) {
	if(input == "redo") {
		inputs.push(undoneInputs.splice((undoneInputs.length - 1), 1)[0]);
	}
}

function clear(input) {
	if(input == "clear") {
		clearDisplay(display);
	}
}

function equals(input, display) {
	if(input == "=") {
		var expression = createExpression();
		inputs.unshift("(");
		inputs.push(")");
		display.val(expression.evaluate());
	}
}

function square(input) {
	if(input == "^2"){
		inputs.push("^");
		inputs.push("2");
	}
}

function handleInput(input, display){
	minusNegative(input, display); //has to come before to allow two minus signs consecutively

	//disallow sequential operators or decimal
	if((isOperator(input) && (isOperator(inputs[inputs.length - 1]) || inputs.length == 0)) 
		|| (input == "." && inputs[inputs.length - 1] == ".")) {
		return;
	}

	parenthesis(input);
	undo(input);
	redo(input);
	square(input);
	clear(input);

	if(isOperator(input) || $.isNumeric(input) || input == ".") {
		undoneInputs = [];
		inputs.push(input);
	}
	display.val(inputs.join(" "));

	equals(input, display); //has different display function.
}









