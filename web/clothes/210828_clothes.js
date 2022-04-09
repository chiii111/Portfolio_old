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
        console.log("dotIndex = " + dotIndex)
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
        console.log("sliderIndex = " + sliderIndex);
    }
    function sliderMove_normall(){
        $sliderImgGroup.stop().animate({"left": kvSliderImg_width * sliderIndex * -1},3000);
        console.log("sliderIndex = " + sliderIndex);
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
        console.log("hover")
    },function(){
        sliderAutoMove_play = setTimeout(sliderAutoMove, 3000)
        console.log("nonHover")
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
    $selCountDown.click(function(){
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
            selCount_num = $(this).siblings(".sel_count_num").text();
            selCount_num--;
        }else{
            selCount_num = 1;
        }
        // console.log(selCount_num);
        console.log($(this).siblings(".sel_count_num").text());
        $(this).siblings(".sel_count_num").children("span").text(function(){
            return selCount_num;
        })
    })
    $selCountUp.click(function(){
        selCount_num = $(this).siblings(".sel_count_num").text()
        selCount_num++;
        // console.log(selCount_num);
        console.log($(this).siblings(".sel_count_num").text());
        $(this).siblings(".sel_count_num").children("span").text(function(){
            return selCount_num;
        })
    })

    //-------------------------------selectAll_btn-------------------------------
    let $pdCheckboxAll = $(".product_item #product_checkbox_all")
    let $pdCheckbox = $(".product_item input:not(#product_checkbox_all)")
    $pdCheckboxAll.click(function(){
        if($pdCheckboxAll.prop("checked") === true){
            $pdCheckbox.prop("checked",true)
        }else{
            $pdCheckbox.prop("checked",false)
        }
        console.log($pdCheckbox.prop)
    })

    //-------------------------------checkInfo_slide-------------------------------
    let $shopDetailItem_img = $(".shop_detail_item img")
    let $transPort_input = $(".shop_transPort_box .option_chooseBtn")
    let $transPort_infoGroup = $(".shop_transPort_box .info_group")
    $transPort_infoGroup.slideUp();
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