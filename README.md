#### node - express 日志中间件

##### install
    npm install node-server-log --save

##### using:

   	var express = require('express');
	var app = new express();
	var log = require('node-server-log');
	app.use(log());
	
	resul: 2017/09/28 18:03:14 - 2ms - GET - 200 - /test - {}

##### params:
	
    params: exinclude, formdate

	1.log({}, "YYYY/mm/dd HH:MM:SS")
	2.log({}, {
		format: "YYYY/mm/dd HH:MM:SS",
		timeZone: 0
	})
	
	format: 输出日志日期格式
	timeZone: 时区差值
	
##### format:
	
	YYYY: getFullYear
	mm: getMonth
	dd: getDate
	HH: getHours
	MM: getMinutes
	SS: getSeconds
	
	例:
		"YYYY-mm-dd-HH/MM/SS"
		"YYYY/dd HH:MM"
	
	默认: 
		"YYYY/mm/dd HH:MM:SS"
		
		
##### Be careful
	1.可以调节时区,但是日期进制不会转换
		例:
			32 不会自动月份+1
	2.可以传入自定义格式,但是中间分隔只能使用一位自定义字符
		例: 
			YYYY-mm-dd 有效
			YYYY--mm--dd 无效
		
		
		
