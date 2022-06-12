import DoubleLinkedList from '../链表/DoubleLinkedList.js';
/**
 * 使用双向链表来实现单向队列Queue
 * 入队enQuene：就是从链表尾部添加一个新的节点
 * 出队deQuene：也就是移除当前链表的头部节点
 * 
 */

class Queue {
	constructor() {
		this.linkedList = new DoubleLinkedList();
	}
	
	/* 1. 添加元素到队列尾部 */
	enqueue(el){
		this.linkedList.add1(this.linkedList.size, el);
	}
	
	/* 2. 从队列头部删除元素，并返回删除的元素本身 */
	dequeue(){
		this.linkedList.remove1(0)
	}
	
	/* 3. 返回队列头部的元素 是最先被添加的也是即将被最先移除的元素 队列本身不做变动 */
	front(){
		return this.linkedList.getNode(0)
	}
	
	/* 4. 查询队列的元素个数 */
	size(){
		return this.linkedList.size;
	}
	
	/* 5. 查询队列是否为空 */
	isEmpty(){
		return this.linkedList.size === 0;
	}
	
	/* 6. 输出队列的字符串表达 */
	toString(){
		return this.linkedList.toString();
	}

}


/**
 * 使用数组来实现单向队列Queue
 * 入队enQuene：就是从数组尾部push一个新的节点
 * 出队deQuene：也就是将数组头部元素删除shift出去
 * 
 */
class Queue1 {
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



/**
 * 测试用例全部通过
 */
const q = new Queue1();
q.enqueue(100);
q.enqueue(200);
q.enqueue(300);
q.enqueue(400);
q.dequeue();
q.dequeue();
console.log(q.front());
console.log(q.size());
console.log(q.isEmpty());
console.log(q.toString());