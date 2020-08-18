// 切片
package main

import "fmt"

func main()  {
	// 声明一个未指定大小的数组来定义切片
	// var identifier []type
	// 切片不需要说明长度。
	// 或使用make()函数来创建切片:
	// var slice1 []type = make([]type, len)
	// 也可以简写为
	// slice1 := make([]type, len)
	// 也可以指定容量，其中capacity为可选参数。
	// make([]T, length, capacity)
	// 这里 len 是数组的长度并且也是切片的初始长度。

	// 切片初始化
	// s := [] int {1,2,3}
	// 初始化切片s,是数组arr的引用,将arr中从下标startIndex到endIndex-1 下的元素创建为一个新的切片
	// s = arr[startIndex:endIndex]
	// 默认 endIndex 时将表示一直到arr的最后一个元素
	// s := arr[:endIndex]

	var numbers = make([]int,3,5)
	printSlice(numbers)
	fmt.Println()
	// 切片截取
	arr := []int {0,1,2,3,4,5,6,7,8}
	printSlice(arr)

	fmt.Println("arr ==", arr)

	fmt.Println("arr[1:4] ==", arr[1:4])

	fmt.Println("arr[:3] ==", arr[:3])

	fmt.Println("arr[4:] ==", arr[4:])
	fmt.Println()

	// append() 和 copy() 函数
	var arr2 []int
	printSlice(arr2)
	/* 允许追加空切片 */
	arr2 = append(arr2, 0)
	printSlice(arr2)
	/* 向切片添加一个元素 */
	arr2 = append(arr2, 1)
	printSlice(arr2)
	/* 同时添加多个元素 */
	arr2 = append(arr2, 2, 3, 4)
	printSlice(arr2)

	/* 创建切片 numbers1 是之前切片的两倍容量*/
	numbers1 := make([]int, len(arr2), (cap(arr2))*2)

	/* 拷贝 numbers 的内容到 numbers1 */
	copy(numbers1,arr2)
	printSlice(numbers1)
}

func printSlice(x []int){
	fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}