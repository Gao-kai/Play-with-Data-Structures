/* 单向链表节点类 */
class Node {
	constructor(value, next) {
		this.value = value;
		this.next = next || null;
	}
}

class DummyLinkedList {
	constructor() {
		let dummyHead = new Node(null,null)
		this.head = dummyHead;
		this.size = 0;
	}
	
	add(index,value){
		if(index < 0 || index > this.size){
			return false;
		}
		// 有了虚拟头节点 不需要再区分index为0和不为0的情况
		let prev = this.head;
		let curr = this.head.next;
		let i = 0;
		while(i < index){
			prev = curr;
			curr = curr.next;
			i++;
		}
		let newNode = new Node(value);
		newNode.next = prev.next;
		prev.next = newNode;
		
		this.size++;
	}
	
	remove(index){
		if(index < 0 || index >= this.size){
			return false;
		}
		let prev = this.head;
		let curr = this.head.next;
		let i = 0;
		while(i < index){
			prev = curr;
			curr = curr.next;
			i++;
		}
		prev.next = curr.next;
		this.size--;
	}
	
	toString() {
		let temp = [];
		let currentNode = this.head.next;
		while (currentNode != null){
			temp.push(currentNode.value);
			currentNode = currentNode.next;
		}
		return temp.join('->')
	}
}

/* 测试用例 */
const linkedList = new DummyLinkedList();
linkedList.add(0,10);
linkedList.add(1,20);
linkedList.add(2,30);
linkedList.add(3,40);
linkedList.add(2,999);
linkedList.add(0,1000);

linkedList.remove(0);
linkedList.remove(2);


console.log(linkedList.toString());