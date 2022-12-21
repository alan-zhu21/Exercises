/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinaryTree {
	constructor(root = null) {
		this.root = root;
	}

	/** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

	minDepth() {
		//create a helper function that uses DFS algo to count number of links
		//go through the tree, DFS style, until terminates. Return counts
		//use recursion to go through all the nodes until it terminates
		//root left left, returns as 3; root left right, left, returns 4; root right, returns 2
		if (!this.root) return 0;

		function traverseCount(node, count) {
			//base case
			if (!node.left && !node.right) return count; //we've hit a leaf node
			//recursion case
			if (node.left) return traverseCount(node.left, count + 1);
			if (node.right) return traverseCount(node.right, count + 1);
		}
		return traverseCount(this.root, 1);
	}

	/** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

	maxDepth() {
		if (!this.root) return 0;
		//traverse through tree,
		function traverseCount(node, count) {
			//base case
			if (!node.left && !node.right) return count; //we've hit a leaf node
			//recursion case
			if (node.left) return traverseCount(node.left, count + 1);
			if (node.right) return traverseCount(node.right, count + 1);
		}

		return Math.max(traverseCount(this.root.left, 1), traverseCount(this.root.right, 1)) + 1;
	}

	/** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

	maxSum() {
		let result = 0;

		function maxSumHelper(node) {
			if (!node) return 0;
			let leftSum = maxSumHelper(node.left);
			let rightSum = maxSumHelper(node.right);
			result = Math.max(result, node.val + leftSum + rightSum);
			return Math.max(0, leftSum + node.val, rightSum + node.val);
		}
		maxSumHelper(this.root);
		return result;
	}

	/** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

	nextLarger(lowerBound) {
		if (!this.root) return null;
		const nodes = [];

		function nextLargerHelper(node) {
			let leftNode = node.left || new BinaryTreeNode(0);
			let rightNode = node.right || new BinaryTreeNode(0);
			nodes.push(node);
			nodes.push(leftNode);
			nodes.push(rightNode);
			if (node.left.left !== null || node.left.right !== null) {
				return nextLargerHelper(node.left);
			}
			if (node.right.left !== null || node.right.right !== null) {
				return nextLargerHelper(node.right);
			}
		}
		nextLargerHelper(this.root);
		let valsGreater = nodes.filter((node) => node.val > lowerBound);
		function compare(a, b) {
			if (a.val < b.val) {
				return -1;
			}
			if (a.val > b.val) {
				return 1;
			}
			return 0;
		}
		if (valsGreater.length > 0) return valsGreater.sort(compare)[0].val;
		return null;
	}

	//FURTHER STUDY SECTION BELOW

	/** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

	areCousins(node1, node2) {}

	/** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

	static serialize() {}

	/** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

	static deserialize() {}

	/** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

	lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
