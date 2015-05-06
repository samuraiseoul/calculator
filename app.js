// testExpressions();

var inputs = [];

function isOperator(val) {
	switch(val) {
			case "+":
			case "-":
			case "*":
			case "/":
			case "^": 
				return true;
			default:
				return false;
	}
}

function squishNumbers() {
	var squishedInputs = [];
	var currentNumber = "";
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input == "-" && (i == 0 || isOperator(inputs[i-1]))) {
			currentNumber += input;
			continue;
		}
		if(input == ".") {
			currentNumber += input;
			continue;
		}
		if($.isNumeric(input)) {
			currentNumber += input;
			if(i == (inputs.length - 1)){
				squishedInputs.push(Number(currentNumber));
			}
		} else if(isOperator(input) || input == "(" || input == ")") {
			if($.isNumeric(inputs[i -1])) {
				squishedInputs.push(Number(currentNumber));
				currentNumber = "";
			}
			squishedInputs.push(input);
		} else {
			throw new Error("squish input, " + input + " , is not a valid input!!");
		}
	}
	return squishedInputs;
}

function hasMoreParenthesisOps(inputs) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(input == "(") {
			return true;
		}
	}
	return false;
}

function hasMoreExponentOps(inputs) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(input == "^") {
			return true;
		}
	}
	return false;
}

function hasMoreMultiDivOps(inputs) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(input == "*" || input == "/") {
			return true;
		}
	}
	return false;
}

function hasMoreAddSubOps(inputs) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(input == "+" || input == "-") {
			return true;
		}
	}
	return false;
}

function squishAdditionAndSubtraction(inputs) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(input == "+" || input == "-") {
			inputs[i] = new Expression(inputs[i-1], inputs[i+1], input);
			inputs.splice(i+1, 1);
			inputs.splice(i-1, 1);
			break;
		}
	}
	if(hasMoreAddSubOps(inputs)) {
		return squishAdditionAndSubtraction(inputs);
	} else {
		return inputs;
	}
}

function squishMultiplicationAndDivision(inputs) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(input == "*" || input == "/") {
			inputs[i] = new Expression(inputs[i-1], inputs[i+1], input);
			inputs.splice(i+1, 1);
			inputs.splice(i-1, 1);
			break;
		}
	}
	if(hasMoreMultiDivOps(inputs)) {
		return squishMultiplicationAndDivision(inputs);
	} else {
		return squishAdditionAndSubtraction(inputs);
	}
}

function squishExponents(inputs) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(input == "^") {
			inputs[i] = new Expression(inputs[i-1], inputs[i+1], input);
			inputs.splice(i+1, 1);
			inputs.splice(i-1, 1);
			break;
		}
	}
	if(hasMoreExponentOps(inputs)) {
		return squishExponents(inputs);
	} else {
		return squishMultiplicationAndDivision(inputs);
	}
}

function getExpressionAfterSquish(inputs) {
	if(inputs.length != 1) {
		throw new Error("More than one expression or input after squish!");
	}
	return inputs[0];
}

function squishParenthesis(inputs) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(input == "(") {
			var toIgnore = 0;
			for(var j = i + 1 ; j < inputs.length ; j++) { // i+ 1 otherwise it checks it's self as a sub tag.
				if(inputs[j] == "(") {
					toIgnore++;
				} else if(inputs[j] == ")") {
					if(toIgnore > 0) {
						toIgnore --;
						continue;
					}
					inputs.splice(j, 1); //remove the corresponding ")"
					
					// var testInputs = inputs;
					// testInputs = testInputs.splice(i+1, (j - i - 1));
					// console.log(testInputs);
					
					inputs[i] = getExpressionAfterSquish(squishParenthesis(inputs.splice(i+1, (j - i - 1)))); //subtract one from index as to not get j as well.
					console.log(inputs);
					break;
				}
			}
			break;
		}
	}
	if(hasMoreParenthesisOps(inputs)) {
		return squishParenthesis(inputs);
	} else {
		return squishExponents(inputs);
	}
}

function createExpression() {
	var squishedInputs = squishNumbers(inputs);
	console.log("SquishedInputs: ");
	console.log(squishedInputs);

	var squishedOperators = squishParenthesis(squishedInputs);
	console.log("Squished Ops: ");
	console.log(squishedOperators);

	return getExpressionAfterSquish(squishedOperators);
}

var undoneInputs = [];

var unclosedParenthesis = 0;

$('document').ready(function(){
	function handleInput(input){
		if(input == "(") {
			unclosedParenthesis++;
		}

		if(input == ")") {
			if(unclosedParenthesis == 0) {
				return;
			}
			unclosedParenthesis--;
		}

		if(input == "-" && (inputs.length == 0 || isOperator(inputs[inputs.length - 1]))) {
			inputs.push("-");
			$('#display').val(inputs.join(" "));
			return;
		}

		if((isOperator(input) && isOperator(inputs[inputs.length - 1])) || (input == "." && inputs[inputs.length - 1] == ".")) {
			return;
		}

		if(input == "undo") {
			undoneInputs.push(inputs.splice((inputs.length - 1), 1)[0]);
			$('#display').val(inputs.join(" "));
			return;
		}
		if(input == "redo") {
			inputs.push(undoneInputs.splice((undoneInputs.length - 1), 1)[0]);
			$('#display').val(inputs.join(" "));
			return;
		}
		if(input == "clear") {
			inputs = [];
			$('#display').val(inputs.join(" "));
			return;
		}

		if(input == "=") {
			var expression = createExpression();
			inputs.unshift("(");
			inputs.push(")");
			$('#display').val(expression.evaluate());
		} else {
			undoneInputs = [];
			if(input == "^2"){
				inputs.push("^");
				inputs.push("2");
			} else {
				inputs.push(input);
			}
			$('#display').val(inputs.join(" "));
		}
	}

	function testExpression(input) {
		for(var i = 0 ; i < input.length ; i++) {
			handleInput(input[i]);
		}
		handleInput("=");
	}

	// testExpression("((2+2)*3)");
	// testExpression("((2+(2*3))+(3*(2+2)))");


	$('button').click(function(){
		handleInput($(this).val());
	})
});















//TO DO
/*
MAKE GITHUB REPO
Work on testing undo after = is pressed, also lookingto using previous calculated result as first input.

Prettify squishnumbers and button click function
Extract code into new file for organizational purposes

Test based on input not hard coded expressions
Errors log to screen, not console

Key Listener for input

Voice input? (using annyang)
*/



