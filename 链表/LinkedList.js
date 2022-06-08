/* 单向链表节点类 */
class Node {
	constructor(value, next) {
		this.value = value;
		this.next = next || null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}
	
	/**
	 * 向链表的指定位置插入一个元素,快慢指针法：
	 * 判断插入的index是否为0
	 * 等于0，代表插入到当前链表的表头，新节点指向原来的head指向的节点
	 * 不等于0使用while循环和快慢指针找到index位置处的前一个节点
	 * 
	 * @param {Object} index
	 * @param {Object} value
	 */
	add(index, value) {
		if(index < 0 || index > this.size) return false;
		if(index==0){
			this.head = new Node(value,this.head);
		}else{
			let prev = null;
			let curr = this.head;
			let i = 0;
			while(i<index){
				prev = curr;
				curr = curr.next;
				i++;
			}
			prev.next = new Node(value,prev.next);
		}
		this.size++;
	}
	
	/* 
		插入元素，获取位置法
		1. 通过getNodeByIndex方法找到要插入位置index前一位的元素，也就是index-1
		2. 找到prev节点之后，在通过next找到下一个节点
		3. 将newNode的指针连接起来
	 */
	_add(index, value){
		if(index==0){
			this.head = new Node(value,this.head);
		}else{
			let prevNode = this.getNodeByIndex(index-1);
			// 这一行等于上面两行：创建一个新节点然后直接让其指向新的节点
			prevNode.next = new Node(value,prevNode.next);
		}
		this.size++;
	}
	

	/* 
		移除链表指定位置处的元素，其逻辑和插入是一样的
		1. 边界判断时需要注意移除的位置不能等于长度本身
		2. 一定记得size--
	 */
	remove(index) {
		if(index < 0 || index >= this.size) return false;
		
		if(index===0){
			this.head = this.head.next;
		}else{
			let currentNode = this.head;
			let prevNode = null;
			let i = 0;
			while(i<index){
				// 快慢指针
				prevNode = currentNode;
				currentNode = currentNode.next;
				i++;
			}
			
			prevNode.next = currentNode.next;
		}
		this.size--;
	}
	
	/*
		基于index索引获取对应位置的节点
		1. 这里无需判断index是否为0,因为下面这种写法两种情况都满足
	 */
	getNodeByIndex(index) {
		if(index < 0 || index >= this.size) return null;
		let currentNode = this.head;
		let i = 0 ;
		while(i < index){
			currentNode = currentNode.next;
			i++;
		}
		return currentNode;
	}
	
	/* 更新某个位置元素的值，并返回更新后的值 */
	setValue(index,value){
		let node = getNodeByIndex(index);
		let oldValue = node.value;
		node.value = value;
		return oldValue;
	}

	/* 
		判断某个元素是否存在于当前链表,如果存在返回这个元素所在位置索引
	 */
	indexOf(value) {
		let currentNode = this.head;
		let i = 0 ;
		while(currentNode !== null){
			if(currentNode.value === value){
				return i;
			}
			currentNode = currentNode.next;
			i++;
		}
		
		return -1;
	}
	
	clear() {
		this.size = 0;
		this.head = null; // 断开与链表连接 会被垃圾回收机制自动回收
	}

	toString() {
		let temp = [];
		let currentNode = this.head;
		while (currentNode != null){
			temp.push(currentNode.value);
			currentNode = currentNode.next;
		}
		return temp.join('->')
	}

}


const linkedList = new LinkedList();
linkedList._add(0,10);
linkedList._add(1,20);
linkedList._add(2,30);
linkedList._add(3,40);
linkedList._add(2,999);
linkedList._add(0,1000);

// linkedList.remove(0);
// linkedList.remove(2);

// console.log(linkedList.indexOf(999));
// console.log(linkedList.indexOf(10));
// console.log(linkedList.indexOf(20));

// console.log(linkedList.getNodeByIndex(0));
// console.log(linkedList.getNodeByIndex(1));
// console.log(linkedList.getNodeByIndex(2));
// console.log(linkedList.getNodeByIndex(5));

// linkedList.clear();

console.log(linkedList.toString());
