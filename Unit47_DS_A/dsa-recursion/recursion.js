/** product: calculate the product of an array of numbers. */

//[1,2,3,4] => 24
function product(nums, i = 0) {
	if (i === nums.length) return 1;

	return nums[i] * product(nums, i + 1);
}

/** longest: return the length of the longest word in an array of words. */
//["hello", "hi", "hola"]
function longest(words, currLongWord = words[0], i = 0) {
	if (i === words.length) return currLongWord.length;

	if (words[i].length > currLongWord.length) {
		currLongWord = words[i];
	}
	return longest(words, currLongWord, i + 1);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, res = str[0], i = 1) {
	if (i === str.length) return res;

	if (i % 2 === 0) {
		res += str[i];
	}
	return everyOther(str, res, i + 1);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

//[0, -1], [1, -2], [2, -3], [3, -4] => relationship is +1 then reverse sign
//'tacocat' => str[3] length = 7 so str[6] should be compared to str[0] and str[1] === str[5] 7-1-1 = 5
function isPalindrome(str, i = 0) {
	let leftIdx = i;
	let rightIdx = str.length - i - 1;
	if (leftIdx >= rightIdx) {
		return true;
	}
	if (str[leftIdx] !== str[rightIdx]) {
		return false;
	}
	return isPalindrome(str, i + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
	//base case has 2 return possibiliites: -1 or idx
	if (arr[idx] === val) return idx;
	if (idx === arr.length) return -1;
	//recursive case
	return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, currStr = '', idx = 0) {
	let unqIdx = str.length - idx - 1;
	currStr += str[unqIdx];
	//base case
	if (str.length - 1 === idx) return currStr;
	//recursive case
	return revString(str, currStr, idx + 1);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
	let strArr = [];
	for (let key in obj) {
		if (typeof obj[key] === 'string') strArr.push(obj[key]);
		if (typeof obj[key] === 'object') strArr.push(...gatherStrings(obj[key]));
	}
	return strArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, idx = 0) {
	//base case
	//base case has 2 possible return values: -1 or the idx
	if (arr.length === idx) return -1;
	if (arr[idx] === val) return idx;
	//recursive case
	return binarySearch(arr, val, idx + 1);
}

module.exports = {
	product,
	longest,
	everyOther,
	isPalindrome,
	findIndex,
	revString,
	gatherStrings,
	binarySearch
};
