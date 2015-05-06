function Expression(n1, n2, op) {
	this.firstNumber = n1;
	this.secondNumber = n2;

	this.operator = op;

	this.getValue = function(number) {
		if(!(number instanceof Expression)) {
		return number;
		}
		return number.evaluate();
	}

}

Expression.prototype.evaluate = function() {
	switch(this.operator) {
		case "+" :
			return (this.getValue(this.firstNumber) + this.getValue(this.secondNumber));
			break;
		case "-" :
			return (this.getValue(this.firstNumber) - this.getValue(this.secondNumber));
			break;
		case "*" :
			return (this.getValue(this.firstNumber) * this.getValue(this.secondNumber));
			break;
		case "/" :
			return (this.getValue(this.firstNumber) / this.getValue(this.secondNumber));
			break;
		case "^" :
			return (Math.pow(this.getValue(this.firstNumber), this.getValue(this.secondNumber)));
			break;

		default :
			console.log("INVALID EXPRESSION: " + this.firstNumber + " " + this.operator + " " + this.secondNumber);
	}
};

Expression.prototype.valueToString = function(number) {
	if(!(number instanceof Expression)) {
		return number;
	}

	return ("("+ number.tostring() +")");
};

Expression.prototype.tostring = function() {
	return this.valueToString(this.firstNumber) + " " + this.operator + " " + this.valueToString(this.secondNumber);
};