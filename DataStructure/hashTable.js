/**
 * 将字符串转化为固定范围的数组下标的哈希算法
 * @param str 要被哈希化的字符串
 * @param size 哈希表的长度    
 */
function hashFn(str, size) {
	// 声明初始化底数常量和变量hashCode
	let hashCode = 0;
	let BASE_NUMBER = 27;

	// 霍纳法则计算哈希值
	for (let i = 0; i < str.length; i++) {
		hashCode = BASE_NUMBER * hashCode + str.charCodeAt(i);
	}

	// 取模运算压缩至哈希表长度大小
	let index = hashCode % size;

	return index;
}

/* 
	普通判断一个正整数是质数
	质数：大于1的自然数中只能被1和自身整除的数
 */
function isPrime1(num) {
	for (let i = 2; i < num; i++) {
		if (num % i === 0) {
			return false;
		}
	}
	return true;
}




class HashTable {
	constructor(limit) {
		this.storage = []; // 存放桶的外层数组
		this.count = 0; // 当前哈希表中存放的数据个数
		this.limit = limit; // 当前哈希表的长度
	}

	/* 插入元素和修改元素 */
	put(key, value) {
		// 首先通过哈希函数获取key对应的index
		let index = hashFn(key, this.limit)

		// 取出桶
		let bucket = this.storage[index];

		// override判断桶中元素是否修改的标志位
		let override = false;

		// 如果取出的桶为空 代表这是一个空白单元 需要新建桶 然后将元素添加进去
		if (bucket === undefined) {
			bucket = [];
			this.storage[index] = bucket;
		} else {
			// 如果取出不为空 那么就再次遍历桶找key相等的元素，如果找到就替换，找不到就新增进去
			for (let i = 0; i < bucket.length; i++) {
				let tuple = bucket[i];
				if (tuple[0] === key) {
					tuple[1] = value;
					override = true;
				}
			}
		}

		// 全部遍历完成之后override还为false 代表当前桶中没有key一样的元素 所以要新增
		if (!override) {
			bucket.push([key, value]);
			this.count++;
		}


		// 每次添加完成之后计算当前哈希表的填充因子loadFactor  如果loadFactor>0.75 那么需要扩容一倍
		let loadFactor = this.count / this.limit;
		if (loadFactor > 0.75) {
			let newSize = this.getPrime(2 * this.limit);
			this.resize(newSize);
		}
	}

	/* 删除元素 */
	delete(key) {
		let index = hashFn(key, this.limit)
		let bucket = this.storage[index];
		if (bucket === undefined) {
			return null;
		} else {
			for (let i = 0; i < bucket.length; i++) {
				let tuple = bucket[i];
				if (tuple[0] === key) {
					// 找到对应的key的元素 使用splice方法删除 并将删除的值返回 同时长度-1
					bucket.splice(i, 1);
					this.count--;

					// 每次删除完成之后计算当前哈希表的填充因子loadFactor  如果loadFactor<0.25并且当前limit大于最小的长度的时候 那么需要减容
					let loadFactor = this.count / this.limit;
					let minSize = 1000;
					if (loadFactor < 0.25 && this.limit > minSize) {
						let newSize = this.getPrime(this.limit / 2);
						this.resize(Math.floor(newSize));
					}
					return tuple[1];
				}
			}
			// 遍历完成之后还没有删除 那么返回null
			return null;
		}
	}

	/* 查询元素  */
	get(key) {
		let index = hashFn(key, this.limit)
		let bucket = this.storage[index];
		// 查到桶为空直接返回false 
		if (bucket === undefined) {
			return null;
		} else {
			for (let i = 0; i < bucket.length; i++) {
				let tuple = bucket[i];
				if (tuple[0] === key) {
					return tuple[1];
				}
			}
			return null;
		}
	}

	/* 判断是否为空 */
	isEmpty() {
		return this.count === 0;
	}

	/* 获取哈希表中元素的个数 */
	size() {
		return this.count;
	}

	/* 对哈希表进行扩容或者缩容 */
	resize(newLimit) {
		// 保存原来旧的哈希表数据
		let oldStorage = this.storage;

		// 重置新的哈希表的属性
		this.storage = [];
		this.count = 0;
		this.limit = newLimit;

		// 遍历旧的哈希表 放入新的哈希表
		for (let i = 0; i < oldStorage.length; i++) {
			if (oldStorage[i] === undefined) {
				continue;
			}
			let bucket = oldStorage[i];
			for (let j = 0; j < bucket.length; j++) {
				let tuple = bucket[j];
				// 重新计算index后存入新的哈希表
				this.put(tuple[0], tuple[1])
			}
		}
	}
	
	/*
		高效判断一个正整数是质数
		规定如果一个数可以被进行因数分解，那么两个因子其中一个一定小于等于这个数的平方根，另外一个一定大于等于这个数的平方根
		如果除了1之外，小于等于这个数的平方根的若干个数中找不到可以被这个数整除的，那么这个数就是质数。
	 */
	isPrime2(num) {
		let sqrt = parseInt(Math.sqrt(num));
		for (let i = 2; i < sqrt; i++) {
			if (num % i === 0) {
				return false;
			}
		}
		return true;
	}
	
	/*
		寻找一个非质数最接近的一个质数，目的是为了实现哈希表容量为质数 更加均匀的发布元素
	 */
	function getPrime(num) {
		if(isPrime2(num)){
			return num;
		}
		while (!isPrime2(num)) {
			num++;
		}
		return num;
	}
	
	
	
}

const hashtab = new HashTable(100);
hashtab.put('tom', 100)
hashtab.put('tony', 200)
hashtab.put('lily', 300)
hashtab.put('jim', 500)
hashtab.put('tom', 2000)
