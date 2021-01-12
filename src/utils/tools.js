function getQueryString(key,search) {
    var after = search||window.location.search;
    if(after.indexOf('?') === -1) return null; //如果url中没有传参直接返回空
    //key存在先通过search取值如果取不到就通过hash来取
    after = after.substr(1) || window.location.hash.split("?")[1];
    if(after) {
        var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
        var r = after.match(reg);
        if(r != null)
        {
            return  decodeURIComponent(r[2]);
        }
        else
        {
            return null;
        }
    }
}
function isValidityUrl(sUrl){  
    let match2 = /^((http|https):\/\/)+(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/;
    let testVol = match2.test(sUrl);
    return testVol;
}
function  generate(arr,topId,keys,data=[]){
    if(arr && arr.length>0){
        for(let i = 0;i<arr.length;i++){
            let item =  arr[i];
            if(item[keys.parentId]===topId){
                data.push(item);
                for(let j = 0;j<arr.length;j++){
                    let item1 =  arr[j];
                    if(item[keys.id] === item1[keys.parentId]){
                        item.children = [];
                        generate(arr,item1[keys.parentId],keys,item.children);
                    }
                }
            }
        }
    }
    return data;
}
function copyToClipboard(txt) {  
    console.log(window.copy)
	if (window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt);
		alert("复制成功！")
	} else if (navigator.userAgent.indexOf("Opera") != -1) {
		window.location = txt;
		alert("复制成功！");
	}else if(window.copy){
       
		window.copy(txt);
		alert("复制成功！")
	}
}

export {getQueryString,isValidityUrl,generate,copyToClipboard}