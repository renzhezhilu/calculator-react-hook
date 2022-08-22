import JSZip from "@/js/module/jszip.min";
import FileSaver from "@/js/module/FileSaver.min";
import dayjs from "dayjs"
// console.log(FileSaver);
export default {
	// 节流
	//   tool.throttle.run(() => {
	//     console.log(`Button 运行`);
	// }, 600);
	throttle: {
		val: null,
		run(fn, ms = 600) {
			clearTimeout(this.val);
			this.val = setTimeout(() => {
				fn();
			}, ms);
		},
	},
	// 防抖
	debounce(func, wait, immediate) {
		let timeout;
		return function () {
			let context = this,
				args = arguments;
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			}, wait);
			if (callNow) func.apply(context, args);
		}
	},
	// 字符大小
	getTextSize(text) {
		let size = new Blob([text]).size
		let getFileSize = (size) => {
			// 1000 Kb
			if (size < 999 * 1000) {
				return (size / 1000).toFixed(1) + ' Kb'
			}
			// 10 Mb
			else {
				return (size / 1000 / 1000).toFixed(1) + ' Mb'
			}
		}
		return getFileSize(size)
	},
	// 格式化24小时时间格式
	formateTime(time, fix = 1) {
		const h = parseInt(time / 3600);
		const minute = parseInt((time / 60) % 60);
		const second = (time % 60).toFixed(fix) - 0;
		// const second = Math.ceil(time % 60);
		// const second = Math.floor(time % 60);
		const hours = h < 10 ? "0" + h : h;
		const formatSecond = second > 59 ? 59 : second;
		return `${hours > 0 ? `${hours}:` : ""}${minute < 10 ? "0" + minute : minute
			}:${formatSecond < 10 ? "0" + formatSecond : formatSecond}`;
	},
	range(start, end) {
		new Array(end - start).fill(start).map((el, i) => start + i)
	},

	// 生成n位长度的字符串
	randomString(n = 10) {
		let str = "abcdefghijklmnopqrstuvwxyz";
		let result = "";
		for (let i = 0; i < n; i++) {
			result += str[parseInt(Math.random() * str.length)];
		}
		return result;
	},
	// 生成复杂id
	createId() {
		return this.randomString(20) + '_' + (new Date().getTime() + '').substring(8)
	},
	createIdNum(num = 8) {
		return (new Date().getTime() + '').substring(num)
	},
	// 通过名称删除
	deleteByName(arr, fun) {
		arr.splice(arr.findIndex(fun), 1)
	},
	// 通过名称替换
	replaceByName(arr, item, fun) {
		arr.splice(arr.findIndex(fun), 1, item)
	},
	// 复制文本
	copyToClip(content) {
		let aux = document.createElement("input");
		aux.setAttribute("value", content);
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		document.body.removeChild(aux);
	},
	// 睡眠
	sleep(timeout) {
		return new Promise((res, rej) => {
			setTimeout(() => {
				res()
			}, timeout);
		})

	},
	//获取后缀名
	suffix(name) {
		return name.substr(name.lastIndexOf(".") + 1).toLowerCase();
	},
	//获取文件名
	fileName(name) {
		return name.substr(0, name.lastIndexOf("."));
	},
	// 缩略文件名
	minNmae(name, len = 40) {
		let full = this.fileName(name)
		if (full.length > len) {
			full = full.substring(0, len - 6) + '...' + full.substring(full.length - 5, full.length)
		}
		let af = this.suffix(name)
		if (af) af = '.' + af
		return full + af
	},

	// 后几位文件名
	endNmae(name, len = 4) {
		let full = this.fileName(name)
		let af = full.substring(full.length - len, full.length)
		return af
	},
	// 后几位之前的文件名
	startNmae(name, len = 4) {
		let full = this.fileName(name)
		let af = full.substring(0, full.length - 4)
		return af
	},

	// 文件大小
	getFileSize(size) {
		// 1000 Kb
		if (size < 999 * 1000) {
			return (size / 1000).toFixed(1) + 'KB'
		}
		// 10 Mb
		else {
			return (size / 1000 / 1000).toFixed(1) + 'MB'
		}
	},

	// 计算尺寸变换
	computeWidthHeight(inWidth, inHeight, outWidth, outHeight, scale = 1) {
		let w, h
		if (outWidth && outHeight) {
			w = outWidth
			h = outHeight
		} else if (outWidth) {
			w = outWidth
			h = w / inWidth * inHeight
		} else if (outHeight) {
			h = outHeight
			w = h / inHeight * inWidth
		} else {
			w = inWidth * scale
			h = inHeight * scale
		}
		w = (w - 0).toFixed(0)
		h = (h - 0).toFixed(0)
		return {
			w,
			h
		}
	},
	computeWhRatio(m, n) {
		// 精度：100以上
		function gys(m, n) {
			return m % n == 0 ? (n) : (gys(n, m % n));
		}
		function start(m, n, count = 0) {
			let ss = gys(m, n)
			console.log(ss);
			if (ss === 1) {
				if (m <= 10 || n <= 10) {
					if (count >= 2) {
						return `≈${m}:${n}`
					} else {
						return `${m}:${n}`
					}
				} else {
					let p1 = ((m / 10).toFixed(0) - 0)
					let p2 = ((n / 10).toFixed(0) - 0)
					return start(p1, p2, count + 1)
				}
			}
			else {
				return start(m / ss, n / ss, count + 1)
			}
		}
		let llll = start(m, n)
		return llll
	},
	// 计算前后百分比对比
	beforeAfter(be, af) {
		let n = 0 - ((be - af) / be * 100)
		return n.toFixed(0) - 0

	},
	// 计算时间差
	timeDiffOfSeconds(newTime, oldTime) {
		return ((newTime - oldTime) / 1000).toFixed(1)
	},
	// 
	fetchUrl(url, type = 'blob') {
		return new Promise((resolve, reject) => {
			switch (type) {
				case 'blob':
					fetch(url).then(d => d.blob()).then(d => resolve(d)).catch(_ => resolve(null))
					break;
				default:
					break;
			}
		});

	},
	// 
	arrayBufferToBlob(buffer, type) {
		return new Blob([buffer], {
			type: type
		});
	},
	blobToArrayBuffer(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.addEventListener('loadend', (e) => {
				resolve(reader.result);
			});
			reader.addEventListener('error', reject);
			reader.readAsArrayBuffer(blob);
		});
	},
	blobToText(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.addEventListener('loadend', (e) => {
				resolve(reader.result);
			});
			reader.addEventListener('error', reject);
			reader.readAsText(blob);
		});
	},
	blobToBase64(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.addEventListener('loadend', (e) => {
				resolve(reader.result);
			});
			reader.addEventListener('error', reject);
			reader.readAsDataURL(blob);
		});
	},
	base64StrOrUrlToOther(base64, type = 'blob') {
		// arrayBuffer blob formData json text
		return new Promise((resolve, reject) => {
			fetch(base64).then(d => d[type]()).then(d => {
				resolve(d)
			})
		});
	},

	// ArrayBuffer转字符串
	arrayBufferToString(buf) {
		return String.fromCharCode.apply(null, new Uint16Array(buf));
	},
	// 字符串转ArrayBuffer
	StringToArrayBuffer(str) {
		let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
		let bufView = new Uint16Array(buf);
		for (let i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	},
	// ArrayBuffer转原始数值字符串
	StringToInt16ArrayText(str) {
		let intVal = this.StringToArrayBuffer(str)
		intVal = [...new Int16Array(intVal)]
		intVal.reverse()
		intVal = intVal.map(m => this.decimalToAny(m, 5))
		intVal = intVal.join('-')
		return intVal
	},
	// 原始数值字符串转ArrayBuffer
	int16ArrayTextToString(text) {
		let textVal = text.split('-')
		textVal = textVal.map(m => this.anyToDecimal(m, 5))
		textVal.reverse()
		textVal = new Int16Array(textVal).buffer
		textVal = this.arrayBufferToString(textVal)
		return textVal
	},
	// 任意进制之间转换
	decimalToAny(num, out) {
		return parseInt(num, 10).toString(out)
	},
	anyToDecimal(num, out) {
		return parseInt(num, out).toString(10) - 0
	},
	// 是否苹果设备
	isApple() {
		let userAgent = navigator.userAgent.toLowerCase()
		let isMac = userAgent.includes('mac os')
		if (isMac) {
			return true
		} else return false
	},
	// 是否支持webp
	isSupportFormatWebp() {
		return new Promise((res, rej) => {
			let _img = new Image();
			_img.src = `data:image/webp;base64,UklGRlYCAABXRUJQVlA4WAoAAAAgAAAAAAAAAAAASUNDUBgCAAAAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCAYAAAAMAEAnQEqAQABAAzAziWkAANwAP7rrgAA`;
			_img.onload = function () {
				res(true)
			}
			_img.onerror = function () {
				res(false)
			}
		})
	},
	// 输出 Image
	fileToImageEl(file) {
		return new Promise((resolve, reject) => {
			let _img = new Image();
			_img.src = window.URL.createObjectURL(file);
			_img.onload = function () {
				resolve(_img)
			}
			_img.onerror = function () {
				URL.revokeObjectURL(_img.src)
				resolve(null)
			}
		})
	},
	// 读取文件基本信息
	readFileBaseInfo(file) {
		return {
			file: file,
			format: {
				suffix: this.suffix(file.name),
				mime: file.type,
			},
			name: {
				full: file.name,
				only: this.fileName(file.name),
				less: this.minNmae(file.name),
				end: this.endNmae(file.name),
				start: this.startNmae(file.name),
				user: this.fileName(file.name),
			},
			size: {
				byte: file.size,
				text: this.getFileSize(file.size)
			},
			date: {
				timestamp: file.lastModified,
				local: file.lastModifiedDate,
				localDate: dayjs(file.lastModifiedDate).format('YYYY-MM-DD'),
				localTime: dayjs(file.lastModifiedDate).format('HH:mm:ss')
			}
		}
	},
	// 读取blob基本信息
	readBlobBaseInfo(blob) {
		return {
			// blob: blob,
			format: {
				suffix: blob.type.split('/')[1],
				mime: blob.type
			},
			size: {
				byte: blob.size,
				text: this.getFileSize(blob.size)
			},
		}
	},
	// 创建普通 script标签
	creatScript(obj = {}) {
		let {
			src,
			code
		} = obj
		let body = document.querySelector('body')
		let script = document.createElement('script')
		// script.setAttribute('async',"async")
		script.type = 'text/javascript'
		if (src) {
			script.src = src
		}
		if (code) {
			script.innerHTML = code
		}
		body.appendChild(script)
	},

	// 创建es6 script标签
	creatModuleScript(obj = {}) {
		let {
			src,
			code
		} = obj
		let body = document.querySelector("body");
		let script = document.createElement("script");
		script.type = "module";
		if (src) {
			script.src = src
		}
		if (code) {
			script.innerHTML = code
		}
		body.appendChild(script);
	},
	// 获取mime类型
	getMemiType(name) {
		switch (name) {
			case 'js':
				return 'application/javascript'
			case 'jpg':
				return 'image/jpeg'
			case 'jpeg':
				return 'image/jpeg'
			case 'png':
				return 'image/png'
			case 'gif':
				return 'image/gif'
			case 'ico':
				return 'image/x-icon'
			case 'svg':
				return 'image/svg+xml'
			default:
				break;
		}
	},
	// 在新标签打开链接
	openUrlNewTab(url) {
		open(url)
	},

	// gps数据转换 18.752702777777777 -> `18°45'9.73"N`
	ConvertDEGToDMS(deg, lat) {
		let absolute = Math.abs(deg);
		let degrees = Math.floor(absolute);
		let minutesNotTruncated = (absolute - degrees) * 60;
		let minutes = Math.floor(minutesNotTruncated);
		let seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
		let direction
		if (lat) {
			direction = deg >= 0 ? "N" : "S";
		} else {
			direction = deg >= 0 ? "E" : "W";
		}

		return degrees + "°" + minutes + "'" + seconds + "\"" + direction;
	},
	// gps数据转换 
	ConvertDMSToDD(days, minutes) {
		let dd = days + minutes / 60;
		return dd;
	},
	// rgb to hex
	rgbToHex(r, g, b) {
		let com = c => {
			let hex = c.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
		}
		return "#" + com(r) + com(g) + com(b);
	},
	// hex to rgb
	hexToRgb(hex) {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	},
	// 根据颜色给出对比色或黑白色（bw=true） 
	invertColor(hex, bw = true) {

		function padZero(str, len) {
			len = len || 2;
			let zeros = new Array(len).join('0');
			return (zeros + str).slice(-len);
		}
		if (hex.indexOf('#') === 0) {
			hex = hex.slice(1);
		}
		// convert 3-digit hex to 6-digits.
		if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		if (hex.length !== 6) {
			throw new Error('Invalid HEX color.');
		}
		let r = parseInt(hex.slice(0, 2), 16),
			g = parseInt(hex.slice(2, 4), 16),
			b = parseInt(hex.slice(4, 6), 16);
		if (bw) {
			// https://stackoverflow.com/a/3943023/112731
			return (r * 0.299 + g * 0.587 + b * 0.114) > 125
				? '#000000'
				: '#FFFFFF';
		}
		// invert color components
		r = (255 - r).toString(16);
		g = (255 - g).toString(16);
		b = (255 - b).toString(16);
		// pad each with zeros and return
		return "#" + padZero(r) + padZero(g) + padZero(b);
	},

	// 打包
	zipPack(filsArr = [new File()]) {
		return new Promise((res, rej) => {
			let zip = new JSZip()
			filsArr.map(file => {
				zip.file(`${file.name}`, file, {
					base64: false
				})
			})
			zip.generateAsync({
				type: "blob"
			})
				.then(function (content) {
					res(content)
				})
		})
	},
	// 打包,还原文件夹
	zipPackForFolder(filsArr = [new File()]) {
		return new Promise((res, rej) => {
			let zip = new JSZip()
			filsArr.map(file => {
				if (file._path) {
					zip.file(file._path, file, {
						base64: false
					})
				} else {
					zip.file(`${file.name}`, file, {
						base64: false
					})
				}
			})
			zip.generateAsync({
				type: "blob"
			})
				.then(function (content) {
					res(content)
				})
		})
	},
	// 刷新页面
	f5() {
		location.reload();
	},
	// 常规排序
	normalSort___(obj) {
		let {
			arr = [],
			find = _ => _.done.info.name.user
		} = obj
		let ddff = (str) => {
			let ds = str.match(/^(\D*)(\d+)(.*)$/);
			if (ds && !ds[1]) {
				return ds[2];
			}
			return null;
		};
		let kkoo = (str) => {
			let ds = str
				.split("")
				.reverse()
				.join("")
				.match(/^(\D*)(\d+)(.*)$/);
			if (ds && !ds[1]) {
				return ds[2].split("").reverse().join("");
			}
			return null;
		};
		arr.sort((a, b) => {
			let nameA = find(a)
			let nameB = find(b)
			return nameA - nameB
		})
		arr.sort((a, b) => {
			// let nameA =  a.undone.name.only;
			// let nameB = b.undone.name.only;
			let nameA = find(a)
			let nameB = find(b)


			let numA = ddff(nameA);
			let numB = ddff(nameB);

			let numA2 = kkoo(nameA);
			let numB2 = kkoo(nameB);

			console.log(numA2);
			if (numA2 && numB2) {
				return numA2 - numB2;

			} else if (numA && numB) {
				if (numA === numB) {
					return numA2 - numB2;
				} else {
					return numA - numB;
				}
			}
			return nameA.localeCompare(nameB);

		})

	},

	normalSort(obj) {
		let {
			arr = [],
			find = _ => _.done.info.name.user
		} = obj
		arr.sort((a, b) => {
			a = find(a)
			b = find(b)

			let reg = /[0-9]+/g;
			let lista = a.match(reg);
			let listb = b.match(reg);

			if (!lista || !listb) {
				return a.localeCompare(b);
			}
			for (let i = 0, minLen = Math.min(lista.length, listb.length); i < minLen; i++) {
				//数字所在位置序号
				let indexa = a.indexOf(lista[i]);
				let indexb = b.indexOf(listb[i]);
				//数字前面的前缀
				let prefixa = a.substring(0, indexa);
				let prefixb = a.substring(0, indexb);
				//数字的string
				let stra = lista[i];
				let strb = listb[i];
				//数字的值
				let numa = parseInt(stra);
				let numb = parseInt(strb);
				//如果数字的序号不等或前缀不等，属于前缀不同的情况，直接比较
				if (indexa != indexb || prefixa != prefixb) {
					return a.localeCompare(b);
				}
				else {
					//数字的string全等
					if (stra === strb) {
						//如果是最后一个数字，比较数字的后缀
						if (i == minLen - 1) {
							return a.substring(indexa).localeCompare(b.substring(indexb));
						}
						//如果不是最后一个数字，则循环跳转到下一个数字，并去掉前面相同的部分
						else {
							a = a.substring(indexa + stra.length);
							b = b.substring(indexa + stra.length);
						}
					}
					//如果数字的string不全等，但值相等
					else if (numa == numb) {
						//直接比较数字前缀0的个数，多的更小
						return strb.lastIndexOf(numb + '') - stra.lastIndexOf(numa + '');
					}
					else {
						//如果数字不等，直接比较数字大小
						return numa - numb;
					}
				}
			}
		})


	},

	// 下载文件
	download: FileSaver,
	// url转图片对象
	urlToImageEl(url) {
		return new Promise((res, rej) => {
			let imageObj = new Image();
			imageObj.onload = (_) => {
				res(imageObj);
			};
			imageObj.onerror = (_) => {
				res(null);
			};
			imageObj.src = url;
		});
	},

}