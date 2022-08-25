$(function(){

    //-------------------------------top_btn-------------------------------
    let $topBtn = $(".top_btn");
    let $atTop = $(".atTop")
    $topBtn.click(function(){
        let topOffset = $atTop.offset().top;
        $(window).scrollTop(topOffset);
    })

    //-------------------------------nav-------------------------------
    let $btnSearch = $(".btn_search");
    let $btnSearchGroup = $(".btn_search_group");
    let $btnHb = $(".btn_hb");
    let $btnHbOpen = $(".btn_hb_open");
    let $btnHbClose = $(".btn_hb_close");
    let $navGroup = $(".nav_group");
    $htmlAndBody = $("html, body");
    $btnSearch.click(function(){
        $btnHb.removeClass("active");
        $navGroup.removeClass("active");
        $btnSearchGroup.toggleClass("active");
    });
    $btnHb.click(function(){
        $btnSearchGroup.removeClass("active");
        $btnHb.toggleClass("active");
        $navGroup.toggleClass("active");
        $htmlAndBody.toggleClass("navShow");
    });
    
    //-------------------------------kv-------------------------------
    //複製第一張幻燈片
    let $kvSlider = $(".kv_slider");
    let $sliderImgGroup = $(".slider_img_group");
    let $sliderImgItem = $(".slider_img_item");
    $sliderImgItem.eq(0).clone().appendTo($sliderImgGroup);
    
    //slider寬度
    $sliderImgItem = $(".slider_img_item");
    let sliderTotal = $(".slider_img_item").length;
    let window_width = 0;
    let kvSliderImg_width = 0;
    let kvSliderTotal_width = 0;
    function slider_width(){
        if($(window).width() <= 1200){
            window_width = $(window).width();
        }else{
            window_width = 1200;
        }
        kvSliderImg_width = window_width;
        kvSliderTotal_width = window_width * sliderTotal;
        $kvSlider.css({"width": kvSliderImg_width + "px"});
        $sliderImgItem.css({"width": kvSliderImg_width + "px"});
        $sliderImgGroup.css({"width": kvSliderTotal_width + "px"});
        // console.log(kvSliderImg_width);
        // console.log("window_width" + window_width);
    }
    slider_width();
    $(window).resize(function(){
        slider_width();
    })

    //加slider的dot
    let $btnDotGroup = $(".btn_dot-group");
    let btnDot = "";
    function addBtnDot(){
        for(var i = 0; i < sliderTotal - 1; i++){
            btnDot = "<li></li>" + btnDot;
        }
        $btnDotGroup.prepend(btnDot);
    }
    addBtnDot();

    //kv上一張 下一張按鈕
    let $btnPrev = $(".btn_prev");
    let $btnNext = $(".btn_next");
    let $btnDot = $(".btn_dot-group li")
    let dotIndex = 0;
    let sliderIndex = 0;
    let sliderMove_width = 0;
    $btnDot.eq(sliderIndex).addClass("active");
    $btnPrev.click(function(){
        if( dotIndex > 0 ){
            dotIndex--;
        }else{
            dotIndex = sliderTotal - 2;
        }
        dotMove();
    })
    $btnNext.click(function(){
        if( dotIndex < sliderTotal - 2){
            dotIndex++;
        }else{
            dotIndex = 0;
        }
        dotMove();
    })
    function dotMove(){
        $btnDot.siblings().removeClass("active").eq(dotIndex).addClass("active");
        // console.log("dotIndex = " + dotIndex)
    }
    
    $btnPrev.click(function(){
        if( sliderIndex <= 0 ){
            sliderIndex = sliderTotal - 1;
            $sliderImgGroup.stop().animate({"left": kvSliderImg_width * sliderIndex * -1},0);
            sliderIndex = sliderTotal - 2;
        }else{
            sliderIndex--;
        }
        sliderMove_normall();
    })
    $btnNext.click(function(){
        clearInterval(sliderAutoMove_play);
        if( sliderIndex >= sliderTotal - 1){
            sliderIndex = 0;
            $sliderImgGroup.css({"left": 0});
            sliderIndex = 1;
        }else{
            sliderIndex++;
        }
        sliderMove_normall();
    })
    function sliderMove_special(){
        sliderIndex = sliderTotal - 1;
        // console.log("sliderIndex = " + sliderIndex);
    }
    function sliderMove_normall(){
        $sliderImgGroup.stop().animate({"left": kvSliderImg_width * sliderIndex * -1},3000);
        // console.log("sliderIndex = " + sliderIndex);
    }


    let sliderAutoMove_play = setTimeout(sliderAutoMove, 3000)
    function sliderAutoMove(){

        if( sliderIndex >= sliderTotal - 1){
            sliderIndex = 0;
            $sliderImgGroup.css({"left": 0});
            sliderIndex = 1;
        }else{
            sliderIndex++;
        }
        sliderMove_normall();
        
        if( dotIndex < sliderTotal - 2){
            dotIndex++;
        }else{
            dotIndex = 0;
        }
        dotMove();
        sliderAutoMove_play = setTimeout(sliderAutoMove, 3000)
    }

    $kvSlider.hover(function(){
        clearInterval(sliderAutoMove_play);
        // console.log("hover")
    },function(){
        sliderAutoMove_play = setTimeout(sliderAutoMove, 3000)
        // console.log("nonHover")
    })
    



    //-------------------------------nav_slide-------------------------------
    let $navGoodsCat_button = $(".nav_goods_cat button");
    let $subNavGroup = $(".sub_nav_group");
    $navGoodsCat_button.click(function(){
        $subNavGroup.slideToggle();$navGoodsCat_button.toggleClass("active");
    })

    //-------------------------------sideOption_slide-------------------------------
    let $sideOptionItem = $(".side_option_item");
    let $sideOptionItem_button = $(".side_option_item button");
    let $sideSubOptionGroup = $(".side_sub_option_group");
    $sideOptionItem_button.click(function(){
        $sideSubOptionGroup.stop().slideToggle();
        $sideOptionItem.stop().toggleClass("close");
    })

    //-------------------------------add_love_btn-------------------------------
    let $addLoveBtn = $(".add_love_btn");
    let $addLoveBtnUnActive = $(".add_love_btn_unActive");
    let $addLoveBtnUActive = $(".add_love_btn_active");
    $addLoveBtn.click(function(){
        $(this).toggleClass("active");
    })

    //-------------------------------selectAll_btn-------------------------------
    let $pdCheckboxAll = $(".product_item #product_checkbox_all")
    let $pdCheckbox = $(".product_checkbox_single")
    let $pdCheckbox_checked = $(".product_checkbox_single:checked")
    $pdCheckboxAll.click(function(){
        if($pdCheckboxAll.prop("checked") === true){
            $pdCheckbox.prop("checked",true)
        }else{
            $pdCheckbox.prop("checked",false)
        }
        // console.log($pdCheckbox.prop)
    })
    $pdCheckbox.change(function() {
        if($(".product_checkbox_single:checked").length == $pdCheckbox.length){
            $pdCheckboxAll.prop("checked",true)
        } else {
            $pdCheckboxAll.prop("checked",false)
        }
        // console.log($(".product_checkbox_single:checked").length);
    })
    $pdCheckboxAll.click();
    //-------------------------------sel_btn-------------------------------
    let $selBtnItem = $(".sel_btn_item");
    $selBtnItem.click(function(){
        selBtnItem_index = $(this).index();
        // console.log(selBtnItem_index);
        $(this).addClass("active").siblings().removeClass("active");
    })

    let $selCountDown = $(".sel_count_down");
    let $selCountUp = $(".sel_count_up");
    let $selCountNum_span = $(".sel_count_num span");
    let selCount_num = 0;
    let $price = $('.price_group .price-total');
    let $price_total = $('.product_group .product_subtotal');
    let $cartPrice_sum = $('.price_total');
    let price = 0;
    let price_total = 0;
    let cartPrice_sum = 0;
    getCart_sumPrice();
    $selCountDown.click(function(){
        selCount_num = $(this).siblings(".sel_count_num").text();
        // if(selCount_num > 1){
        //     selCount_num--;
        // }else{
        //     selCount_num = 1;
        // }
        // console.log(selCount_num);
        // $(this).siblings(".sel_count_num").children("span").text(function(){
        //     return selCount_num;
        // })
        if(selCount_num > 1){
            selCount_num--;
        }else{
            return selCount_num = 1;
        }
        // console.log(selCount_num);
        // console.log($(this).siblings(".sel_count_num").text());
        $(this).siblings(".sel_count_num").children("span").text(getSelCount())
        price = $(this).parents('.product_group').find('.price-total').text();
        getPrice_total();
        $(this).parents('.product_group').find('.product_subtotal').text(price_total);
        // console.log($(this).parents('.product_group').find('.product_checkbox_single').prop("checked"));

        getCart_sumPrice()
    })
    $selCountUp.click(function(){
        selCount_num = $(this).siblings(".sel_count_num").text()
        selCount_num++;
        // console.log(selCount_num);
        // console.log($(this).siblings(".sel_count_num").text());
        $(this).siblings(".sel_count_num").children("span").text(getSelCount())
        price = $(this).parents('.product_group').find('.price-total').text();
        getPrice_total();
        $(this).parents('.product_group').find('.product_subtotal').text(price_total);
        //$price_total.text(price_total)
        getCart_sumPrice()
    })
    $pdCheckbox.change(function() {
        getCart_sumPrice()
    })
    $pdCheckboxAll.change(function() {
        getCart_sumPrice()
    })

    function getSelCount() {
        return selCount_num;
    }
    function getPrice_total() {
        price_total = price * selCount_num;
    }
    function getCart_sumPrice() {
        cartPrice_sum = 0;
        $(".product_checkbox_single:checked").each(function() {
            cartPrice_sum += parseInt($(this).parents('.product_group').find('.product_subtotal').text())
        });
        $cartPrice_sum.text(cartPrice_sum)
    }

    //-------------------------------checkInfo_slide-------------------------------
    let $shopDetailItem_img = $(".shop_detail_item img")
    let $transPort_input = $(".shop_transPort_box .option_chooseBtn")
    let $transPort_infoGroup = $(".shop_transPort_box .info_group")
    $transPort_infoGroup.eq(0).slideDown().css({"display":"flex"}).siblings(".info_group").slideUp();
    $transPort_input.click(function(){
        $transPort_infoGroup.css({"display":"none"});
        $transPort_infoGroup.stop().slideUp();
        $(this).siblings(".info_group").stop().slideDown().css({"display":"flex"});
    })
    
    //-------------------------------coupon_box-------------------------------
    let $coupon_input = $(".shop_coupon_box .option_chooseBtn")
    let $coupon_infoGroup = $(".shop_coupon_box .info_group")
    $coupon_infoGroup.slideUp();
    $coupon_input.click(function(){
        $coupon_infoGroup.css({"display":"none"});
        $coupon_infoGroup.stop().slideUp();
        $(this).siblings(".info_group").stop().slideDown().css({"display":"flex"});
    })

})
window.addEventListener('load', function() {
    // -------------------------------商品頁面-------------------------------
    // 拿取物件
    let product_slider_mainImg = document.querySelectorAll('.product_img_main')
    let product_slider_subImg = document.querySelectorAll('.slider_img_sub')
    let product_mainSlider = document.querySelector('.product_slider_main ul')
    let product_subSliderBox = document.querySelector('.product_slider_sub')
    let product_subSliderUl = document.querySelector('.product_slider_sub ul')
    let product_btn_prev = document.querySelector('.slider_btn_group .btn_prev')
    let product_btn_next = document.querySelector('.slider_btn_group .btn_next')
    let product_btn_prevImg = document.querySelector('.slider_btn_group .btn_prev img')
    let product_btn_nextImg = document.querySelector('.slider_btn_group .btn_next img')
    let product_btn_prevPic_source = document.querySelector('.slider_btn_group .btn_prev picture source')
    let product_btn_nextPic_source = document.querySelector('.slider_btn_group .btn_next picture source')
    // 初始化變數
    let document_width = document.body.clientWidth;
    let product_slider_mainImg_width = product_slider_mainImg[0].offsetWidth;
    let product_slider_subImg_width = product_slider_subImg[1].offsetWidth;
    let product_subSliderBox_width = product_subSliderBox.offsetWidth;
    let product_subSliderUl_width = product_subSliderUl.scrollWidth;
    let product_slider_moveWidth = 0;
    let product_subSlider_moveWidth = 0;
    let product_slider_index = 0;
    let product_btn_index = 0;

    product_mainSlider.style.left = 0;
    // 頁面寬度變更 更新物件寬度
    window.addEventListener('resize', function() {
        document_width = document.body.clientWidth;
        product_slider_mainImg_width = product_slider_mainImg[0].offsetWidth;
        product_slider_subImg_width = product_slider_subImg[1].offsetWidth;
        product_subSliderBox_width = product_subSliderBox.offsetWidth;
        product_btn_index = 0;
        product_subSlider_moveWidth = 0;
        product_mainSlider.style.left = 0;
        product_subSliderUl.style.left = 0;
        (product_subSlider_moveWidth <= product_subSliderUl_width - product_subSliderBox_width) && (product_btn_next.style.transform = 'scaleX(1)',
        product_btn_nextImg.src = 'img/375/arrow_right_black_375@2x.webp',
        product_btn_nextPic_source.srcset = 'img/1200/checkOut_arrow_right_black_1200@2x.webp');
        product_btn_prev.style.transform = 'scaleX(1)';
        product_btn_prevImg.src = 'img/375/arrow_left_gray_375@2x.webp';
        product_btn_prevPic_source.srcset = 'img/1200/arrow_left_gray_1200@2x.webp';
    })

    // 輪播圖片套上 數字變數product_slider_index與點擊事件
    for(let i = 0; i < product_slider_subImg.length; i++) {
        product_slider_subImg[i].addEventListener('click', function() {
            product_slider_index = i;
            product_slider_moveWidth = product_slider_index * product_slider_mainImg_width;
            product_mainSlider.style.left = -product_slider_moveWidth + 'px';
        })
    }
    product_btn_next.addEventListener('click', function() {
        if(document_width < 786) {
            // 手機按鈕
            if( product_btn_index >= product_slider_subImg.length - 1) {
                product_btn_index = product_slider_subImg.length - 1;
                slider_move_phone();
            } else {
                product_btn_index++;
                slider_move_phone();
                // next箭頭圖片改變
                (product_btn_index >= product_slider_subImg.length - 1) && (
                    product_btn_next.style.transform = 'scaleX(-1) translateY(-50%)',
                    product_btn_nextImg.src = 'img/375/arrow_left_gray_375@2x.webp',
                    product_btn_nextPic_source.srcset = 'img/1200/arrow_left_gray_1200@2x.webp'
                )   
                // prev箭頭圖片改變
                product_btn_prev.style.transform = 'scaleX(-1) translateY(-50%)';
                product_btn_prevImg.src = 'img/375/arrow_right_black_375@2x.webp';
                product_btn_prevPic_source.srcset = 'img/1200/checkOut_arrow_right_black_1200@2x.webp';
            }
        } else {
             // 網頁按鈕
            if(product_subSlider_moveWidth < product_subSliderUl_width - product_subSliderBox_width) {
                product_btn_index++;
                slider_move_pc();
                // prev箭頭圖片改變
                product_btn_prev.style.transform = 'scaleX(-1)'
                product_btn_prevImg.src = 'img/375/arrow_right_black_375@2x.webp';
                product_btn_prevPic_source.srcset = 'img/1200/checkOut_arrow_right_black_1200@2x.webp';
                // next箭頭圖片改變
                (product_subSlider_moveWidth >= product_subSliderUl_width - product_subSliderBox_width) && (product_btn_next.style.transform = 'scaleX(-1)', product_btn_nextImg.src = 'img/375/arrow_left_gray_375@2x.webp', product_btn_nextPic_source.srcset = 'img/1200/arrow_left_gray_1200@2x.webp');
            }
        }
        console.log(document_width);
    })
    product_btn_prev.addEventListener('click', function() {
        if(document_width < 786) {
            // 手機按鈕
            if(product_btn_index > 0) {
                product_btn_index--;
                slider_move_phone();
                // next箭頭圖片還原
                product_btn_next.style.transform = 'scaleX(1)  translateY(-50%)'
                product_btn_nextImg.src = 'img/375/arrow_right_black_375@2x.webp';
                product_btn_nextPic_source.srcset = 'img/1200/checkOut_arrow_right_black_1200@2x.webp';
                // prev箭頭圖片還原
                (product_btn_index <= 0) && (product_btn_prev.style.transform = 'scaleX(1)  translateY(-50%)',
                product_btn_prevImg.src = 'img/375/arrow_left_gray_375@2x.webp',
                product_btn_prevPic_source.srcset = 'img/1200/arrow_left_gray_1200@2x.webp')
            } else {
                product_btn_index = 0;
                product_mainSlider.style.left = 0;
            }
        } else {
            // 網頁按鈕
            if(product_btn_index > 0) {
                product_btn_index--;
                slider_move_pc();
                console.log(product_btn_index);
                // next箭頭還原
                product_btn_next.style.transform = 'scaleX(1)'
                product_btn_nextImg.src = 'img/375/arrow_right_black_375@2x.webp';
                product_btn_nextPic_source.srcset = 'img/1200/checkOut_arrow_right_black_1200@2x.webp';
                // prev箭頭圖片還原
                (product_btn_index <= 0) && (
                product_btn_prev.style.transform = 'scaleX(1)',
                product_btn_prevImg.src = 'img/375/arrow_left_gray_375@2x.webp',
                product_btn_prevPic_source.srcset = 'img/1200/arrow_left_gray_1200@2x.webp')
            }
        }
        console.log(product_btn_index);
    })
    function slider_move_phone() {
        product_subSlider_moveWidth = product_btn_index * product_slider_mainImg_width;
        product_mainSlider.style.left = -product_subSlider_moveWidth + 'px';
    }
    function slider_move_pc() {
        product_subSlider_moveWidth = product_btn_index * product_slider_subImg_width;
        product_subSliderUl.style.left = -product_subSlider_moveWidth + 'px';
    }
    // -------------------------------結帳頁面-------------------------------
    let checkout_btn = document.querySelector('.checkout_btn');
    let cartPrice_sum = document.querySelector('.sec_shop_cart .price_total');
    if(checkout_btn == true){
        checkout_btn.addEventListener('click', function() {
            // e.preventDefault();
            // console.log(cartPrice_sum.innerHTML);
            window.localStorage.setItem('cartPrice_sum', cartPrice_sum.innerHTML);
        })
    }

    // 拿取物件
    let checkout_cartPrice_sum = document.querySelector('.sec_shop_detail .price_total');
    let checkout_productPrice_sum = document.querySelector('.sec_shop_detail .price_product .price_cost');
    let checkout_shopFeePrice = document.querySelector('.sec_shop_detail .price_sohp_fee .price_cost');
    let checkout_discount = document.querySelector('.sec_shop_detail .price_sohp_discount .price_cost');
    let checkout_actuallyPaid = document.querySelector('.sec_shop_detail .price_actually_paid .price_cost');
    let checkoutBox_actuallyPaid = document.querySelector('.sec_shop_detail .shop_checkout_box .price_total');
    let price_sohp_fee_option = document.querySelectorAll('.option_item .option_trans_port');
    let price_sohp_fee_optionText = document.querySelectorAll('.option_item .trans_port_price');
    // 初始化變數
    let checkout_cartPrice = 0;
    let price_sohp_fee = 0;
    let price_sohp_discount = 0;
    let price_actually_paid = 0;
    // 更新變數
    checkout_cartPrice = window.localStorage.getItem('cartPrice_sum');
    checkout_cartPrice_sum.innerText = checkout_cartPrice;
    price_sohp_fee = price_sohp_fee_optionText[0].innerText;
    checkout_productPrice_sum.innerText = checkout_cartPrice;
    checkout_discount.innerText = price_sohp_discount;
    // 取得真正花費
    get_actually_paid();
    function get_actually_paid() {
        price_actually_paid = parseInt(checkout_cartPrice) + parseInt(price_sohp_fee) - parseInt(price_sohp_discount);
        checkout_actuallyPaid.innerText = price_actually_paid;
        checkoutBox_actuallyPaid.innerText = price_actually_paid;
    }

    // 運費變更
    for(let i = 0; i < price_sohp_fee_option.length; i++) {
        price_sohp_fee_option[i].addEventListener('click', function() {
            price_sohp_fee = price_sohp_fee_optionText[i].innerText;
            checkout_shopFeePrice.innerText = price_sohp_fee;
            get_actually_paid()
        })
    }
    
    
    //let a = '<tr class="product_group"><th class="product_item product_info" scope="row"><div class="product_checkbox"><a href="'+ product_href + '"><div class="product_pic"><picture><source media="(min-width: 767px)" srcset="' + product_img_pc + '"><img src="' + product_img_phone + '" alt="' + product_img_alt + '"></picture></div><div class="product_text"><div class="product_name"><h3>' + product_name + '</h3></div><div class="product_colorSize"><span>' + product_colorSize + '</span></div><div class="product_count"><span>' + product_count + '</span><span>件</span></div></div></a></div></th><td class="product_item product_subtotal"><span>' + product_total + '</span></td></tr>'
})