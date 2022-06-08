/* 单向循环链表节点类 */
class Node {
	constructor(value, next) {
		this.value = value;
		this.next = next || null;
	}
}

class CircleLinkedList {
	constructor() {
	    this.head = null;
		this.size = 0;
	}
	
	add(index,value){
		if(index < 0 || index > this.size){
			throw new RangeError('index超出边界！')
		}
		/*
			包含了两种情况：
			1.链表为空，此时head为null，新节点的next指向null，然后head指向当前新节点
			2.链表不为空，此时head为原来的头节点，也是符合逻辑的
		 */
		if(index==0){
			let newNode = new Node(value,this.head);
			if(this.size==0){
				this.head = newNode;
				newNode.next = this.head;
			}else{
				// 因为getNode时是基于head开始循环的 所以这一句必须在下一句给head指针赋值之前执行 先读取都链表的最后一个节点
				let lastNode = this.getNode(this.size-1);
				this.head = newNode;
				lastNode.next = this.head;
			}
		}else{
			let prevNode = this.getNode(index-1);
			prevNode.next = new Node(value,prevNode.next);
		}
		this.size++;
	}
	
	remove(index,value){
		if(index < 0 || index >= this.size){
			throw new RangeError('index超出边界！')
		}
		if(index==0){
			
			if(this.size==1){
				// size=1的时候尤其注意 此时node的next还是指向自己的 是一个环 如果不区别对待 是无法成功删除这个节点的
				this.head = null;
			}else{
				// 一定一定修改head指针在getNode之后
				let lastNode = this.getNode(this.size-1);
				this.head = this.head.next;
				lastNode.next = this.head;
			}
		}else{
			let prevNode = this.getNode(index-1);
			let currNode = prevNode.next;
			prevNode.next = currNode.next;
		}
		this.size--;
	}
	
	getNode(index){
		if(index < 0 || index >= this.size){
			throw new RangeError('index超出边界！')
		}
		
		let currentNode = this.head;
		let i = 0 ;
		while(i < index){
			currentNode = currentNode.next;
			i++;
		}
		return currentNode;
	}
	
	toString() {
		let temp = [];
		let currentNode = this.head;
		let i = 0;
		while (i<this.size){
			temp.push(currentNode.value);
			currentNode = currentNode.next;
			i++;
		}
		return temp.join('->')
	}
	
}

const circleLinkedList = new CircleLinkedList();

circleLinkedList.add(0,10);
// circleLinkedList.add(0,20);
// circleLinkedList.add(2,30);
// circleLinkedList.add(3,40);
// circleLinkedList.add(2,999);
// circleLinkedList.add(0,1000);

circleLinkedList.remove(0);
// circleLinkedList.remove(2);
console.log(circleLinkedList.toString());