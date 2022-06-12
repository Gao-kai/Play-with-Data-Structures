/**
 * 使用数组来实现双端循环队列CircleDeque
 + size() 获取队列元素的数量
 + isEmpty() 队列是否为空
 + enQueneRear(el) 从队列尾部入队
 + deQueneFront() 从队列头部出队
 + enQueneFront(el) 从队列头部入队 
 + deQueneRear() 从队列尾部出队 
 + front() 获取队头元素
 + rear() 获取队尾元素
 * 
 */

class CircleDeque {
	constructor(capacity) {
		capacity = capacity || 7;
		this.items = new Array(capacity);
		this.size= 0;
		this.first = 0;
	}
	
	/* 普通数组和循环数组索引转化方法 */
	transFormIndex(index){
		let finalIndex =  (this.first + index) % this.items.length;
		// 如果转换后的索引为负数 那么还需要加上数组长度 才是最终要插入元素的索引
		if(finalIndex < 0){
			finalIndex += this.items.length;
		}
		return finalIndex;
	}
	
	ensureCapacity(capacity){
		let oldCapacity = this.items.length;
		if (oldCapacity >= capacity) return;
		
		let newCapacity = Math.ceil(1.5 * oldCapacity);
		let newItems = new Array(newCapacity);
		
		for (let i = 0; i < oldCapacity; i++) {
			newItems[i] = this.items[this.transFormIndex(i)];
		}
		
		this.items = newItems;
		this.first = 0;
	}
	
	/* 1. 从队列尾部入队 */
	enQueneRear(el){
		if(this.size >= this.items.length){
			this.ensureCapacity(this.size+1);
		}
		
		this.items[this.transFormIndex(this.size)] = el;
		this.size++;
	}
	
	/* 3. 从队列头部入队 */
	enQueneFront(el){
		if(this.size >= this.items.length){
			this.ensureCapacity(this.size+1);
		}
		this.first = this.transFormIndex(-1);
		this.items[this.first] = el;
		this.size++;
		
	}
	
	/* 2.从队列头部出队 */
	deQueneFront(){
		let frontElement = this.front();
		this.items[this.first] = null;
		this.first = this.transFormIndex(1);
		this.size--;
		return frontElement;
	}
	
	/* 4.从队列尾部出队  */
	deQueneRear(){
		let lastElement = this.rear();
		this.items[this.transFormIndex(this.size-1)] = null;
		this.size--;
		return lastElement;
	}
	
	/* 5. 返回队列头部的元素 是最先被添加的也是即将被最先移除的元素 队列本身不做变动 */
	front(){
		return this.items[this.first];
	}
	
	/* 6. 返回队列尾部的元素 是最先被添加的也是即将被最先移除的元素 队列本身不做变动 */
	rear(){
		return this.items[this.transFormIndex(this.size-1)];
	}
	
	/* 7. 查询队列的元素个数 */
	size(){
		return this.size;
	}
	
	/* 8. 查询队列是否为空 */
	isEmpty(){
		return this.size === 0;
	}
	
	/* 9 输出队列的字符串表达 */
	toString(){
		console.log(`当前队列元素个数为${this.size},队列头在${this.front()},队列尾在${this.rear()}`);
		console.log(this.items);
		return this.items.join('<->')
	}

}

/**
 * 测试用例全部通过
 */
const deque = new CircleDeque();
console.log(deque.enQueneRear(100));
console.log(deque.enQueneRear(200));
console.log(deque.enQueneRear(300));
console.log(deque.enQueneRear(400));
console.log(deque.enQueneFront(500));
console.log(deque.enQueneFront(600));
console.log(deque.enQueneRear(700));
console.log(deque.deQueneFront());
console.log(deque.deQueneRear());
console.log(deque.front());
console.log(deque.rear());
console.log(deque.enQueneRear(800));
console.log(deque.enQueneRear(900));
console.log(deque.enQueneRear(1000));
console.log(deque.enQueneFront(500));
console.log(deque.toString());