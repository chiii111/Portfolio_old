$(function(){


    let $goToTopBtnBox = $(".goToTop_btn_box");
    let topOffset = $goToTopBtnBox.offset().top;
    let $goToTopBtn = $(".goToTop_btn");
    $goToTopBtn.click(function(){
        console.log(topOffset);
        $(window).scrollTop(topOffset);
    })

    let $hbBtn = $(".hb_btn");
    let $mainNav = $(".mainNav")
    let $htmlAndBody = $("html,body")
    $hbBtn.click(function(){
        $hbBtn.toggleClass("active");
        $mainNav.toggleClass("active");
        // $htmlAndBody.toggleClass("active");
    })
    
})