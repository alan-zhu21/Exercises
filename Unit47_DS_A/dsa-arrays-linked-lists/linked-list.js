/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push(val) {
		// create new node, find the tail, set tail's current node's next prop to the new node, and assign new tail to new node
		// need to account for empty list, single item list, 2 item list, and 3 or more item list
		let newNode = new Node(val);
		// identify type of list
		if (this.length === 0) {
			this.head = newNode;
			this.tail = newNode;
		} else if (this.length === 1) {
			this.head.next = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length += 1;
		return undefined;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		// create new node, set the new node's next prop to the old head node, then set the head to the new node
		// again, we need to account for lists with various lengths: empty, 1 item, multiple item
		let newNode = new Node(val);
		if (this.length === 0) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head = newNode;
		}
		this.length += 1;
		return undefined;
	}

	/** pop(): return & remove last item. */

	pop() {
		// set the tail to a new variable, set the tail to the node right before the tail, return the new variable
		let removedNode;
		if (this.head === null) {
			throw e;
		} else if (this.head === this.tail) {
			removedNode = this.tail.val;
			this.head = null;
			this.tail = null;
		} else {
			removedNode = this.tail.val;
			let traverseNtimes = this.length - 2; //head node and tail node are not counted
			let curr_node = this.head;
			while (traverseNtimes > 0) {
				curr_node.next;
				traverseNtimes -= 1;
			}
			curr_node.next = null;
			this.tail = curr_node;
		}
		this.length -= 1;
		return removedNode;
	}

	/** shift(): return & remove first item. */

	shift() {
		// set the head to a new variable, set the head to the next node, and return the new variable
		let removedNode = this.head;
		this.head = this.head.next; // will naturally throw error if empty list
		if (this.length === 1) {
			this.tail = null;
		}
		this.length -= 1;
		return removedNode.val;
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		// loop through vals until idx is correct, then return val
		if (idx > this.length || idx < 0) {
			throw e;
		}
		let currentNode = this.head;
		while (idx > 0) {
			currentNode = currentNode.next;
			idx -= 1;
		}
		return currentNode.val;
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		// loop through vals until correct idx, then set node to val
		if (idx > this.length || idx < 0) {
			throw e;
		}
		let currentNode = this.head;
		while (idx > 0) {
			currentNode = currentNode.next;
			idx -= 1;
		}
		currentNode.val = val;
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		// create new node, loop through vals until correct idx, get node before idx to point to new node, get new node to point to next node
		let newNode = new Node(val);
		let currentNode = this.head;
		if (idx > this.length || idx < 0) {
			throw e;
		} else if (idx === 0) {
			this.head = newNode;
			this.tail = newNode;
			this.length += 1;
			return undefined;
		} else if (idx === this.length && this.length > 2) {
			this.tail = newNode;
		}
		while (idx > 1) {
			currentNode = currentNode.next;
			idx -= 1;
		}
		newNode.next = currentNode.next;
		currentNode.next = newNode;
		this.length += 1;
		return undefined;
	}
	// [n1, n2, , n3, n4] l[2] 0, 1, 2 2-1 [0, 1, 2]
	// situations: first idx, any other idx

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		// loop through vals until correct idx, get previous node to point to next node
		let removedNode;
		let currentNode = this.head;
		if (idx > this.length || idx < 0) {
			throw e;
		} else if (idx === 0) {
			removedNode = this.head;
			this.head = null;
			this.tail = null;
			this.length -= 1;
			return removedNode.val;
		} else if (idx === this.length && this.length > 2) {
			while (idx > 1) {
				currentNode = currentNode.next;
				idx -= 1;
			}
			currentNode.next = null;
			this.tail = currentNode;
		}
		while (idx > 1) {
			currentNode = currentNode.next;
			idx -= 1;
		}
		currentNode.next = removedNode.next;
		this.length -= 1;
		return undefined;
	}

	/** average(): return an average of all values in the list */

	average() {
		if (this.length === 0) {
			return 0;
		}
		let vals = [];
		let currentNode = this.head;
		while (currentNode.next !== null) {
			vals.push(currentNode.val);
			currentNode = currentNode.next;
		}
		vals.push(currentNode.val);
		console.log(vals);
		return vals.reduce((preVal, currVal) => preVal + currVal) / this.length;
	}
}

module.exports = LinkedList;
