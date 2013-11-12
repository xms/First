function getNum(obj) {
    var tbNum = document.getElementById("Num");
    if (tbNum.value == 0)
        tbNum.value = obj.innerText;
    else
        tbNum.value += obj.innerText;
}

//  ---------------------------------------

function clearNum() {
    document.getElementById("Num").value = 0;
}

//  ---------------------------------------

function backSpace() {
    var strNum = document.getElementById("Num").value;
    if (strNum.length > 1)
        document.getElementById("Num").value = strNum.substr(0, strNum.length - 1);
    else
        document.getElementById("Num").value = 0;
}

//  ---------------------------------------

$(document).ready(function () {
    var tpn = $('#payType'); //付款種類  ex:信用卡、現金...
    var num = $('#Num'); //數字小鍵盤按出來的字
    var rec = $('#lbReceivable'); //應收金額
    var bal = $('#lbBalance'); //尚差金額
    var total = $('#lbTotal'); //用餐金額
    var dsct = $('#lbdiscount'); //折扣數
    var btnlist = $('.btnlist'); //團購券按鈕列表
    var result = $('#result'); //在中間上面動態顯示的區塊
    var paid = $('#hdnPaid'); //已付金額
    var typeName = null; //tpn的代號
    num.val(0);
    paid.val(0);
    rec.html(total.attr('value')).attr('value', total.attr('value'));
    bal.html(total.attr('value')).attr('value', total.attr('value'));

    $("#enterNum").click(function () {
        //判斷選擇的項目
        typeName = getTypeName(tpn.val());


        if (typeName == null) {
            alert("請選擇項目");
            return;
        }
        else {

            if ((tpn.val() == "discount") && ($('#lbdiscount').length == 0)) { //未輸入過折扣
                result.append("<div class='top_one'>" + typeName
                                    + "： <label id='lb" + tpn.val() + "' value='0." + num.val() + "'>"
                                    + num.val() + " 折</label><input type='button' id='cancelDC' value='取消折扣' /></div>");

                //折扣後應收金額
                rec.attr('value', total.attr('value') * ("0." + num.val()) * 1).html(total.attr('value') * (("0." + num.val()) * 1));
                //尚缺金額
                bal.attr('value', rec.attr('value') - paid.val()).html(rec.attr('value') - paid.val());

            }
            else if (tpn.val() == "discount") { //輸入過折扣
                $('#lbdiscount').attr('value', '0.' + num.val()).html(num.val() + " 折");

                //折扣後應收金額
                rec.attr('value', total.attr('value') * ("0." + num.val()) * 1).html(total.attr('value') * (("0." + num.val()) * 1));
                //尚缺金額
                bal.attr('value', rec.attr('value') - paid.val()).html(rec.attr('value') - paid.val());

            }
            else { //輸入的不是折扣

                result.append("<div class='top_one'>"
                                + typeName + "： <label id='lb" + tpn.val() + "' value='" + num.val() + "'>"
                                    + num.val() + "</label></div>");
                paid.val(paid.val() * 1 + num.val() * 1);

                //尚缺金額
                bal.attr('value', rec.attr('value') - paid.val()).html(rec.attr('value') - paid.val());
            }
            num.val(0);
            tpn.val(null);
            typeName = null;
            $('#lbType').html(null);
        } //End of else
    });


    $('.btnMoney').click(function () {
        tpn.val(this.id);
        $('#lbType').html(getTypeName(this.id));
    });


    $('#del').click(function () {
        if (confirm("確定要清除付款資料？"))
            location.reload();

    });


    $(document)
        .on('click', '#cancelDC', function () {
            $('#cancelDC').parent().remove();
            //折扣後應收金額
            rec.attr('value', total.attr('value')).html(total.attr('value'));
            //尚缺金額
            bal.attr('value', rec.attr('value') - paid.val()).html(rec.attr('value') - paid.val());
        });


    $('#coupon').click(function () {
        btnlist.fadeToggle();
    });

    btnlist.click(function () {
        btnlist.fadeOut();
    });

    $(".btnCoupon").click(function () {
        paid.val();
        result.append("<div class='top_two'>" + "<label class='lbCoupon' value='" + this.id + "'>" + this.value + "</label>" + "</div>");
        paid.val(paid.val() * 1 + this.id * 1);
        //尚缺金額
        bal.attr('value', rec.attr('value') - paid.val()).html(rec.attr('value') - paid.val());
    });


    $('#checkout').click(function () {
        if ($('#lbBalance').attr('value') == "0") {
            alert("結帳完成！");
            //document.location.href = "http://herbian.ait.net.tw/FrontDesk/Pay/TableList.aspx";
            document.location.href = "../Index.aspx";
        }
        else {
            alert("尚未收迄，請重新確認！");
        }
    });




});          //end of jQuery code

//  ---------------------------------------

    function getTypeName(objID) {
        var typeName = null;
        switch (objID) {
            case 'cash':
                typeName = "現金";
                break;
            case 'credit':
                typeName = "信用卡";
                break;
            case 'discount':
                typeName = "折扣";
                break;
            /*case 'coupon':
            typeName = "團購券";
            break;*/ 
            case 'gift':
                typeName = "禮券";
                break;
            case 'reduce':
                typeName = "折價";
                break;

        } //End of switch
        return typeName;
}
