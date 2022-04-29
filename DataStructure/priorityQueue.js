/* 优先级元素的类 */
class PriorityElement {
	constructor(el,priority) {
		this.element = el;
		this.priority = priority;
	}
}

/* 优先级队列的类· */
class PriorityQueue {
	constructor() {
		this.items = [];
	}
	
	/* 1. 添加优先级元素到队列中 */
	enqueue(el,priority){
		// 创建一个优先级元素
		const priorityElement = new PriorityElement(el,priority);
		
		// 如果是第一次处理元素 直接push即可
		if(this.isEmpty()){
			this.items.push(priorityElement);
		}else{
			let isAdded = false;
			for(let i=0;i<this.size();i++){
				// 元素的优先级数越小，这个元素的优先级越高
				if(priorityElement.priority < this.items[i].priority){
					this.items.splice(i,0,priorityElement);
					isAdded = true;
					break;
				}
			}
			
			// 全部遍历之后发现之前队列中每一个元素都比自己的优先级高 就默认插入到队列尾部
			if(!isAdded){
				this.items.push(priorityElement);
			}
		}
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

const priorityQueue = new PriorityQueue();