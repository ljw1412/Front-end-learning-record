// 常量
package main

import "unsafe"

const name = "ljw1412"

const (
	a = "abc"
	b = len(a)
	c = unsafe.Sizeof(a)
)

func main() {
	println(name, a, b, c)
}