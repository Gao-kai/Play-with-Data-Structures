class Stack {
	constructor(){
		this.items = [];
	}

	/* 1.压栈:添加一个新元素到栈顶 */
	push(el){
		this.items.push(el);
	}
	
	/* 2.出栈：移除栈顶的元素，同时返回被移除的元素 */
	pop(){
		return this.items.pop();
		return this.items.splice(this.items.length-1,1);
	}
	
	/* 3.返回栈中元素个数 */
	size(){
		return this.items.length;
	}
	
	/* 4.返回当前栈的栈顶元素 */
	peek(){
		return this.items[this.items.length-1];
	}
	
	/* 5.检查栈是否为空 */
	isEmpty(){
		return this.items.length === 0
	}
	
	/* 6.将栈结构的内容以字符形式返回 */
	toString(){
		return this.items.join(' ');
	}
	
}

const stack = new Stack();

/* 
	基于栈的特性实现将十进制的数转化为二进制的数 
	十进制转二进制特点：将十进制的数不停的用2去整除，将每次整除得到的余数放到栈顶，每次整除得到的商当做下一次整除的数，直到商小于等于0结束循环
	将栈中元素从栈顶依次取出，就是最终的2进制数
*/
function dec2Bin(decNumber){
	/* 1.定义初始变量 */
	let stack = new Stack();
	let remainder;
	
	/* 2. 循环用2去整除 */
	while(decNumber>0){
		remainder = decNumber % 2;
		decNumber = Math.floor(decNumber / 2);
		stack.push(remainder);
	}
	
	/* 3. 从栈顶依次取出，直到栈为空 */
	let binNumber='';
	while(!stack.isEmpty()){
		binNumber += stack.pop();
	}
	
	return Number(binNumber);

}

console.log(dec2Bin(200));
console.log(dec2Bin(0));
console.log(dec2Bin(1));
console.log(dec2Bin(2));


/* 十进制转任意进制 */
function dec2Any(decNumber,redix){
	/* 1.定义初始变量 */
	let stack = new Stack();
	let remainder;
	
	/* 2. 循环用2去整除 */
	while(decNumber>0){
		remainder = decNumber % redix;
		decNumber = Math.floor(decNumber / redix);
		stack.push(remainder);
	}
	
	/* 3. 从栈顶依次取出，直到栈为空 */
	let binNumber='';
	while(!stack.isEmpty()){
		binNumber += stack.pop();
	}
	
	return Number(binNumber);
}

console.log(dec2Any(200,8));
console.log(dec2Any(0,16));
console.log(dec2Any(1,10));
console.log(dec2Any(25,8));