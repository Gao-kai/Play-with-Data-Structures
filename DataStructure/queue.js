class Queue {
	constructor() {
		this.items = [];
	}
	
	/* 1. 添加元素到队列尾部 */
	enqueue(el){
		this.items.push(el);
	}
	
	/* 2. 从队列头部删除元素，并返回删除的元素本身 */
	dequeue(){
		return this.items.shift();
	}
	
	/* 3. 返回队列头部的元素 是最先被添加的也是即将被最先移除的元素 队列本身不做变动 */
	front(){
		return this.items[0];
	}
	
	/* 4. 查询队列的元素个数 */
	size(){
		return this.items.length;
	}
	
	/* 5. 查询队列是否为空 */
	isEmpty(){
		return this.items.length === 0;
	}
	
	/* 6. 输出队列的字符串表达 */
	toString(){
		return this.items.join(' ');
	}

}

const queue = new Queue();

/* 
	基于队列实现击鼓传花
	将元素依次添加到一个队列上 开始循环队列 
	取出值进行对比 如果值不相同 那么就添加对队列的尾部 并从队列头部删除
	如果相同 直接将这个值从头部删除 并且不添加到尾部
	循环到直到队列中只有一个元素 就OK了
 */

function flower1(persons,num){
	/* 1. 定义初始变量 */
	const q = new Queue();
	
	/* 2. 将人员全部传递到队列中 */
	for(let i=0;i<persons.length;i++){
		q.enqueue(persons[i])
	}
	
	/* 3. 遍历队列 知道队列中有一个元素时终止遍历 */
	while(q.size() > 1){
		// 3.1 将队列中前num个元素依次删除，然后依次添加到队列尾部
		for(let i=0;i<num-1;i++){
			let item = q.dequeue();
			q.enqueue(item);
		}
		// 3.2 上诉循环结束之后队列头部的第一个就是索引等于num的元素 直接将其从队列头部删除
		q.dequeue();
	}
	
	/* 4. 获取输出结果 */
	let lastItem = q.front();
	let index = persons.indexOf(lastItem);
	return persons[index];
}


// 错误的代码 遍历的次数不应该由q的size决定 这会导致当队列中元素小于q当前的size的时候 for循环永远无法进入到break语句，导致while死循环
function flower2(persons,num){
	/* 1. 定义初始变量 */
	const q = new Queue();
	
	/* 2. 将人员全部传递到队列中 */
	for(let i=0;i<persons.length;i++){
		q.enqueue(persons[i])
	}
	
	/* 3. 遍历队列 知道队列中有一个元素时终止遍历 */
	while(q.size() > 1){		
		for(let i=0;i<q.size();i++){
			let item = q.dequeue();
			if(num === i+1){
				break;
			}else{
				q.enqueue(item);
			}
		}
	}
	
	/* 4. 获取输出结果 */
	let lastItem = q.front();
	let index = persons.indexOf(lastItem);
	return persons[index];
}

let persons = [1,2,3,4,5,6,7];
let num = 3;
console.log(flower1(persons,num));
