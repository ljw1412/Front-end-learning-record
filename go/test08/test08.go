// 数组
package main

var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}

var balance2 = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0, 0.0}


func main(){
	println(len(balance))
	println(len(balance2))
}