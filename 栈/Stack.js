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
	top(){
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

/**
 * 
 * 使用栈来实现浏览器的前进和后退功能
 * pageStack：存放页面地址栏中输入的网址元素的栈，栈顶的url就是当前页面展示的url
 * historyStack：存放页面历史记录的栈
 * 输入新的网址url：将url压入pageStack栈，并且将historyStack栈清空
 * 前进按钮：将historyStack栈顶的元素弹出，并且同时压入到pageStack栈顶
 * 后退按钮：将pageStack栈顶的元素弹出，并且同时压入到historyStack栈顶
 * 
 */
class Browser {
	constructor(){
		this.pageStack = [];
		this.historyStack = [];
	}
	
	// 输入新的url地址
	inputUrl(url){
		this.pageStack.push(url);
		this.historyStack = [];
	}
	
	// 获取当前页面展示的url
	getPageUrl(){
		let len = this.pageStack.length;
		return len ? this.pageStack[len-1] : null; 
	}
	
	// 前进按钮
	forward(){
		let len = this.historyStack.length;
		if(len === 0){
			throw new Error('前进按钮不可点击');
		}else{
			let popUrl = this.historyStack.pop();
			this.pageStack.push(popUrl);
		}
		
	}
	
	// 后退按钮
	back(){
		let len = this.pageStack.length;
		if(len === 0){
			throw new Error('后退按钮不可点击');
		}else{
			let popUrl = this.pageStack.pop();
			this.historyStack.push(popUrl);
		}
	}
}

const broswer = new Browser();
broswer.inputUrl('jd.com');
broswer.inputUrl('qq.com');
broswer.inputUrl('baidu.com');
broswer.back();
broswer.back();
broswer.forward();
broswer.inputUrl('taobao.com');
broswer.forward(); // 前进按钮不可点击

