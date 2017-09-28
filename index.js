
// format
/*
	params: 
		1. 传递字符串: YYYY/mm/dd HH:MM:SS
		2: 传递对象: {
			format: YYYY/mm/dd HH:MM:SS,
			timeZone: 8
		}

	输出日期格式化:
		Y: 年
		m: 月
		d: 日

		H: 时
		M: 分
		S: 秒

	注:
		1.可以调节时区,但是日期进制不会转换
			例:
				32 不会自动月份+1
		2.可以传入自定义格式,但是中间分隔只能使用一位自定义字符
			例: 
				YYYY-mm-dd 有效
			    YYYY--mm--dd 无效
	
*/

// 默认返回日期格式
const DEFAULT = "YYYY/mm/dd HH:MM:SS";

// 生成参数值
const getV = function(o, f, v = 0){
	let t;
	return (t = o[f]() + v) > 9 ? t : "0" + t;
};

// 根据格式生成结果
const generateFormat = function(seq, s){
	let reg = /^(\w+)?(.)?(\w+)?(.)?(\w+)?(.)?(\w+)?(.)?(\w+)?(.)?(\w+)?$/;
	let resul = s.match(reg);
	let f
		r = '';
	if(resul && resul.length > 0){
		f = resul.filter(function(v, i){
			return !!v && i != 0;
		});
	}
	for(let i=0, l=f.length; i<l; i+=2){
		let key = f[i],
			sp = f[i+1] || '';
		r += (seq[key] + sp);
	}
	return r;
};

const formatDate = function (params){
	let o = new Date();
	let s;
	let seq = {
		"YYYY": getV(o, "getFullYear"),
		"mm": getV(o, "getMonth", 1),
		"dd": getV(o, "getDate"),
		"HH": getV(o, "getHours"),
		"MM": getV(o, "getMinutes"),
		"SS": getV(o, "getSeconds"),
	};
	if(typeof params === "string"){
		s = params;
	}else if(Object.prototype.toString.call(params) === "[object Object]"){
		let { format, timeZone = 0 } = params;
		s = format;
		seq.HH += timeZone;
		// 暂时这里不做日期回算处理
		let f = Math.floor(seq.HH / 24);
		let y = seq.HH % 24;
		if(f > 0){
			seq.HH = y;
			seq.dd += f;
		}
		if(seq.HH < 0){
			seq.HH = Math.abs(y);
			seq.dd += f;
		}
	}else{
		throw new Error("arguments type error, please check the document !");
	}
	return [generateFormat(seq, s), o.getTime()];
};

module.exports = function (params = {format: DEFAULT, timeZone: 0}){
	return function(req, res, next){
		let end = res.end;
		let [s, t] = formatDate(params);
		res.end = function(){
			let aResul = [
				s,
				`${new Date().getTime() - t}ms`,
				req.method,
				res.statusCode,
				req.path,
				JSON.stringify(req.body || {})
			];
			let resul = aResul.filter(function(v){return !!v;}).join(" - ");
			end.call(res, ...arguments);
			console.log(resul);
		};
		next();
	};
};




