(function() {

var calculator = {

	init: function() {
		// Elements and variables used
		buttons    = document.querySelectorAll(".button");
		//console.log(buttons);
		equal      = document.getElementById("equal");
		clear      = document.getElementById("clear");
		screenElem = document.getElementById("screen");
		decimalAdded= document.getElementById('decimal');
		//window.alok=buttons;
		calcResult = 0;
		stack = [];
		var buttonsLen= buttons.length;
		//var decCount= document.getElementById('decimal');
		// Event handlers
		for (var i = 0; i < buttonsLen; i++) {
			buttons[i].onclick = this.addNum;
		}

		//decCount.onclick=this.decCountCheck;
		equal.onclick = this.calculate;
		clear.onclick = this.clearCalc;
	},

	calculate: function() {
		// Get operation index
		var opIndx = -1;

		['+', '-', '*', '/'].forEach(function(val, ind, arr){
			if (stack.indexOf(val)>0)
				opIndx = stack.indexOf(val);
		});

			
		var op1Arr = stack.slice(0, opIndx);
		var op2Arr = stack.slice(opIndx + 1, stack.length);
		//console.log(typeof(op1Arr[0]));
		/*console.log("op1Arr"+op1Arr);
		console.log("op2Arr"+op2Arr);
*/
		op1 = op1Arr.join('');
		//console.log("alok");
		/*console.log(op1);*/
		/*console.log(typeof(op1));*/
		

		op2= op2Arr.join('');
		 
		/*var temp= op2.toString();
		console.log("temp"+temp);*/
		var lastChar= op2[op2.length-1];
/*		console.log("lastChar"+lastChar);
*/
		if(stack.indexOf('lastChar') > -1 || lastChar == '.'){
			stack = stack.replace(/.$/, '');
		}

		
		op1 = parseFloat(op1, 10);
		op2 = parseFloat(op2, 10);
		/*console.log(op1);
		console.log(op2);*/
		
		//console.log(op1 + stack[opIndx] + op2);



		
		switch(stack[opIndx]) {
			case '+':
				calcResult = calculator.addi(op1, op2);
				break;
			case '-':
				calcResult = calculator.subt(op1, op2);
				break;
			case '*':
				calcResult = calculator.mult(op1, op2);
				break;
			case '/':
				calcResult = calculator.div(op1, op2);
				break;
			default:
				calcResult = '???';
		}

		
		calculator.printResult(calcResult);
		stack = [];
	},



	addNum: function() {
		//console.log(this.innerHTML);
			if (stack.length === 0) {
			screenElem.innerHTML = '';
		}
		/*if(screenElem.innerHTML=='-'){
			if((this.innerHTML=='-')){
				return;
			}
		}*/

		if(!screenElem.innerHTML){
			if((this.innerHTML=='+')||(this.innerHTML=="*")||(this.innerHTML=='/')){
				return;
			}
		}


		if(this.innerHTML!='.'){
			calculator.pushNum.apply(this);
		}		
		if((this.innerHTML=='.') && (stack.indexOf('.')>-1)){
				return;
			}
		if((this.innerHTML=='.') && (stack.indexOf('.')<0)){
				calculator.pushNum.apply(this);
			}
		//console.dir(this);
		
	},
	pushNum: function() {
		stack.push(this.innerHTML);
		//console.log(this.innerHTML);

		screenElem.innerHTML += this.innerHTML;
		//console.log(screenElem.innerHTML);
		
	},
	addi: function(x, y) {
		return x + y;
	},
	subt: function(x, y) {
		return x - y;
	},
	mult: function(x, y) {
		return x * y;
	},
	div: function(x, y) {
		if (y === 0)
			return "???";
		return x / y;
	},
	printResult: function(res) {
		screenElem.innerHTML = res;
	},
	clearCalc: function() {
		stack = [];
		screenElem.innerHTML ='';
		
	}
};

calculator.init();

})();
