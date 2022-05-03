$(function(){
    
    //回到最上面
    let $window = $(window)
    let $goToTop_btn = $(".goToTop_btn");
    let $mainNavNextSec = $(".sec_mainNav + section");
    let goToTopHeight = $mainNavNextSec.offset().top;
    // console.log(goToTopHeight)
    $goToTop_btn.click(function(){
        $window.scrollTop(goToTopHeight);
    })

    window_scrollTop = 0;
    let mainNav_link_works_top = $(".mainNav_link_works").offset().top;
    $window.scroll(function(){
        window_scrollTop = $window.scrollTop();
        if(window_scrollTop > mainNav_link_works_top){
            $goToTop_btn.removeClass("hide")
        }else{
            $goToTop_btn.addClass("hide")
        }
    })



    //長出點
    let $mainKv_workImg_group = $(".mainKv_workImg_group");
    let $mainKv_workImg_item = $(".mainKv_workImg_item");
    let slider_length = $mainKv_workImg_item.length;
    let dot = "";
    let $mainKv_workImg_dot_box = $(".mainKv_workImg_dot_box");
    for(i=0; i<slider_length; i++){
        dot = dot + "<button></button>"
    }
    $mainKv_workImg_dot_box.append(dot);
    let $mainKv_workImg_dot = $(".mainKv_workImg_dot_box button");
    //第一個dot加上css
    $mainKv_workImg_dot.first().addClass("active");
    //點擊dot加上css
    $mainKv_workImg_dot.click(function(){
        slider_index = $(this).index();
        slider_run();
    })
    //第一張換燈片加上css
    $mainKv_workImg_item.first().addClass("show");

    let slider_index = 0;
    $mainKv_workImgArrow_prev = $(".mainKv_workImgArrow_prev")
    $mainKv_workImgArrow_next = $(".mainKv_workImgArrow_next")

    //點擊kv箭頭
    $mainKv_workImgArrow_prev.click(function(){
        if(slider_index > 0){
            slider_index--;
        }else{
            slider_index = slider_length - 1;
        }
        slider_run()
        console.log(slider_index);
    })
    $mainKv_workImgArrow_next.click(function(){
        if(slider_index < slider_length - 1){
            slider_index++;
        }else{
            slider_index = 0;
        }
        slider_run()
        console.log(slider_index);
    })

    let autoPlay = setTimeout(go,2000);
    function go(){
        if(slider_index < slider_length - 1){
            slider_index++;
        }else{
            slider_index = 0;
        }
        slider_run();
    }
    
    function slider_run(){
        $mainKv_workImg_dot.stop().eq(slider_index).addClass("active").siblings().removeClass("active");
        $mainKv_workImg_item.stop().eq(slider_index).addClass("show").siblings().removeClass("show");
        clearInterval(autoPlay)
        autoPlay = setTimeout(go,2000)
    }

    //kv 作品選項的slideToggle
    $mainKv_link_works = $(".mainKv_link_works");
    $mainKv_link_works_text = $(".mainKv_link_works>a");
    $mainKv_subLink_works = $(".mainKv_link_works .mainKv_subLink_group");
    $mainKv_link_works_text.click(function(){
        $mainKv_subLink_works.slideToggle();
        $mainKv_link_works.toggleClass("slideDown");
    })

    //nav hb
    let $mainNav_hb = $(".mainNav_hb");
    let $mainNav_nav = $(".mainNav_nav");
    $mainNav_hb.click(function(){
        $mainNav_nav.toggleClass("hb_active");
        $mainNav_hb.toggleClass("hb_active");

    })

    //主頁面kv和主nav的連結轉跳
    //取得網址列中的hashtag
    let win_hash = window.location.hash;

    function get_hash_top(){
        //取得物件的offset().top
        let win_hash_top = $(win_hash).parents(".worksOverview_item").find(".hash_point").offset().top;
        console.log(win_hash_top);
        
        $window.scrollTop(win_hash_top);
    }

    // 頁面一載入就執行一次下方函式
    get_hash_top();

    let $navWork_link = $(".mainNav_link_works a");
    let $kvWork_link = $(".mainKv_link_works a");
    $navWork_link.click(function(){
        get_hash_top();
    })

    //作品頁面的kv連結轉跳
    function get_hash_top_workPage(){
        //取得物件的offset().top
        let win_hash_top_workPage = $(win_hash).parents("section").find(".hash_point").offset().top;
        
        $window.scrollTop(win_hash_top_workPage);
    }
    let $workKv_btn_intro = $(".workKv_btn_intro a");
    $workKv_btn_intro.click(function(){
        get_hash_top_workPage();
    })
})