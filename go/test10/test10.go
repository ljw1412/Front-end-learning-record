// 结构体
package main

import "fmt"

type Books struct {
	title string
	author string
	subject string
	book_id int
}

func main()  {
	 // 创建一个新的结构体
	fmt.Println(Books{"Go 结构体","ljw1412","Go 语言教程",1})
  // 使用键值对
	fmt.Println(Books{title: "Go 结构体",author:"ljw1412",subject:"Go 语言教程",book_id:1})
 	// 忽略的字段为 0 或 空
	fmt.Println(Books{title: "Go 结构体",author:"ljw1412"})
}