function calculate(expression: string): number {
	expression = expression.replace(/\s+/g, '');
	
	function evaluate(tokens: string[]): number {
		let stack: number[] = [];
		let num = 0;
		let sign: string = '+';
		let lastValue: number | null = null;

		for (let i = 0; i < tokens.length; i++) {
			let token = tokens[i];

			if (!isNaN(Number(token))) {
				num = parseFloat(token);
			}

			if (token === '%' ) {
				if (lastValue !== null) {
					console.log(lastValue, num)
					num = lastValue * (num / 100);
				} else {
					num /= 100;
				}
			}

			if (isNaN(Number(token)) || i === tokens.length - 1) {
				switch (sign) {
					case '+':
						stack.push(num);
						lastValue = num;
						break;
					case '-':
						stack.push(-num);
						lastValue = -num;
						break;
					case '*':
						stack.push(stack.pop()! * num);
						break;
					case '/':
						stack.push(stack.pop()! / num);
						break;
				}

				sign = token;
				num = 0;
			}
		}

		return stack.reduce((a, b) => a + b, 0);
	}

	const tokens: string[] = expression.match(/(\d+(\.\d+)?|[-+*/%])/g) || [];
	const result = evaluate(tokens);
	return result;
}

export default calculate;
