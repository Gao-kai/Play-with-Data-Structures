/**
 * 基于动态数组实现CircleQuene
 */
class CircleQuene {
	constructor(capacity) {
		capacity = capacity || 5;
		this.items = new Array(capacity);
		this.first = 0; // 数组类型 存储的是数组下标 默认指向0
		this.size = 0; // 数组中的有效元素 不包含为空的元素
	}

	/* 队列元素是否为空 */
	isEmpty() {
		return this.size === 0;
	}

	/* 获取队头元素 */
	front() {
		return this.items[this.first];
	}
	
	/* 公共转化索引方法 */
	transFormIndex(index){
		return (this.first + index) % this.items.length;
	}

	/**
	 * @param {Object} el 入队的元素
	 * 1. 入队之前首先要判断是否需要扩容
	 * 2. 队尾入队的问题在于如何找到新添加元素真实的索引
	 */
	enQuene(el) {
		// 队列元素个数已经超出最大容量 此时扩容
		if (this.size >= this.items.length) {
			this.ensureCapacity(this.size+1);
		}
		
		// 将el添加到队尾 重点是获取此时要添加的队尾索引是几
		// let realEndIndex = (this.first + this.size) % this.items.length;
		this.items[this.transFormIndex(this.size)] = el;
		this.size++;
	}
	
	/**
	 * deQuene 队头出队
	 * 1. 首先取出要出队的元素
	 * 2. 不直接将该元素从数组中移，而是采用更加简单的置为空处理
	 * 3. first指针指向下一个元素，这里重点是找到下一个元素的正确索引
	 * 4. 数组长度-1
	 * 5. 将出队的元素返回
	 */
	deQuene() {
		let frontElement = this.items[this.first];
		this.items[this.first] = null;
		// this.first = (this.first + 1) % this.items.length;
		this.first = this.transFormIndex(1);
		this.size--;
		return frontElement;
	}

	/**
	 * @param {number} capacity 保证扩容之后要有的最小数组容量
	 */
	ensureCapacity(capacity) {
		// 获取旧数组的容量 如果扩容容量还小于旧的数组 直接返回
		let oldCapacity = this.items.length;
		if (oldCapacity >= capacity) return;
		console.log('旧数组为：',this.items,'容量为：',oldCapacity);
		
		// 设置新数组的容量并基于此长度创建一个新数组
		let newCapacity = Math.ceil(1.5 * oldCapacity);
		let newItems = new Array(newCapacity);

		// 遍历旧数组 将旧数组中元素从first开始依次添加到新的数组中
		for (let i = 0; i < oldCapacity; i++) {
			// 获取旧的数组中first-end位置的真实索引
			// let realIndex = (i + this.first) % this.items.length;
			newItems[i] = this.items[this.transFormIndex(i)];
		}

		// 扩容完成后指向扩容后的新数组
		this.items = newItems;
		this.first = 0;
		console.log('新数组为：',this.items,'容量为：',this.items.length);
	}
}


let c = new CircleQuene();
c.enQuene(100);
c.enQuene(200);
c.enQuene(300);
c.enQuene(400);
c.enQuene(500);
c.enQuene(600);
c.deQuene();
c.deQuene();
c.enQuene(500);
c.enQuene(600);
c.deQuene();
c.enQuene(700);
c.enQuene(100);
c.enQuene(200);
c.enQuene(300);
c.enQuene(0);
console.log(c.items,c.front());





