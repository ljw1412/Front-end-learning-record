// 函数
package main

import(
	"fmt"
	"math"
)

func main()  {
	a := 100
	b := 200
	var ret int

	ret = max(a, b)

	fmt.Printf("max number: %d\n", ret)

	x, y := swap("x", "y")
	fmt.Println(x, y)

	/* 声明函数变量 */
	getSquareRoot := func(x float64) float64 {
		return math.Sqrt(x)
	}

	/* 使用函数 */
	fmt.Println(getSquareRoot(9))

	add20 := add(20)
	add30 := add(30)
	fmt.Println(add20(10))
	fmt.Println(add30(10))
}

func max(num1,num2 int) int {
	if (num1 > num2){
		return num1
	} else {
		return num2
	}
}

func swap(x, y string) (string, string){
	return y, x
}

// Go 语言支持匿名函数，可作为闭包。匿名函数是一个"内联"语句或表达式。匿名函数的优越性在于可以直接使用函数内的变量，不必申明。
func add(num int) func(n int) int {
	return func(n int) int {
		return n + num
	}
}