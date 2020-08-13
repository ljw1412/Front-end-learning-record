// 指针
package main

import "fmt"

func main(){
	a := 10
	var ip *int

	ip = &a

	fmt.Printf("变量的地址: %x\n", &a )

	/* 指针变量的存储地址 */
	fmt.Printf("ip 变量储存的指针地址: %x\n", ip )

	/* 使用指针访问值 */
	fmt.Printf("*ip 变量的值: %d\n", *ip )

	/*
	当一个指针被定义后没有分配到任何变量时，它的值为 nil。
	nil 指针也称为空指针。
	nil在概念上和其它语言的null、None、nil、NULL一样，都指代零值或空值。
	一个指针变量通常缩写为 ptr。
	*/
	var  ptr *int
	fmt.Printf("ptr 的值为 : %x %t\n", ptr , ptr == nil )
}