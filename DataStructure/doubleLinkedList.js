// 定义双向链表的节点类
class Node {
	constructor(data) {
		this.data = data;
		this.prev = null;
		this.next = null;
	}
}

class DoubleLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	
	/* 向双向链表尾部添加一个元素 */
	append(el){
		let newNode = new Node(el);
		// 1. 如果当前链表为空 那么这个新节点即是头部节点也是尾部节点
		if(this.head == null && this.tail == null){
			this.head = newNode;
			this.tail = newNode;
		}else{
			// 2. 如果当前链表不为空 需要找到最后一个节点也就是tail 
			this.tail.next = newNode; // 将最后一个节点的next指向新节点
			newNode.prev = this.tail; // 将新节点的prev指向原先的最后一个节点

			// 此时新节点已经变成了最后一个节点 需要修改tail指针
			this.tail = newNode;
		}
		
		// 3. 链表长度+1
		this.length++;
	}
	
	/* 向特定的位置插入一个新元素 */
	insert(index,el){
		// index参数边界判断
		if(index < 0 || index > this.length) return false;
		
		let newNode = new Node(el);
		
		// 如果原来的列表为空
		if(this.length===0){
			this.head = newNode;
			this.tail = newNode;
		}else{
			// 如果是从头部插入
			if(index === 0){
				this.head.prev = newNode;
				newNode.next = this.head;
				this.head = newNode;
				
			}else if(index === this.length){
				newNode.prev = this.tail;
				this.tail.next = newNode;
				this.tail = newNode;
			}else{
				// 如果不是头部插入 需要找到原来index位置的那个元素本身和前一个元素
				let currentNode = this.head;
				let i = 0;
				
				while(i++ < index){
					currentNode = currentNode.next;
				}
				// 循环结束后此时currentNode代表找到的位置为index的元素 找到当前index位置元素的上一个元素
				let prevNode = currentNode.prev;
				
				// 将新节点的next指向原来的currentNode 将prev指向原来的prevNode
				newNode.next = currentNode;
				newNode.prev = prevNode;
				
				// 原来的prevNode的next指向改变为新插入进来的newNode
				prevNode.next = newNode;
				currentNode.prev = newNode;
			}
		}
		this.length ++;
	}
	
	/* 获取特定位置的元素信息 */
	getNode(index){
		// index参数边界判断
		if(index < 0 || index >= this.length) return null;
		let currentNode = this.head;
		
		// 对index判断决定是前序遍历还是后序遍历
		if(this.length / 2 > index){
			let i = 0;
			while(i++ < index){
				currentNode = currentNode.next;
			}
		}else{
			let i = this.length -1;
			while(i-- > index){
				currentNode = currentNode.prev;
			}
		}

		return currentNode.data;
	}
	
	/* 返回某一个元素在列表中的索引，如果没有返回-1 */
	indexOf(el){
		let currentNode = this.head;
		let i = 0;
		while(currentNode){
			if(currentNode.data === el.data){
				return i;
			}
			currentNode = currentNode.next;
			i++;
		}
		
		return -1;
	}
	
	/* 修改某个位置的元素 */
	update(index,el){
		// index参数边界判断
		if(index < 0 || index >= this.length) return false;
		let currentNode = this.head;
		
		// 对index判断决定是前序遍历还是后序遍历
		if(this.length / 2 > index){
			let i = 0;
			while(i++ < index){
				currentNode = currentNode.next;
			}
		}else{
			let i = this.length -1;
			while(i-- > index){
				currentNode = currentNode.prev;
			}
		}
		
		currentNode.data = el.data;
	}
	
	/* 从列表的特定位置移除一项 */
	removeAt(index){
		// index参数边界判断
		if(index < 0 || index >= this.length) return null;
		
		let currentNode = this.head;
		// 如果链表中只有一个节点
		if(this.length===1){
			this.head = null;
			this.tail = null;
		}else{
			// 如果是从头部移除
			if(index===0){
				// 找到当前头节点的下一个节点
				let nextNode = this.head.next;
				nextNode.prev = null;
				this.head = nextNode;
				
			}else if(index === this.length-1){
				currentNode = this.tail;
				// 如果是从尾部删除 先找到当前尾部节点的上一个节点
				let prevNode = this.tail.prev;
				prevNode.next = null;
				this.tail = prevNode;
			}else{
				// 如果是从中间删除
				let i = 0;
				while(i++ < index){
					currentNode = currentNode.next;
				}
				
				let prevNode = currentNode.prev;
				let nextNode = currentNode.next;
				
				prevNode.next = nextNode;
				nextNode.prev = prevNode;
			}
		}
		
		this.length--;
		
		return currentNode.data;
	}
	
	/* 从列表中移除某个元素 */
	remove(el){
		// 找到要移除元素的索引
		let index = this.indexOf(el);
		this.removeAt(index);
	}
	
	/* 判断列表是否为空 */
	isEmpty(){
		return this.length === 0;
	}
	
	/* 返回列表中元素的个数 */
	size(){
		return this.length;
	}
	
	/* 返回节点的字符串表达 */
	toString(){
		return this.fowardString();
	}
	
	/* 返回正向遍历的节点字符串形式 */
	fowardString(){
		let currentNode = this.head;
		let nodeList = [];
		while(currentNode){
			nodeList.push(currentNode.data);
			currentNode = currentNode.next;
		}
		return nodeList.join(' ');
	}
	
	/* 返回反向遍历的节点字符串形式 */
	backwordString(){
		let currentNode = this.tail;
		let nodeList = [];
		while(currentNode){
			nodeList.push(currentNode.data);
			currentNode = currentNode.prev;
		}
		return nodeList.join(' ');
	}
	
}

const doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.append(100);
doubleLinkedList.append(200);