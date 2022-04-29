/* 
	1. 每一个节点都得具有可比较性
 */
function Node(value){
	this.value = value;
	this.left = null;
	this.right = null;
}

/* 定义二分搜索树的类 */
class BST {
	constructor(value){
		let node = new Node(value);
		this.root = node;
		this.size = 0;
	}
	
	size(){
		return this.size;
	}
	
	isEmpty(){
		return this.size === 0;
	}
}

/* 集合和映射 Set and Map
 
 */

function Set(){
	
	this.add = function(el){
		
	}
	
	this.remove = function(el){
		
	}
	
	this.contains = function(el){
		
	}
	
	this.getSize = function(){
		
	}
	
	this.isEmpty = function(){
		
	}
}