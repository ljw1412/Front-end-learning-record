package main

import "fmt"

func main() {
	// 第一种，指定变量类型，如果没有初始化，则变量默认为零值。
	//零 值就是变量没有做初始化时系统默认设置的值。
	var name string = "ljw1412"
	// 根据值自行判定变量类型。
	var isLogin = true
	// 省略 var, 注意 := 左侧如果没有声明新的变量，就产生编译错误
	text := "Hi!"
	fmt.Println("登录状态:", isLogin)
	fmt.Println(text, name)
}