$(document).ready(function () {
    $("#addrow").click(function () {
        var id = 0;
        $(".item-row:last").after(`<tr class="item-row">
        <td><input class="item" id="item" placeholder="Item" ></td>
        <td><input class="hsnsac" id="hsnsac" placeholder="5560" ></td>
        <td><input class="gst" id="gst" placeholder="0%" ></td>
        <td><input class="qty" id="qty" placeholder="0" ></td>
        <td><input class="rate" id="rate" placeholder="0"></td>
        <td><span class="amount" id="amount">0</span></td>
        <td><span class="cgst" id="cgst">0</span></td>
        <td><span class="sgst" id="sgst">0</span></td>
        <td><span class="total" id="total">0</span></td>
        <td><a class="delete" id="delete" href="javascript:;" title="Remove row">X</a></td>
    </tr>
`)
    });

    $('body').on('keyup', '.qty, .rate, .gst', function (e) {
        var amount = 0;
        var qty = 0;
        var rate = 0;
        qty = Number($(this).closest('.item-row').find('.qty').val());
        rate = Number($(this).closest('.item-row').find('.rate').val());
        amount = qty * rate;
        $(this).closest('.item-row').find('.amount').html(amount);
        var gstrate = Number($(this).closest('.item-row').find('.gst').val());
        var gst = gstrate / 100;
        var cgst = parseFloat((gst / 2) * (amount)).toFixed(2);
        var sgst = parseFloat((gst / 2) * (amount)).toFixed(2);
        var total = (amount * gst) + amount;
        $(this).closest('.item-row').find('.cgst').html(cgst);
        $(this).closest('.item-row').find('.sgst').html(sgst);
        $(this).closest('.item-row').find('.total').html((total).toFixed(2));
        amt();
        cg();
        sg();
        subtotal();
        grandtotal();
    });
    function amt() {
        var amt = 0;
        $('.amount').each(function () {
            var amount = $(this).html();
            if (!isNaN(amount)) amt += Number(amount);
        });
        $('.amt').html((amt).toFixed(2));
    }
    function cg() {
        var cg = 0;
        $('.cgst').each(function () {
            var cgst = $(this).html();
            if (!isNaN(cgst)) cg += Number(cgst);
        });
        $('.cg').html((cg).toFixed(2));
    }
    function sg() {
        var sg = 0;
        $('.sgst').each(function () {
            var sgst = $(this).html();
            if (!isNaN(sgst)) sg += Number(sgst);
        });
        $('.sg').html((sg).toFixed(2));
    }
    function subtotal() {
        var subtotal = 0;
        $('.total').each(function () {
            var total = $(this).html();
            if (!isNaN(total)) subtotal += Number(total);
        });
        $('.subtotal').html((subtotal).toFixed(2));
    }
    function grandtotal() {
        var grandtotal = 0;
        $('.subtotal').each(function () {
            var subtotal = $(this).html();
            if (!isNaN(subtotal)) grandtotal += Number(subtotal);
        });
        $('.grandtotal').html(grandtotal);

    }
    $('body').on('keyup', '.discount, .echarge, .reduction', function (e) {
        var subtotal = Number($('.subtotal').html());
        var discount = Number($('.discount').val());
        var reduction = Number($('.reduction').val());
        var echarge = Number($('.echarge').val());
        var grandtotal = Number($('.grandtotal').html());
        var disc = (subtotal * discount) / 100;
        var reduct = (subtotal * reduction) / 100;
        var extcharge = (subtotal * echarge) / 100;
        add1 = subtotal - (disc + reduct);
        add2 = add1 + extcharge;
        grandtotal = add2;

        $('.grandtotal').html((grandtotal).toFixed(2));
    });

    $("#items").on("click", "#delete", function () {
        $(this).closest("tr").remove();
    });

    $('#save').click(function () {
        var itemList = JSON.parse(localStorage.getItem('listItem')) ?? {};
        var index = itemList.length != undefined ? itemList.findLast((item) => index = item.id) : 0;

        itemList["data"] = [];
        $('.item-row').each(function () {
            var items = { 'id': index + 1 };
            $(this).find("input, span").each(function () {
                if (this.id) {
                    items[this.id] = this.value ?? this.innerHTML;
                }
            });
            itemList["data"].push(items);
            index++
        });

        $('.summary').each(function () {
            $(this).find("input, span").each(function () {
                itemList[this.id] = this.value ?? this.innerHTML;
            });
        });
        localStorage.setItem('listItem', JSON.stringify(itemList));
        getData();
        alert('Data saved!');
    });

    function getData() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            console.log(key, value);
            window.location = 'data.html';
            return false;
        }
    }
});


