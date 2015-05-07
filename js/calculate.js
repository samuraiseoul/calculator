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

function hasMoreOp(inputs, op) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(op(input)) {
			return true;
		}
	}
	return false;
}

function hasMoreParenthesisOps(inputs) {
	return hasMoreOp(inputs, function(input){ return input == "("});
}

function hasMoreExponentOps(inputs) {
	return hasMoreOp(inputs, function(input){ return input == "^"});
}

function hasMoreMultiDivOps(inputs) {
	return hasMoreOp(inputs, function(input){ return (input == "*" || input == "/")});
}

function hasMoreAddSubOps(inputs) {
	return hasMoreOp(inputs, function(input){ return (input == "+" || input == "-")});
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

function squishOps(inputs, comp) {
	for(var i = 0 ; i < inputs.length ; i++) {
		var input = inputs[i];
		if(input instanceof Expression) { continue; }
		if(comp(input)) {
			inputs[i] = new Expression(inputs[i-1], inputs[i+1], input);
			inputs.splice(i+1, 1);
			inputs.splice(i-1, 1);
			break;
		}
	}
}

function squishAdditionAndSubtraction(inputs) {
	squishOps(inputs, function(input){ return (input == "+" || input == "-")});
	if(hasMoreAddSubOps(inputs)) {
		return squishAdditionAndSubtraction(inputs);
	} else {
		return inputs;
	}
}

function squishMultiplicationAndDivision(inputs) {
	squishOps(inputs, function(input){ return (input == "*" || input == "/")});
	if(hasMoreMultiDivOps(inputs)) {
		return squishMultiplicationAndDivision(inputs);
	} else {
		return squishAdditionAndSubtraction(inputs);
	}
}

function squishExponents(inputs) {
	squishOps(inputs, function(input){ return input == "^"});
	if(hasMoreExponentOps(inputs)) {
		return squishExponents(inputs);
	} else {
		return squishMultiplicationAndDivision(inputs);
	}
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

function getExpressionAfterSquish(inputs) {
	if(inputs.length != 1) {
		throw new Error("More than one expression or input after squish!");
	}
	return inputs[0];
}

function createExpression() {
	return getExpressionAfterSquish(squishParenthesis(squishNumbers(inputs)));
}