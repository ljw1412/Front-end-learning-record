// 集合 Map
package main

import "fmt"

func main()  {
	/* 声明变量，默认 map 是 nil */
	// var map_variable map[key_data_type]value_data_type
	/* 使用 make 函数 */
	// map_variable := make(map[key_data_type]value_data_type)

	countryCapitalMap := make(map[string]string)
	/* map插入key - value对,各个国家对应的首都 */
	countryCapitalMap[ "France" ] = "巴黎"
	countryCapitalMap[ "Italy" ] = "罗马"
	countryCapitalMap[ "Japan" ] = "东京"
	countryCapitalMap[ "India" ] = "新德里"

	for country := range countryCapitalMap {
		fmt.Println(country, "的首都是", countryCapitalMap[country])
	}

	capital, ok := countryCapitalMap["America"]

	if(ok){
		fmt.Println("America 的首都是", capital)
	}else{
		fmt.Println("America 的首都不存在")
	}

	/*删除元素*/
	delete(countryCapitalMap, "France")
	fmt.Println("===删除法国===")

	for country := range countryCapitalMap {
		fmt.Println(country, "的首都是", countryCapitalMap[country])
	}
}