// 循环语句
package main

func main() {
	a := 0
	for true {
		a++
		println(a)
		if a >= 1000 { break }
	}

	println()

	for i:= 1; i <= 3; i++{
		println(i)
	}

	println()

	sum := 1
	for sum <= 10 {
		sum += sum
	}
	println(sum)

	println()

	/*
		For-each range 循环
		这种格式的循环可以对字符串、数组、切片等进行迭代输出元素。
	*/
	strings := []string{"a","b","c"}
	for i, s := range strings {
		println(i, s)
	}
}