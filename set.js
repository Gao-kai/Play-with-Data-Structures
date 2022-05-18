/* 
	Set类的封装思路：
	1. 使用一个items对象来保存集合的元素
	2. JS中的对象的keys属性天生就是一个集合
	3. 集合的增删改查方法
	4. 集合的并交差子集
 */

class Set {
	constructor() {
		// 集合的属性
	    this.items = {};
	}
	
	/* 向集合中添加一个元素 */
	add(value){
		// 先判断集合中是否已经存在新增的元素，如果已经存在 直接返回false
		if(this.has(value))return false;
		
		// 如果不存在 那么执行添加操作 返回true
		this.items[value] = value; // key和value相等
		return true;
	}
	
	/* 从集合中移除一个元素 */
	remove(value){
		// 先判断集合中是否已经存在要删除的元素，如果不存在 直接返回false
		if(!this.has(value)) return false;
		
		// 如果包含 执行删除操作 返回true
		delete this.items[value];
		return true;
	}
	
	/* 判断某个值是否存在于集合中 */
	has(value){
		return this.items.hasOwnProperty(value);
	}
	
	/* 移除集合中的所有项 */
	clear(){
		this.items = {};
	}
	
	/* 返回集合包含元素的数量 */
	size(){
		return Object.keys(this.items).length;
	}
	
	/* 返回一个包含集合中所有值的数组 */
	values(){
		return Object.keys(this.items);
	}
	
	/* 并集操作 this代表集合A otherSet代表集合B */
	union(otherSet){
		let unionSet = new Set();
		
		// 1.遍历A集合中元素 将其添加到新的集合中
		for(let value of this.values()){
			unionSet.add(value);
		}
		
		// 2. 遍历B集合中元素 如果已经存在 就取消本次添加 如果不存在
		for(let value of otherSet.values()){
			if(!unionSet.has(value)){
				unionSet.add(value);
			}
		}
		
		return unionSet;
	}
	
	/* 交集操作 判断集合A中的元素是否存在于集合B中 如果是就添加 否则跳过*/
	interSection(otherSet){
		let intersectionSet = new Set();
		
		for(let value of this.values()){
			if(otherSet.has(value)){
				intersectionSet.add(value);
			}
		}
		
		return intersectionSet;
	}
	
	/* 差集操作 判断集合A中的元素是否不存在于集合B中 如果不存在才添加 否则跳过 */
	difference(otherSet){
		let differenceSet = new Set();
		
		for(let value of this.values()){
			if(!otherSet.has(value)){
				differenceSet.add(value);
			}
		}
		
		return differenceSet;
	}
	
	/* 子集判断 判断A集合是否为B集合的子集 */
	isSubset(otherSet){
		for(let value of this.values()){
			if(!otherSet.has(value)){
				return false;
			}
			return true;
		}
	}
}

const set1 = new Set();
set1.add(100);
set1.add(200);
set1.add(300);

const set2 = new Set();
set2.add(100);
set2.add(200);
set2.add(300);
set2.add(400);
set2.add(500);

