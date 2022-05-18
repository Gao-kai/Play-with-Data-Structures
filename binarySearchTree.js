/* 封装二叉搜索树节点的类 */
class TreeNode {
	constructor(key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
}

/* 二叉搜索树的类 只需要创建根节点 其他节点都可以通过根节点找到  */
class BinarySearchTree {
	constructor() {
		this.root = null;
		this.size = 0;
	}
	
	/* 向二叉搜索树插入一个新节点 */
	insert(key){
		// 1. 创建新节点
		let newNode = new TreeNode(key);
		
		// 2. 如果这棵树根节点为null
		if(!this.root){
			this.root = newNode;
		}else{
			// 3.如果存在根节点 则递归插入
			BinarySearchTree.insertNode(this.root,newNode)
		}
		
		this.size++;
	}
	
	/* 
		删除二叉搜索树中的一个节点
		1. 先查询要删除的节点
			- 如果没有 那么直接返回false
			- 如果有，那么进行删除
		2. 删除节点
			- 删除的是叶子节点
			- 删除的是一个子节点的节点
			- 删除的是两个子节点的节点
	 */
	remove(key){
		// 如果根节点都没有 直接返回false
		if(!this.root)return false;
		
		// 1. 首先寻找要删除的节点
		let currentNode = this.root; // 当前比较的节点指针
		let parentNode = null; // 父节点指针
		let isLeftNode = true; // 区分删除的节点是父节点的左节点还是右节点
		
		while(currentNode.key !== key){
			parentNode = currentNode;
			// 如果当前节点大于key，则有左查找
			if(currentNode.key > key){
				currentNode = currentNode.left;
				isLeftNode = true;
			}else{
				currentNode = currentNode.right;
				isLeftNode = false;
			}
		}
		
		// 循环结束之后只有两种情况：1.找到要删除的节点了，那么这个节点就是currenNode 2. 没找到 说明压根没有这个节点 返回false即可
		if(!currentNode){
			return false;
		}
		
		// 2. 如果删除的是叶子节点,意味着该节点没有左节点和右节点
		if(!currentNode.left && !currentNode.right){
			// 如果是根节点 直接指向null即可
			if(currentNode == this.root){
				this.root = null;
			}else{
				// 不是根节点 则需要根据当前要删除的节点是父节点的左节点还是右节点来判断
				isLeftNode ? parentNode.left = null : parentNode.right = null;
			}
		}
		
		// 3. 如果删除的是只有一个子节点的节点 并且这个节点只有右子节点
		else if(currentNode.left === null){
			// 如果这个节点是根节点  那么将右子节点设置为根节点
			if(currentNode == this.root){
				this.root = currentNode.right;
			}else{
				// 否则让父节点的左节点指向当前节点的子节点(也就是爷爷节点指向儿子节点)
				let childNode = currentNode.right;
				isLeftNode ? parentNode.left = childNode : parentNode.right = childNode;
			}
		}else if(currentNode.right === null){
			// 如果这个节点是根节点  那么将左子节点设置为根节点
			if(currentNode == this.root){
				this.root = currentNode.left;
			}else{
				// 否则让父节点的右节点指向当前节点的子节点(也就是爷爷节点指向儿子节点)
				let childNode = currentNode.left;
				isLeftNode ? parentNode.left = childNode : parentNode.right = childNode;
			}
		}else{
			// 4. 如果删除的是有两个子节点的节点 那么要寻找前驱节点或者后继节点
			let successor = this.getSuccessorNode(currentNode);
			if(currentNode === this.root){
				this.root = successor;
			}else if(isLeftNode){
				parentNode.left = successor;
			}else{
				parentNode.right = successor;
			}
			successor.left = currentNode.left;
		}
	}
	
	/* 获取整棵二叉树上某个节点的后继节点 */
	getSuccessorNode(delNode){
		// 首先提前设置一些变量存储节点
		let successorParentNode= delNode; // 要删除节点的后继节点的父节点指针
		let successor = delNode; // 要删除的节点的后继节点的指针
		let currentNode = delNode.right; // 要删除的节点的后驱节点只能存在于当前节点的右子树上
		
		while(currentNode){
			successorParentNode = successor;
			successor = currentNode;
			currentNode = currentNode.left;
		}

		/* 
			如果successor节点还有一个右节点 注意不可能还有左节点的情况 因为有左节点就会一直进入到while循环中查找
			此时分为两种情况：
			1. 当前找到的successor节点恰好是要删除节点的右子节点，也就是直接相连的，这种情况无需进行处理，直接将successor把delNode替换即可
			2. 当前找到的successor节点不是要删除节点的右子节点，也就是间接相连的，这种情况需要处理
				+ 让successorParentNode节点的左节点指向successor的右子节点
				+ 
		 */
		if(successor != delNode.right){
			successorParentNode.left = successor.right;
			successor.right = delNode.right;
		}
		
		return successor;
	}
	
	
	/* 实例方法：前序遍历二叉树并打印每一个节点的值 */
	preOrderTraversal(handler){
		BinarySearchTree.preOrderTraversalNode(this.root,handler)
	}
	
	/* 实例方法：中序遍历二叉树并打印每一个节点的值 */
	midOrderTraversal(handler){
		BinarySearchTree.midOrderTraversalNode(this.root,handler)
	}
	
	/* 实例方法：后序遍历二叉树并打印每一个节点的值 */
	postOrderTraversal(handler){
		BinarySearchTree.postOrderTraversalNode(this.root,handler)
	}
	
	/* 获取树节点中的最大值 */
	getMaxKey(){
		if(!this.root)return null;
		let currenNode = this.root;
		while(currenNode.right){
			currenNode = currenNode.right;
		}
		return currenNode.key;
	}
	
	/* 获取树节点中的最小值 */
	getMinKey(){
		if(!this.root)return null;
		let currenNode = this.root;
		while(currenNode.left){
			currenNode = currenNode.left;
		}
		return currenNode.key;
	}
	
	/* 查询二叉树中的某个节点 */
	searchNode(key){
		// 递归
		return BinarySearchTree.searchTreeNode1(this.root,key);
		
		// 循环
		// return BinarySearchTree.searchTreeNode2(this.root,key);
	}
	
	/* 递归：查询二叉树中是否存在某个节点，如果是将节点返回，否则返回false */
	static searchTreeNode1(node,key){
		if(node === null){
			return false
		};
		
		if(node.key < key){
			// 向右查找
			return BinarySearchTree.searchTreeNode1(node.right,key)
		}else if(node.key > key){
			// 向左查找
			return BinarySearchTree.searchTreeNode1(node.left,key)
		}else{
			// 两个值相等 将值返回
			return node;
		}
	}
	
	/* 循环：查询二叉树中是否存在某个节点，如果是将节点返回，否则返回false */
	static searchTreeNode2(node,key){
		
		while(node){
			if(node.key < key){
				node = node.right;
			}else if(node.key > key){
				node = node.left;
			}else{
				return node;
			}
		}
		
		return false;
	}
	
	/**
	 * 私有方法 递归二叉搜索树
	 * @param {TreeNode} currentNode 当前比较的节点
	 * @param {TreeNode} newNode  要插入的新节点
	 */
	static insertNode(currentNode,newNode){
		// 1.如果新节点的值小于当前节点 那么新节点应该插入到当前节点的左子树上
		if(currentNode.key > newNode.key){
			if(currentNode.left == null){
				currentNode.left = newNode;
			}else{
				BinarySearchTree.insertNode(currentNode.left,newNode);
			}
		}else if(currentNode.key < newNode.key){
			// 2. 如果新节点的值大于当前节点 那么新节点应该插入到当前节点的右子树上
			if(currentNode.right == null){
				currentNode.right = newNode;
			}else{
				BinarySearchTree.insertNode(currentNode.right,newNode);
			}
		}else{
			// 3. 如果两个节点的值相等 那么代表二叉树上已经存在节点 直接return
			return false;
		}
	}
	
	/**
	 * 	前序遍历二叉搜索树:先处理根节点就叫做前序 可以看做每次先处理的都是子树的根节点
	 *  1. 访问根节点
	 *  2. 先序遍历其左子树
	 *  3. 先序遍历其右子树
	 *  @param {TreeNode} node 当前遍历的节点
	 *  @param {Function} handler 遍历到当前节点后执行的函数 
	 */
	static preOrderTraversalNode(node,handler){
		if(node){
			// 打印当前节点的key值
			handler(node.key);
			// 首先递归遍历当前左子树上的所有节点
			BinarySearchTree.preOrderTraversalNode(node.left,handler);
			// 递归遍历当前右子树上的所有节点
			BinarySearchTree.preOrderTraversalNode(node.right,handler);
		}
	}
	
	/**
	 * 	中序遍历二叉搜索树:中间处理根节点就叫做中序
	 *  1. 中序遍历其左子树
	 *  2. 访问根节点
	 *  3. 中序遍历其右子树
	 *  @param {TreeNode} node 当前遍历的节点
	 *  @param {Function} handler 遍历到当前节点后执行的函数 
	 */
	
	static midOrderTraversalNode(node,handler){
		if(node){
			// 首先递归遍历当前左子树上的所有节点
			BinarySearchTree.midOrderTraversalNode(node.left,handler);
			// 打印当前节点的key值
			handler(node.key);
			// 递归遍历当前右子树上的所有节点
			BinarySearchTree.midOrderTraversalNode(node.right,handler);
		}
	}
	
	/**
	 * 	后序遍历二叉搜索树:最后处理根节点就叫做中序
	 *  1. 后序遍历其左子树
	 *  2. 后序遍历其右子树
	 *  3. 访问根节点
	 *  @param {TreeNode} node 当前遍历的节点
	 *  @param {Function} handler 遍历到当前节点后执行的函数 
	 */
	
	static postOrderTraversalNode(node,handler){
		if(node){
			// 首先递归遍历当前左子树上的所有节点
			BinarySearchTree.postOrderTraversalNode(node.left,handler);
			// 递归遍历当前右子树上的所有节点
			BinarySearchTree.postOrderTraversalNode(node.right,handler);
			// 打印当前节点的key值
			handler(node.key);
		}
	}
	
	
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(9);
bst.insert(15);
bst.insert(21);
bst.insert(18);
console.log(bst);
bst.preOrderTraversal(console.log);
bst.midOrderTraversal(console.log);
bst.postOrderTraversal(console.log);
bst.getMaxKey();
bst.getMinKey();
bst.searchNode(9)

