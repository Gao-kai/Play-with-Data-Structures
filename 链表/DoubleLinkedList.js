class DoubleListNode {
	constructor(prev, value, next) {
		this.prev = prev || null;
		this.value = value || null;
		this.next = next || null;
	}
}

/**
 * 双向链表 VS 单向链表
 * 1.同时具有head指针和tail指针，分别指向链表的头部和尾部，可以从头遍历到尾部，也可以从尾遍历到头部
 * 2.每一个节点都同时具有next指针和prev属性，更加方便找到前一个节点
 * 3.可以根据索引index是否靠近链表中间节点的位置来决定从头还是从尾开始遍历查找
 * 4.双向链表需要比单向链表更多的内存空间
 */
class DoubleLinkedList {
	constructor() {
		this.size = 0;
		this.head = null;
		this.tail = null;
	}

	/**
	 * 类似于JAVA 双向链表的添加方法实现 
	 * 1.边界判断
	 * 2.先实现通用的逻辑，就是找到要插入节点的当前节点和前一个节点
	 * 3.观察通用逻辑中所有涉及读取值的地方是否会有null.xxx = xxx的情况出现，比如
	 * 		- prevNode.next = newNode;这里的如果插入的位置为0，那么prevNode就是null，这就不满足通用情况，是边界条件
	 * 		- oldTailNode.next = this.tail;这里如果插入的位置是size，那么最终的的oldTailNode就是null，要处理特殊情况
	 * 		- 添加的时候还需要考虑链表原来为空的情况，此时index=0，size=0，这种情况可以合并到index=size这一类中
	 * @param {Object} index
	 * @param {Object} value
	 */
	add1(index, value) {
		if (index < 0 || index > this.size) {
			throw new Error('index边界出错')
		}
		/* 
			index==size包含两种情况：
			1. 链表为空的时候,此时index=0,size=0
			2. 插入的新节点是末尾的时候，比如链表有3个节点，插入的位置是3，这种getNode方法会直接报错 所以需要区别处理
		 */
		if (index == this.size) {
			let oldTailNode = this.tail;
			this.tail = new DoubleListNode(oldTailNode, value, null);;
			if (oldTailNode == null) {
				this.head = this.tail;
			} else {
				oldTailNode.next = this.tail;
			}
		} else {
			// 通用情况实现就包含了index=0的逻辑，只是逻辑处理需要区别对待
			let nextNode = this.getNode(index);
			let prevNode = nextNode.prev;
			let newNode = new DoubleListNode(prevNode, value, nextNode);

			if (prevNode == null) { // index = 0 只有这种情况才需要
				this.head = newNode;
			} else {
				prevNode.next = newNode;
			}
			nextNode.prev = newNode; // 这个代码可能会出问题，这么多节点里面只有0的节点的prev为null
		}
		this.size++;
	}

	/**
	 * 类似于JAVA 双向链表的移除方法实现  .next或者.prev的时候会不会为空
	 * @param {Object} index
	 * @param {Object} value
	 */
	remove1(index, value) {
		if (index < 0 || index >= this.size) {
			throw new Error('index边界出错')
		}
		// 先实现通用逻辑
		let currNode = this.getNode(index);
		let prevNode = currNode.prev;
		let nextNode = currNode.next;
		/* 
			思考为null.xxx = xxx的场景：
			当index=0的时候，prevNode=null
			当index=size的时候，nextNode =null
			当链表为空的时候，index=size会被边界判断拦截
		 */
		if (index == 0) { // prevNode=null
			this.head = nextNode;
		} else {
			prevNode.next = nextNode;
		}

		if (index == this.size - 1) {
			this.tail = prevNode;
		} else {
			nextNode.prev = prevNode;
		}
		this.size--;
	}

	/* 自己写的 写法不优雅 */
	add(index, value) {
		if (index < 0 || index > this.size) {
			throw new Error('index边界出错')
		}
		if (this.size == 0) {
			let newNode = new DoubleListNode(null, value, null);
			this.tail = newNode;
			this.head = newNode;
		} else {
			if (index === this.size) {
				let newNode = new DoubleListNode(this.tail, value, null);
				this.tail.next = newNode;
				this.tail = newNode;
			} else if (index === 0) {
				let newNode = new DoubleListNode(null, value, this.head);
				this.head.prev = newNode;
				this.head = newNode;
			} else {
				let currNode = this.getNode(index);
				let prevNode = currNode.prev;
				let newNode = new DoubleListNode(prevNode, value, currNode);
				prevNode.next = newNode;
				currNode.prev = newNode;
			}
		}
		this.size++;
	}
	
	/* 自己写的 写法不优雅 */
	remove(index, value) {
		if (index < 0 || index >= this.size) {
			throw new Error('index边界出错')
		}
		let currNode = this.getNode(index);
		if (this.size === 1) {
			this.head = null;
			this.tail = null;
		} else {
			if (index === this.size - 1) {
				let prevNode = currNode.prev;
				prevNode.next = null;
				this.tail = prevNode;
			} else if (index === 0) {
				let nextNode = currNode.next;
				currNode.prev = null;
				this.head = nextNode;
			} else {
				let prevNode = currNode.prev;
				let nextNode = currNode.next;

				prevNode.next = nextNode;
				nextNode.prev = prevNode;
			}
		}
		this.size--;
	}

	/**
	 * 双向链表查找节点的时候可以根据index的位置是否靠近1/2的位置进行区别处理
	 * @param {numbe} index 要查找的节点索引
	 */
	getNode(index) {
		if (index < 0 || index >= this.size) {
			throw new Error('index边界出错')
		}

		// 从尾部开始查找
		if (index > (this.size / 2)) {
			let curr = this.tail;
			let i = this.size - 1;
			while (i > index) {
				curr = curr.prev;
				i--;
			}
		} else {
			// 从头部开始查找
			let curr = this.head;
			let i = 0;
			while (i < index) {
				curr = curr.next;
				i++;
			}
		}

		return curr;
	}

	/**
	 * toString,带有当前节点的 prev_value_next
	 */
	toString() {
		let curr = this.head;
		let temp = [];
		while (curr) {
			let prevStr = curr.prev && curr.prev.value || null;
			let nextStr = curr.next && curr.next.value || null;
			let str = prevStr + '<-' + curr.value + '->' + nextStr;
			temp.push(str);
			curr = curr.next;
		}
		console.log(temp);
		return temp;
	}
}

const dp = new DoubleLinkedList();
dp.add(0, 100);
dp.add(1, 200);
dp.add(2, 300);
dp.add(3, 400);
console.log(dp);
dp.toString();
