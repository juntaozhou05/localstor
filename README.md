# localstor
---
### 实现本地存储js和css文件,当js或css文件有改动时才重新加载文件,可以有效减少http请求次数，加快页面的响应时间。

### 安装方法：
	$npm install localstor --save

### 入口方法：
	//引入js：     
	local.load.loadJs(name, url, version, callback);  
	//引入css：  
	local.load.loadCss(name, url, version); 
 
### 参数说明  
name:引入文件的名称  
url:引入文件的路径  
version:文件版本号  
callback:回调函数  

说明：  
1.当需要重新加载新的js或css文件的时候，只需要把文件版本号(version)修改一下就可以了。     
2.由于js文件的引用会有先后之分，所以先引入的js文件要放在
最外层引入。  

具体可以看看demo文件里的实例。
