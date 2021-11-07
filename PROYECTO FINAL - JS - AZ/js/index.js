var tbody = document.getElementsByTagName('tbody')[0];
var allCheck = document.getElementsByClassName('allBtn')[0];
var checks = tbody.getElementsByClassName('iconfont icon-duihao');
var data_sum = document.getElementsByClassName('data_sum')[0];
var data_select = document.getElementsByClassName('data_select')[0];
var selectTip = document.getElementsByClassName('no-select-tip')[0];
var btn_disabled = document.getElementsByClassName('btn-disabled')[0];
var goods_num = document.getElementsByClassName('goods_num');
var col_num = document.getElementsByClassName('col_num');
var col_price = tbody.getElementsByClassName('col-price');
var col_total = tbody.getElementsByClassName('col-total');
var col_name = tbody.getElementsByClassName('col_name');
var sumPrice = document.getElementsByClassName('data_totalsum')[0];
var msg = tbody.getElementsByClassName('msg');
var goodsvalue, selectNum, num, totalValue;

btn_disabled.onmousedown = function (event) {
    if (event.button == '0') {
        btn_disabled.className += ' btn';
    }
}
btn_disabled.onmouseup = function (event) {
    if (event.button == '0') {
        btn_disabled.className = 'btn-disabled';
    }
}
var flag = false; 
allCheck.onclick = function () {
    if (!flag) {
        this.className = 'iconfont icon-duihao check-color';    
        for (var i = 0; i < checks.length; i++) { 
            checks[i].className = 'iconfont icon-duihao check-color';
        }
        flag = true; 
    } else if (flag) {
        this.className = 'iconfont icon-duihao allBtn';    
        for (var i = 0; i < checks.length; i++) {
            checks[i].className = 'iconfont icon-duihao';
        }
        flag = false; 
    }
    total();
    btnColor();
}

tbody.onclick = function (event) {
    var event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.className == 'iconfont icon-chenghao del') {
        target.parentElement.parentElement.remove();  
        total();
        btnColor();
        if (!col_num.length) {
            allCheck.className = 'iconfont icon-duihao allBtn';
            flag = false;
        }
    }
    if (target.nodeName = 'INPUT') {
        target.onblur = function () {
            goodsvalue = target.value;
            if (goodsvalue <= 1 || isNaN(goodsvalue)) {
                goodsvalue = 1;
            } else if (goodsvalue >= 20) {
                goodsvalue = 20;
            }
            target.parentElement.parentElement.nextElementSibling.innerHTML = parseFloat(target.parentElement.parentElement.previousElementSibling.innerHTML) * 10 * goodsvalue / 10 + ' Pesos';
            tip(target.parentElement.children);
            total();
        }
    }
    
    if (target.className == 'iconfont icon-duihao' || target.className == 'iconfont icon-duihao check-color') {
        if (target.className == 'iconfont icon-duihao') {
            target.className += ' check-color';  
 
        } else if (target.className == 'iconfont icon-duihao check-color') { 
            target.className = 'iconfont icon-duihao'; 
 
        }
        total();
        btnColor();
    }
    if (target.className == 'iconfont icon-jian' || target.className == 'iconfont icon-jia') {
        
        var pl = target.parentElement.children;
        goodsvalue = pl[1].value;
        if (target.className == 'iconfont icon-jian') {
            if (goodsvalue == 1) {
                pl[1].value = 1;
                
                pl[3].style.display = 'none';
                return;
            }
            goodsvalue--;
            tip(pl);
        }
        
        if (target.className == 'iconfont icon-jia') {
 
            if (goodsvalue == '20') {
                pl[1].value = 20;
                pl[3].style.display = 'none';
                return;
            }
            goodsvalue++;
            tip(pl);
        }
        target.parentElement.parentElement.nextElementSibling.innerHTML = parseFloat(target.parentElement.parentElement.previousElementSibling.innerHTML) * 10 * goodsvalue / 10 + ' Pesos';
        total();
    }
}
 
function btnColor() {
    for (var k = 0; k < checks.length; k++) {
        if (checks[k].className == 'iconfont icon-duihao check-color') {
            btn_disabled.className = 'btn-disabled  btn-primary';
            selectTip.style.display = 'none'; 
            break; 
        }
        btn_disabled.className = 'btn-disabled';
        selectTip.style.display = 'block';
    }
    if(checks.length==0){
        flag = false;
        allCheck.className = 'iconfont icon-duihao allBtn';
        btn_disabled.className = 'btn-disabled';
        selectTip.style.display = 'block';
       return;
    }else{
        for (var j = 0; j < checks.length; j++) {
            
            if (checks[j].className == 'iconfont icon-duihao') {
                allCheck.className = 'iconfont icon-duihao allBtn';
                return;
            }
        }
    }
    
    flag = true;
    allCheck.className = 'iconfont icon-duihao allBtn check-color';
   
}
 
function tip(pl) {
    pl[3].style.display = 'block';
    if (goodsvalue < 10) {
        pl[3].innerHTML = 'Puede agregar mas de 10';
    } else if (goodsvalue == 10) {
        pl[3].innerHTML = 'Puede agregar 0';
    } else if (goodsvalue > 10) {
        pl[3].innerHTML = 'Puede agregar' + (20 - goodsvalue);
    }
    
    pl[1].value = goodsvalue;
    
}

function total() {
    totalValue = 0;
    selectNum = 0;
    num = 0;
    for (var j = 0; j < col_num.length; j++) {
        
        num += parseFloat(goods_num[j].value);
        if (checks[j].className == 'iconfont icon-duihao check-color') {
            
            totalValue += parseFloat(col_total[j].innerHTML) * 100;
            selectNum += parseInt(goods_num[j].value);
 
        }
    }
    sumPrice.innerHTML = totalValue / 100;
    data_select.innerHTML = selectNum;
    data_sum.innerHTML = num;
 
}
 
function $(str) {
    return document.querySelector(str);
}


function createLi(array) {
    var str = "";
    for (var i = 0; i < array.length; i++) {
        var lis = array[i];
        str += `<li class="recommend-item">
        <a href="javascript:">
            <img src="${lis.imgSrc}" alt="">
            <div class="recommend-name">${lis.goodsName}</div>
            <div class="recommend-price">${lis.price}</div>
            <div class="recommend-tips">${lis.tips}</div>
            <span class="recommend-shoppingcart">Agregar</span>
        </a>
</li>`
    }
    return str;
}
var recommendList = $(".recommend-list");
recommendList.innerHTML = createLi(dataList);
 
function createTr(array) {
    var str = "";
    for (var i = 0; i < 3; i++) {
        var trs = dataList[i];
        str += `<tr>
        <td class="col_check"><i class="iconfont icon-duihao"></i></td>
        <td class="col_img"><img src="${trs.imgSrc}" alt="" width="80" height="80"></td>
        <td class="col_name">${trs.goodsName}</td>
        <td class="col-price">${trs.price}</td>
        <td class="col_num"><div class="pl  clearfix"><a class="iconfont icon-jian"></a><input type="tel" value="1" class="goods_num"><a class="iconfont icon-jia"></a><span class="msg">还可买 10 件以上</span></div></td>
        <td class="col-total">${trs.price}</td>
        <td class="col_action"><a class="iconfont icon-chenghao del"></a></td>
        </tr>`
    }
    return str;
}
tbody.innerHTML = createTr(dataList);
var recommendList = document.getElementsByClassName('recommend-list')[0];
recommendList.onclick = function (event) {
    var event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.className == 'recommend-shoppingcart') {
        recommend_price = target.previousElementSibling.previousElementSibling.innerHTML;
        recommend_name = target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        recommend_img = target.parentElement.firstElementChild.src;
        console.log(col_name)
        for (var i = 0; i < col_num.length; i++) {
            if (col_name[i].innerHTML == recommend_name) {
                goods_num[i].value = parseInt(goods_num[i].value) + 1 >20? 20: parseInt(goods_num[i].value) + 1;
                checks[i].className = 'iconfont icon-duihao check-color';
                col_total[i].innerHTML= parseInt(goods_num[i].value) *parseFloat(col_price[i].innerHTML)+' Pesos'; 
                total(); btnColor();
                return;
            }
        }
        var newTr = document.createElement('tr');
        newTr.innerHTML = '<tr><td class="col_check"><i class="iconfont icon-duihao check-color"></i></td><td class="col_img"><img src=' + recommend_img + ' alt="" width="80" height="80"></td><td class="col_name">' + recommend_name + '</td><td class="col-price">' + recommend_price + '</td><td class="col_num"><div class="pl  clearfix"><a class="iconfont icon-jian"></a><input type="tel" value="1" class="goods_num"><a class="iconfont icon-jia"></a><span class="msg">还可买 10 件以上</span></div></td><td class="col-total">' + recommend_price + '</td><td class="col_action"><a class="iconfont icon-chenghao del"></a></td></tr>';
        tbody.insertBefore(newTr, tbody.firstElementChild);
    }
    btnColor();
    total();
}