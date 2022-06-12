import DoubleLinkedList from '../链表/DoubleLinkedList.js';
/**
 * 使用双向链表来实现双端队列Queue
 + size() 获取队列元素的数量
 + isEmpty() 队列是否为空
 + enQueneRear(el) 从队列尾部入队，链表尾部新增节点
 + deQueneFront() 从队列头部出队，移除链表头节点
 + enQueneFront(el) 从队列头部入队 链表头部插入节点
 + deQueneRear() 从队列尾部出队 链表尾部移除节点
 + front() 获取队头元素
 + rear() 获取队尾元素
 * 
 */

class Deque {
	constructor() {
		this.linkedList = new DoubleLinkedList();
	}
	
	/* 1. 从队列尾部入队，链表尾部新增节点 */
	enQueneRear(el){
		this.linkedList.add1(this.linkedList.size, el);
	}
	
	/* 2.从队列头部出队，移除链表头节点，并返回移除的节点 */
	deQueneFront(){
		this.linkedList.remove1(0)
	}
	
	/* 3. 从队列头部入队，链表头部新增节点 */
	enQueneFront(el){
		this.linkedList.add1(0, el);
	}
	
	/* 4.从队列尾部出队 链表尾部移除节点，并返回移除的节点 */
	deQueneRear(){
		this.linkedList.remove1(this.linkedList.size - 1)
	}
	
	/* 5. 返回队列头部的元素 是最先被添加的也是即将被最先移除的元素 队列本身不做变动 */
	front(){
		return this.linkedList.getNode(0)
	}
	
	/* 6. 返回队列尾部的元素 是最先被添加的也是即将被最先移除的元素 队列本身不做变动 */
	rear(){
		return this.linkedList.getNode(this.linkedList.size - 1)
	}
	
	/* 7. 查询队列的元素个数 */
	size(){
		return this.linkedList.size;
	}
	
	/* 8. 查询队列是否为空 */
	isEmpty(){
		return this.linkedList.size === 0;
	}
	
	/* 9 输出队列的字符串表达 */
	toString(){
		return this.linkedList.toString();
	}

}

const deque = new Deque();
console.log(deque.enQueneRear(100));
console.log(deque.enQueneRear(200));
console.log(deque.enQueneFront(300));
console.log(deque.enQueneFront(400));
console.log(deque.deQueneFront());
console.log(deque.deQueneRear());
console.log(deque.front());
console.log(deque.rear());
deque.toString();