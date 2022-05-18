/* 链表元素类 */
class Node {
	constructor(data) {
	    this.data = data;
		this.next = null;
	}
}

/* 单向链表类 */
class LinkedList {
	constructor() {
		this.head = null; // 链表第一个元素节点，默认指向null
		this.length = 0; // 链表节点长度
	}
	
	/* 向链表尾部添加一项元素 */
	append(element){
		let node = new Node(element);
		
		// 1. 如果链表为空 则将head的指针指向新的元素即可
		if(this.head === null){
			this.head = node;
		}else{
			// 2. 如果链表不为空 则遍历每一个链表节点 直到某个节点的next属性为null 然后将最后一个节点的next属性指向当前新节点即可
			let currentNode = this.head;
			while(currentNode.next){
				currentNode = currentNode.next;
			}
			currentNode.next = node;
		}
		
		// 3. 让链表的长度+1
		this.length++;
	}
	
	/* 向链表特定的位置插入一项元素 */
	insert(index,element){
		// 1. 对插入的位置做边界判断
		if(index < 0 || index > this.length) return false;
		
		let newNode = new Node(element);
		
		// 2. 如果在头部插入 那么就直接将当前新节点的next指向原来的head节点 并修改整个链表的head节点为头节点
		if(index === 0){
			newNode.next = this.head;
			this.head = newNode;
		}else{
			// 挨个遍历查找 并找到要插入位置的前一个节点和后一个节点
			let currentNode = this.head;
			let prevNode = null;
			// i控制while循环的循环次数
			let i = 0;
			while(i++ <index){
				prevNode = currentNode;
				currentNode = currentNode.next;
			}
			
			// 找到之后将新节点的next指向currentNode prevNode的next指向新节点 就链起来了
			newNode.next = currentNode;
			prevNode.next = newNode;
		}
		
		// 3.节点长度+1
		this.length ++;
		
	}
	
	/* 获取对应位置的元素 */
	getNode(index){
		if(index < 0 || index >= this.length)return null;
		let currentNode = this.head;
		let i=0;
		while(i++ < index){
			currentNode = currentNode.next;
		}
		return currentNode.data;
	}
	
	/* 返回某个元素在链表中的索引，如果不存在则返回-1 */
	indexOf(data){
		let currentNode = this.head;
		let i = 0;
		while(currentNode){
			if(currentNode.data === data){
				return i;
			}
			currentNode = currentNode.next;
			i++;
		}
		return -1;
	}
	
	/* 修改链表某个位置的元素 */
	update(index,data){
		if(index < 0 || index >= this.length)return null;
		let currentNode = this.head;
		let i=0;
		while(i++ < index){
			currentNode = currentNode.next;
		}
		currentNode.data = data;
	}
	
	/* 从链表中删除一项元素 */
	remove(data){		
		let index = this.indexOf(data);
		return this.removeAt(index);
	}
	
	/* 删除链表某个位置的元素 */
	removeAt(index){
		if(index < 0 || index >= this.length) return false;
		
		if(index===0){
			this.head = this.head.next;
		}else{
			let currentNode = this.head;
			let prevNode = null;
			let i=0;
			while(i++ < index){
				prevNode = currentNode;
				currentNode = currentNode.next;
			}
			prevNode.next = currentNode.next;
		}
		
		this.length--;
	}
	
	/* 链表是否为空 */
	isEmpty(){
		return this.length === 0;
	}
	
	/* 返回链表当前元素数量 */
	size(){
		return this.length;
	}
	
	/* 输出链表中所有元素的字符串表达:遍历链表中每一个元素，并依次取出节点的data，并拼接成字符串返回 */
	toString(){
		let currentNode = this.head;
		let nodeList = [];
		// 注意这里的循环条件不是currentNode.next 因为这样会导致最后一个元素的data是取不到的
		while(currentNode){
			nodeList.push(currentNode.data); // 200 
			currentNode = currentNode.next;
		}
		return nodeList.join(' ');
	}
	
}

const linkedList = new LinkedList();
linkedList.append(100);
linkedList.append(200);
linkedList.insert(2,'demo');
