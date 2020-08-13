// 条件语句
package main

var a int = 10

func main()  {
	if a < 20 {
		println("a is less than 20")
	}

	println()

	if a > 20 {
		println("a is greater than 20")
	}else{
		println("a is not greater than 20")
	}

	println()

	/*
	switch 语句用于基于不同条件执行不同动作，每一个 case 分支都是唯一的，从上至下逐一测试，直到匹配为止。

	switch 语句执行的过程从上至下，直到找到匹配项，匹配项后面也不需要再加 break。
	*/
	switch a {
		case 10:
			println("a is 10")
		case 20:
			println("a is 20")
	}

	println()

	/*
	switch 默认情况下 case 最后自带 break 语句，匹配成功后就不会执行其他 case，如果我们需要执行后面的 case，可以使用 fallthrough 。
	使用 fallthrough 会强制执行后面的 case 语句，fallthrough 不会判断下一条 case 的表达式结果是否为 true。
	*/
	switch a {
		case 10:
			println("a is 10")
			fallthrough
		case 20:
			println("a is 20")
	}

	println()
	/*
		switch 语句还可以被用于 type-switch 来判断某个 interface 变量中实际存储的变量类型。
	*/
	var x interface{}
	switch t := x.(type) {
		case nil:
			println(" x 的类型 :%T", t)
		case int:
			println("x 是 int 型")
		case float64:
			println("x 是 float64 型")
		case func(int) float64:
			println("x 是 func(int) 型")
		case bool, string:
			println("x 是 bool 或 string 型" )
		default:
			println("未知型")
	}
}