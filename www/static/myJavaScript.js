$(document).ready(
    function() {
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

        //provides "website movement from section to section" mechanic for menu buttons
        $(document).on('click', 'a[href^="#"]', function(e) {
            // target element id
            var id = $(this).attr('href');

            // target element
            var $id = $(id);
            if ($id.length === 0) {
                return;
            }

            // prevent standard hash navigation (avoid blinking in IE)
            e.preventDefault();

            // top position relative to the document
            var pos = $id.offset().top - 80;
            pos = Math.ceil(pos);

            // animated top scrolling
            $('body, html').animate({scrollTop: pos});
        });

        //makes menu background solid if user is NOT scrolled up at the very top
        //...also keeps menu button underlined/bolded if currently located at that section
        if($(window).scrollTop() === 0){
            $("#headerBG").stop().animate({opacity: 0}, 500);
        }
        else{
            $("#headerBG").stop().animate({opacity: 1}, 500);
        }


        var $scrollTop     = $(window).scrollTop();
        var $searchPageOffset = $('#search').offset().top;
        var $downloadsPageOffset = $('#downloads').offset().top;
        var $aboutPageOffset = $('#about').offset().top;
        var $backgroundPageOffset = $('#background').offset().top;

        if($scrollTop < ($searchPageOffset - 80)){
            $("#homeMenuButtonText").css("fontWeight", "bold");
            $("#homeMenuButtonText").css("textDecoration", "underline");
            $("#miniMenuCurrentSection").text("HOME");
        }
        else{
            $("#homeMenuButtonText").css("fontWeight", "normal");
            $("#homeMenuButtonText").css("textDecoration", "none");
        }
        if($scrollTop >= ($searchPageOffset - 80)){
            if($scrollTop < ($downloadsPageOffset - 80)){
                $("#searchMenuButtonText").css("fontWeight", "bold");
                $("#searchMenuButtonText").css("textDecoration", "underline");
                $("#miniMenuCurrentSection").text("SEARCH");
            }
            else{
                $("#searchMenuButtonText").css("fontWeight", "normal");
                $("#searchMenuButtonText").css("textDecoration", "none");
            }
        }
        else{
            $("#searchMenuButtonText").css("fontWeight", "normal");
            $("#searchMenuButtonText").css("textDecoration", "none");
        }
        if($scrollTop >= ($downloadsPageOffset - 80)){
            if($scrollTop < ($aboutPageOffset - 80)){
                $("#downloadsMenuButtonText").css("fontWeight", "bold");
                $("#downloadsMenuButtonText").css("textDecoration", "underline");
                $("#miniMenuCurrentSection").text("DOWNLOADS");
            }
            else{
                $("#downloadsMenuButtonText").css("fontWeight", "normal");
                $("#downloadsMenuButtonText").css("textDecoration", "none");
            }
        }
        else{
            $("#downloadsMenuButtonText").css("fontWeight", "normal");
            $("#downloadsMenuButtonText").css("textDecoration", "none");
        }
        if($scrollTop >= ($aboutPageOffset - 80)){
            if($scrollTop < ($backgroundPageOffset - 80)){
                $("#aboutMenuButtonText").css("fontWeight", "bold");
                $("#aboutMenuButtonText").css("textDecoration", "underline");
                $("#miniMenuCurrentSection").text("ABOUT");
            }
            else{
                $("#aboutMenuButtonText").css("fontWeight", "normal");
                $("#aboutMenuButtonText").css("textDecoration", "none");
            }
        }
        else{
            $("#aboutMenuButtonText").css("fontWeight", "normal");
            $("#aboutMenuButtonText").css("textDecoration", "none");
        }
        if($scrollTop >= ($backgroundPageOffset - 80)){
            $("#backgroundMenuButtonText").css("fontWeight", "bold");
            $("#backgroundMenuButtonText").css("textDecoration", "underline");
            $("#miniMenuCurrentSection").text("BACKGROUND");
        }
        else{
            $("#backgroundMenuButtonText").css("fontWeight", "normal");
            $("#backgroundMenuButtonText").css("textDecoration", "none");
        }

        $(window).on("scroll",
            function(){
                if($(window).scrollTop() === 0){
                    $("#headerBG").stop().animate({opacity: 0}, 500);
                }
                else{
                    $("#headerBG").stop().animate({opacity: 1}, 500);
                }

                //keeps menu button underlined/bolded if currently located at that section
                $scrollTop = $(window).scrollTop();
                if($scrollTop < ($searchPageOffset - 80)){
                    $("#homeMenuButtonText").css("fontWeight", "bold");
                    $("#homeMenuButtonText").css("textDecoration", "underline");
                    $("#miniMenuCurrentSection").text("HOME");
                }
                else{
                    $("#homeMenuButtonText").css("fontWeight", "normal");
                    $("#homeMenuButtonText").css("textDecoration", "none");
                }
                if($scrollTop >= ($searchPageOffset - 80)){
                    if($scrollTop < ($downloadsPageOffset - 80)){
                        $("#searchMenuButtonText").css("fontWeight", "bold");
                        $("#searchMenuButtonText").css("textDecoration", "underline");
                        $("#miniMenuCurrentSection").text("SEARCH");
                    }
                    else{
                        $("#searchMenuButtonText").css("fontWeight", "normal");
                        $("#searchMenuButtonText").css("textDecoration", "none");
                    }
                }
                else{
                    $("#searchMenuButtonText").css("fontWeight", "normal");
                    $("#searchMenuButtonText").css("textDecoration", "none");
                }
                if($scrollTop >= ($downloadsPageOffset - 80)){
                    if($scrollTop < ($backgroundPageOffset - 80)){
                        $("#downloadsMenuButtonText").css("fontWeight", "bold");
                        $("#downloadsMenuButtonText").css("textDecoration", "underline");
                        $("#miniMenuCurrentSection").text("DOWNLOADS");
                    }
                    else{
                        $("#downloadsMenuButtonText").css("fontWeight", "normal");
                        $("#downloadsMenuButtonText").css("textDecoration", "none");
                    }
                }
                else{
                    $("#downloadsMenuButtonText").css("fontWeight", "normal");
                    $("#downloadsMenuButtonText").css("textDecoration", "none");
                }
                if($scrollTop >= ($backgroundPageOffset - 80)){
                    if($scrollTop < ($aboutPageOffset - 80)){
                        $("#backgroundMenuButtonText").css("fontWeight", "bold");
                        $("#backgroundMenuButtonText").css("textDecoration", "underline");
                        $("#miniMenuCurrentSection").text("BACKGROUND");
                    }
                    else{
                        $("#backgroundMenuButtonText").css("fontWeight", "normal");
                        $("#backgroundMenuButtonText").css("textDecoration", "none");
                    }
                }
                else{
                    $("#backgroundMenuButtonText").css("fontWeight", "normal");
                    $("#backgroundMenuButtonText").css("textDecoration", "none");
                }
                if($scrollTop >= ($aboutPageOffset - 80)){
                    $("#aboutMenuButtonText").css("fontWeight", "bold");
                    $("#aboutMenuButtonText").css("textDecoration", "underline");
                    $("#miniMenuCurrentSection").text("ABOUT");
                }
                else{
                    $("#aboutMenuButtonText").css("fontWeight", "normal");
                    $("#aboutMenuButtonText").css("textDecoration", "none");
                }
            }
        );

        //gives header logo lit-up effect when hovering above it
        $("#logo").hover(
            function () {
                $("#logo").attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/logoHover.png");
            },
            function () {
                $("#logo").attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/logo.png");
            }
        );


        var $mbWidth1 = $("#homeMenuButtonText").css("width");
        var $mbWidth2 = $("#searchMenuButtonText").css("width");
        var $mbWidth3 = $("#downloadsMenuButtonText").css("width");
        var $mbWidth4 = $("#aboutMenuButtonText").css("width");
        var $mbWidth5 = $("#backgroundMenuButtonText").css("width");
        $("#mb1UL").css("width", $mbWidth1);
        $("#mb2UL").css("width", $mbWidth2);
        $("#mb3UL").css("width", $mbWidth3);
        $("#mb4UL").css("width", $mbWidth4);
        $("#mb5UL").css("width", $mbWidth5);
        $("#homeMenuButton").hover(
            function(){
                if($("#mb1UL").queue("fx") == 0)
                    $("#mb1UL").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb1UL").hide("slide", { direction: "right" }, 1000);
            }
        );
        $("#searchMenuButton").hover(
            function(){
                if($("#mb2UL").queue("fx") == 0)
                    $("#mb2UL").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb2UL").hide("slide", { direction: "right" }, 1000);
            }
        );
        $("#downloadsMenuButton").hover(
            function(){
                if($("#mb3UL").queue("fx") == 0)
                    $("#mb3UL").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb3UL").hide("slide", { direction: "right" }, 1000);
            }
        );
        $("#aboutMenuButton").hover(
            function(){
                if($("#mb4UL").queue("fx") == 0)
                    $("#mb4UL").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb4UL").hide("slide", { direction: "right" }, 1000);
            }
        );
        $("#backgroundMenuButton").hover(
            function(){
                if($("#mb5UL").queue("fx") == 0)
                    $("#mb5UL").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb5UL").hide("slide", { direction: "right" }, 1000);
            }
        );

        //sets width of left and right menus to be equal, based on width of logo
        //...this keeps the logo always centered, no matter how many menu options on either side
        var menu = $(".menu");
        var logo = $("#logo");
        var menuWidth;
        menuWidth = $("#header").css("width");
        menuWidth = menuWidth.replace("px", "");
        menuWidth = menuWidth - logo.css("width").replace("px", "");
        menuWidth = menuWidth / 2;
        menu.css("width", menuWidth + "px");

        //adjusts search "go" button "1-pixel-too-short" height issue
        if(isIE)
            $("#searchGObutton").css("paddingBottom", "7px");


        var $window = $(window);
        var windowsize;
        function checkWidth() {
            windowsize = $window.width();

            //shows mini-menu instead if window width is too small to show all menu options horizontally
            if (windowsize < 984) {
                $("#header").css("visibility", "hidden");
                $("#headerBG").css("visibility", "hidden");
                $("#headerMini").css("visibility", "visible");
            }
            else{
                $("#header").css("visibility", "visible");
                $("#headerBG").css("visibility", "visible");
                $("#headerMini").css("visibility", "hidden");
                $("#header_content_mini").css("display", "none");
            }

            //adjusts mini-menu width when window resizes
            if (windowsize < 735) {
                $("#headerMiniCenteringDiv").css("width", "100%");
            }
            else{
                $("#headerMiniCenteringDiv").css("width", "735px");
            }



            //clips mini-menu logo if width gets too small to show entire logo
            if (windowsize < 550) {
                $("#logoMini").css("clip", "rect(0px, 150px, 60px, 0px");
            }
            else{
                $("#logoMini").css("clip", "auto");
            }

            //hides mini-menu current section if window width gets too small
            if (windowsize < 340) {
                $("#miniMenuCurrentSection").css("display", "none");
            }
            else{
                $("#miniMenuCurrentSection").css("display", "inline");
            }

            //decreases home/search page content width if window width gets too small
            if (windowsize < 735) {
                $("#searchTool").css("margin", "0");
                $("#searchTool").css("width", "100%");
                $("#contactForm").css("width", "100%");
            }
            else if (windowsize < 984) {
                $("#searchTool").css("margin", "0 auto");
                $("#searchTool").css("width", "695px");
                $(".pageSection").css("max-width", "695px");
                $("#contactForm").css("width", "695px");
            }
            else{
                $("#searchTool").css("margin", "0");
                $("#searchTool").css("width", "100%");
                $(".pageSection").css("max-width", "944px");
                $("#contactForm").css("width", "944px");
            }

            //tile species circles vertically if species selection bar width too low
            if(windowsize < 735){
                $("#speciesSelectionContainer").css("width", "220px");
                $("#speciesSelectionContainer").css("height", "685px");
                if(isFirefox)
                    $("#speciesSelectionContainer").css("margin-bottom", "15px");

                $("#speciesSelections").css("width", "140px");
                $("#speciesSelections").css("height", "685px");
                $("#speciesSelections").css("left", "30px");

                $("#speciesSelection1").css("width", "140px");
                $("#speciesSelection1").css("height", "685px");

                $("#speciesSelection2").css("width", "140px");
                $("#speciesSelection2").css("height", "685px");

                $(".speciesIcon").css("display", "block");
                $(".speciesIcon").css("padding", "0");
                $(".speciesIcon").css("margin-top", "25px");

                $("#wormIconCont").css("margin-top", "0px");

                $("#humanIconCont").css("margin-top", "0px");

                $("#speciesLeftArrow").css("position", "absolute");
                $("#speciesLeftArrow").css("top", "305px");
                $("#speciesLeftArrow").css("margin-top", "0");

                $("#speciesRightArrow").css("right", "15px");
                $("#speciesRightArrow").css("top", "305px");
            }
            else{
                $("#speciesSelectionContainer").css("width", "944px");
                $("#speciesSelectionContainer").css("height", "160px");
                $("#speciesSelectionContainer").css("margin-bottom", "0px");

                $("#speciesSelections").css("width", "auto");
                $("#speciesSelections").css("height", "inherit");
                $("#speciesSelections").css("left", "0px");

                $("#speciesSelection1").css("width", "inherit");
                $("#speciesSelection1").css("height", "inherit");

                $("#speciesSelection2").css("width", "inherit");
                $("#speciesSelection2").css("height", "inherit");

                $(".speciesIcon").css("display", "table-cell");
                $(".speciesIcon").css("padding-left", "30px");
                $(".speciesIcon").css("padding-right", "30px");
                $(".speciesIcon").css("margin-top", "0px");

                $("#wormIconCont").css("padding-left", "0px");

                $("#humanIconCont").css("padding-left", "0px");

                $("#chickenIconCont").css("padding-right", "0px");

                $("#pigIconCont").css("padding-right", "0px");

                $("#speciesLeftArrow").css("position", "relative");
                $("#speciesLeftArrow").css("top", "0px");
                $("#speciesLeftArrow").css("margin-top", "40px");

                $("#speciesRightArrow").css("right", "245px");
                $("#speciesRightArrow").css("top", "40px");
            }

            //move search type buttons to their own line if width gets too small
            //...buttons on same line
            if (windowsize < 984) {
                $("#bySirnaSeq").insertAfter($("#speciesSelectionContainer"));
                $("#byMrnaName").insertAfter($("#bySirnaSeq"));
                $(".searchType").css("display", "inline-block");
                $(".searchType").css("position", "relative");
                $(".searchType").css("top", "0");
                $(".searchType").css("width", "323px");
                $(".searchType").css("text-align", "center");
            }
            else{
                $("#bySirnaSeq").insertAfter($("#speciesRightArrow"));
                $("#byMrnaName").insertAfter($("#bySirnaSeq"));
                $(".searchType").css("display", "table-cell");
                $(".searchType").css("position", "absolute");
                $("#bySirnaSeq").css("top", "15px");
                $("#byMrnaName").css("top", "85px");
                $(".searchType").css("width", "200px");
                $(".searchType").css("text-align", "right");
            }

            //make search type buttons width scalable when width gets even smaller
            //...buttons NOT on same line
            if (windowsize < 735) {
                $(".searchType").css("display", "block");
                $(".searchType").css("width", "auto");
                $(".searchType").css("max-width", "323px");
                $(".searchType").css("margin", "0 auto");
                $("#byMrnaName").css("margin-top", "20px");
            }
            else{
                if(windowsize < 984) {
                    $(".searchType").css("display", "inline-block");
                    $(".searchType").css("width", "323px");
                    $(".searchType").css("max-width", "323px");
                }
                else {
                    $(".searchType").css("display", "table-cell");
                    $(".searchType").css("width", "200px");
                    $(".searchType").css("max-width", "200px");
                }
                $(".searchType").css("margin", "0");
            }

            //adjust search input text box / mismatch options / submit button if window width gets too small
            if (windowsize < 735) {
                $("#searchInputText").css("width", "50%");
                $("#searchInputText").css("display", "block");
                $("#searchInputText").css("margin", "0 auto");

                $("#searchForm").css("display", "inline-block");
                $("#searchForm").css("width", "100%");
                $("#searchForm").css("background", "none");

                $("#mismatchesLabel").css("color", "white");
                $("#mismatchesLabel").css("display", "block");
                $("#mismatchesLabel").css("text-align", "center");
                $("#mismatchesLabel").css("font-size", "14px");
                $("#mismatchesLabel").css("margin-top", "10px");

                $("#mismatchBox").css("margin", "0 auto");
                $("#mismatchBox").css("display", "block");
                $("#mismatchBox").css("width", "95px");

                $("#mismatch0Label").css("color", "white");
                $("#mismatch0Label").css("font-size", "14px");
                $("#mismatch1Label").css("color", "white");
                $("#mismatch1Label").css("font-size", "14px");
                $("#mismatch2Label").css("color", "white");
                $("#mismatch2Label").css("font-size", "14px");
                $("#mismatch2Label").css("padding-right", "0px");

                $("#searchGObutton").css("display", "block");
                $("#searchGObutton").css("margin", "0 auto");
                $("#searchGObutton").css("margin-top", "10px");
            }
            else if (windowsize < 984) {
                $("#searchInputText").css("width", "270px");
                $("#searchInputText").css("display", "inline-block");
                $("#searchInputText").css("margin", "0");

                $("#searchForm").css("display", "inline-block");
                $("#searchForm").css("width", "695px");
                $("#searchForm").css("background", "white");

                $("#mismatchesLabel").css("color", "purple");
                $("#mismatchesLabel").css("display", "inline");
                $("#mismatchesLabel").css("text-align", "left");
                $("#mismatchesLabel").css("font-size", "18px");
                $("#mismatchesLabel").css("margin-top", "0px");

                $("#mismatchBox").css("margin", "0");
                $("#mismatchBox").css("display", "inline");
                $("#mismatchBox").css("width", "auto");

                $("#mismatch0Label").css("color", "purple");
                $("#mismatch0Label").css("font-size", "18px");
                $("#mismatch1Label").css("color", "purple");
                $("#mismatch1Label").css("font-size", "18px");
                $("#mismatch2Label").css("color", "purple");
                $("#mismatch2Label").css("font-size", "18px");
                $("#mismatch2Label").css("padding-right", "10px");

                $("#searchGObutton").css("display", "inline-block");
                $("#searchGObutton").css("margin", "0");
            }
            else{
                $("#searchInputText").css("width", "519px");
                $("#searchInputText").css("display", "inline-block");
                $("#searchInputText").css("margin", "0");

                $("#searchForm").css("display", "block");
                $("#searchForm").css("width", "944px");
                $("#searchForm").css("background", "white");

                $("#mismatchesLabel").css("color", "purple");
                $("#mismatchesLabel").css("display", "inline");
                $("#mismatchesLabel").css("text-align", "left");
                $("#mismatchesLabel").css("font-size", "18px");
                $("#mismatchesLabel").css("margin-top", "0px");

                $("#mismatchBox").css("margin", "0");
                $("#mismatchBox").css("display", "inline");
                $("#mismatchBox").css("width", "auto");

                $("#mismatch0Label").css("color", "purple");
                $("#mismatch0Label").css("font-size", "18px");
                $("#mismatch1Label").css("color", "purple");
                $("#mismatch1Label").css("font-size", "18px");
                $("#mismatch2Label").css("color", "purple");
                $("#mismatch2Label").css("font-size", "18px");
                $("#mismatch2Label").css("padding-right", "10px");

                $("#searchGObutton").css("display", "inline-block");
                $("#searchGObutton").css("margin", "0");
            }
        }
        // Execute on load
        checkWidth();
        // Bind event listener
        $(window).resize(checkWidth);

        //provides logic to expand or retract mini menu upon clicking the top right icon
        var $expand = $("#menuExpandIcon");
        var $miniButtons = $("#header_content_mini");
        var $miniLogo = $("#logoMini");
        $expand.click(
            function(){
                $miniButtons.slideToggle();
                $expand.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/menuExpand_icon_hover.png");
                $miniLogo.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/logoHover.png");
            }
        );
        $expand.hover(
            function(){
                $expand.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/menuExpand_icon_hover.png");
            },
            function(){
                if($miniButtons.css("display") == "none") {
                    $expand.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/menuExpand_icon.png");
                    $miniLogo.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/logo.png");
                }
                else
                    $expand.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/menuExpand_icon_hover.png");
            }
        );

        //gives MINI header logo lit-up effect when hovering above it
        $miniLogo.hover(
            function () {
                $miniLogo.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/logoHover.png");
            },
            function () {
                if($miniButtons.css("display") == "none")
                    $miniLogo.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/logo.png");
                else
                    $miniLogo.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/logoHover.png");
            }
        );





        var $miniLinks = $(".menuLinksMini");
        $miniLinks.click(function(){
            $miniButtons.slideToggle();
        });






        $("#mb1ULMini").css("width", $mbWidth1);
        $("#mb2ULMini").css("width", $mbWidth2);
        $("#mb3ULMini").css("width", $mbWidth3);
        $("#mb4ULMini").css("width", $mbWidth4);
        $("#mb5ULMini").css("width", $mbWidth5);
        $("#homeMenuButtonMini").hover(
            function(){
                if($("#mb1ULMini").queue("fx") == 0)
                    $("#mb1ULMini").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb1ULMini").hide("slide", { direction: "right" }, 1000);
            }
        );
        $("#searchMenuButtonMini").hover(
            function(){
                if($("#mb2ULMini").queue("fx") == 0)
                    $("#mb2ULMini").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb2ULMini").hide("slide", { direction: "right" }, 1000);
            }
        );
        $("#downloadsMenuButtonMini").hover(
            function(){
                if($("#mb3ULMini").queue("fx") == 0)
                    $("#mb3ULMini").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb3ULMini").hide("slide", { direction: "right" }, 1000);
            }
        );
        $("#aboutMenuButtonMini").hover(
            function(){
                if($("#mb4ULMini").queue("fx") == 0)
                    $("#mb4ULMini").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb4ULMini").hide("slide", { direction: "right" }, 1000);
            }
        );
        $("#backgroundMenuButtonMini").hover(
            function(){
                if($("#mb5ULMini").queue("fx") == 0)
                    $("#mb5ULMini").show("slide", { direction: "left" }, 1000);
            },
            function(){
                $("#mb5ULMini").hide("slide", { direction: "right" }, 1000);
            }
        );


























        var $vid = $('#homepageVid');
        var $home = $('#homepage');

        var $resizedWidth = screen.availWidth; //$vid.css("width");
        var $resizedHeight = screen.availHeight - 100; //$vid.css("height");

        //ensures background video width doesn't scale down when window resizes
        $vid.css("width", $resizedWidth);
        $vid.css("height", $resizedHeight);

        //centers background video when window shrinks below max since vid becomes larger than containing div
        $("#homepage>#homepageVid").each(function(i, img) {
            $vid.css({
                left: ($(img).parent().width() - $(img).width()) / 2
                ,top: (window.innerHeight - $(img).height()) / 2
            });
        });


        //window resize behavior
        $(window).resize(
            function(){
                //ensures homepage background video width doesn't scale down when window resizes
                $vid.css("width", $resizedWidth);
                $vid.css("height", $resizedHeight);

                //centers background video when window shrinks below max since vid becomes larger than containing div
                $("#homepage>#homepageVid").each(function(i, img) {
                    $vid.css({
                        left: ($(img).parent().width() - $(img).width()) / 2
                        ,top: (window.innerHeight - $(img).height()) / 2
                    });
                });

                if($(window).scrollTop() === 0){
                    $("#headerBG").stop().animate({opacity: 0}, 500);
                }
                else{
                    $("#headerBG").stop().animate({opacity: 1}, 500);
                }

                $searchPageOffset = $('#search').offset().top;
                $downloadsPageOffset = $('#downloads').offset().top;
                $aboutPageOffset = $('#about').offset().top;
                $backgroundPageOffset = $('#background').offset().top;
                resultsTopOffset = $searchPageOffset;
                $("#searchResults").css("top", resultsTopOffset);
            }
        );

        //makes specie icon glow when hovering over it (background color appears for IE browsers since glow not supported on IE)
        var wormC = $("#wormIconCont");
        var worm = $("#wormIcon");

        wormC.hover(
            function(){
                if(isIE){
                    wormC.css("background", "hsla(60, 100%, 50%, 0.25)");
                }
                else {
                    worm.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    worm.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    worm.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    worm.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    worm.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
            },
            function() {
                if(wormC.css("font-weight") != "700") {
                    if (isIE) {
                        wormC.css("background", "none");
                    }
                    else {
                        worm.css("-webkit-filter", "none");
                        worm.css("-moz-filter", "none");
                        worm.css("-ms-filter", "none");
                        worm.css("-o-filter", "none");
                        worm.css("filter", "none");
                    }
                    wormC.css("font-weight", "normal");
                }
            }
        );

        /*var zFishC = $("#zebrafishIconCont");
        var zFish = $("#zebrafishIcon");
        zFishC.hover(
            function(){
                if(isIE){
                    zFishC.css("background", "hsla(280, 100%, 50%, 0.25)");
                }
                else {
                    zFish.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    zFish.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    zFish.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    zFish.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    zFish.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
            },
            function() {
                if(zFishC.css("font-weight") != "700") {
                    if (isIE) {
                        zFishC.css("background", "none");
                    }
                    else {
                        zFish.css("-webkit-filter", "none");
                        zFish.css("-moz-filter", "none");
                        zFish.css("-ms-filter", "none");
                        zFish.css("-o-filter", "none");
                        zFish.css("filter", "none");
                    }
                    zFishC.css("font-weight", "normal");
                }
            }
        );

        var fFlyC = $("#fruitflyIconCont");
        var fFly = $("#fruitflyIcon");
        fFlyC.hover(
            function(){
                if(isIE){
                    fFlyC.css("background", "hsla(110, 100%, 50%, 0.25)");
                }
                else {
                    fFly.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    fFly.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    fFly.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    fFly.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    fFly.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
            },
            function() {
                if(fFlyC.css("font-weight") != "700") {
                    if (isIE) {
                        fFlyC.css("background", "none");
                    }
                    else {
                        fFly.css("-webkit-filter", "none");
                        fFly.css("-moz-filter", "none");
                        fFly.css("-ms-filter", "none");
                        fFly.css("-o-filter", "none");
                        fFly.css("filter", "none");
                    }
                    fFlyC.css("font-weight", "normal");
                }
            }
        );

        var chickenC = $("#chickenIconCont");
        var chicken = $("#chickenIcon");
        chickenC.hover(
            function(){
                if(isIE){
                    chickenC.css("background", "hsla(0, 100%, 50%, 0.25)");
                }
                else {
                    chicken.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    chicken.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    chicken.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    chicken.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    chicken.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
            },
            function() {
                if(chickenC.css("font-weight") != "700") {
                    if (isIE) {
                        chickenC.css("background", "none");
                    }
                    else {
                        chicken.css("-webkit-filter", "none");
                        chicken.css("-moz-filter", "none");
                        chicken.css("-ms-filter", "none");
                        chicken.css("-o-filter", "none");
                        chicken.css("filter", "none");
                    }
                    chickenC.css("font-weight", "normal");
                }
            }
        );

        var humanC = $("#humanIconCont");
        var human = $("#humanIcon");
        humanC.hover(
            function(){
                if(isIE){
                    humanC.css("background", "hsla(120, 100%, 50%, 0.25)");
                }
                else {
                    human.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    human.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    human.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    human.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    human.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
            },
            function() {
                if(humanC.css("font-weight") != "700") {
                    if (isIE) {
                        humanC.css("background", "none");
                    }
                    else {
                        human.css("-webkit-filter", "none");
                        human.css("-moz-filter", "none");
                        human.css("-ms-filter", "none");
                        human.css("-o-filter", "none");
                        human.css("filter", "none");
                    }
                    humanC.css("font-weight", "normal");
                }
            }
        );

        var sUrchinC = $("#seaUrchinIconCont");
        var sUrchin = $("#seaUrchinIcon");
        sUrchinC.hover(
            function(){
                if(isIE){
                    sUrchinC.css("background", "hsla(210, 100%, 50%, 0.25)");
                }
                else {
                    sUrchin.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    sUrchin.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    sUrchin.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    sUrchin.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    sUrchin.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
            },
            function() {
                if(sUrchinC.css("font-weight") != "700") {
                    if (isIE) {
                        sUrchinC.css("background", "none");
                    }
                    else {
                        sUrchin.css("-webkit-filter", "none");
                        sUrchin.css("-moz-filter", "none");
                        sUrchin.css("-ms-filter", "none");
                        sUrchin.css("-o-filter", "none");
                        sUrchin.css("filter", "none");
                    }
                    sUrchinC.css("font-weight", "normal");
                }
            }
        );

        var mouseC = $("#mouseIconCont");
        var mouse = $("#mouseIcon");
        mouseC.hover(
            function(){
                if(isIE){
                    mouseC.css("background", "hsla(280, 25%, 50%, 0.25)");
                }
                else {
                    mouse.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    mouse.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    mouse.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    mouse.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    mouse.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
            },
            function() {
                if(mouseC.css("font-weight") != "700") {
                    if (isIE) {
                        mouseC.css("background", "none");
                    }
                    else {
                        mouse.css("-webkit-filter", "none");
                        mouse.css("-moz-filter", "none");
                        mouse.css("-ms-filter", "none");
                        mouse.css("-o-filter", "none");
                        mouse.css("filter", "none");
                    }
                    mouseC.css("font-weight", "normal");
                }
            }
        );*/

        var pigC = $("#pigIconCont");
        var pig = $("#pigIcon");
        pigC.hover(
            function(){
                if(isIE){
                    pigC.css("background", "hsla(58, 100%, 50%, 0.25)");
                }
                else {
                    pig.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    pig.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    pig.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    pig.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    pig.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
            },
            function() {
                if(pigC.css("font-weight") != "700") {
                    if (isIE) {
                        pigC.css("background", "none");
                    }
                    else {
                        pig.css("-webkit-filter", "none");
                        pig.css("-moz-filter", "none");
                        pig.css("-ms-filter", "none");
                        pig.css("-o-filter", "none");
                        pig.css("filter", "none");
                    }
                    pigC.css("font-weight", "normal");
                }
            }
        );

        //makes glow/background stay if specie icon clicked until other specie icon clicked
        var allSpecieConts = $(".speciesIcon");
        var allSpecieImgs = $(".speciesImg");
        wormC.click(
            function(){
                //first unset all icons
                allSpecieConts.css("font-weight", "normal");
                if(isIE) {
                    allSpecieConts.css("background", "none");
                }
                else {
                    allSpecieImgs.css("-webkit-filter", "none");
                    allSpecieImgs.css("-moz-filter", "none");
                    allSpecieImgs.css("-ms-filter", "none");
                    allSpecieImgs.css("-o-filter", "none");
                    allSpecieImgs.css("filter", "none");
                }
                //then set only for this one
                wormC.css("font-weight", "bold");
                if(isIE){
                    wormC.css("background", "hsla(60, 100%, 50%, 0.25)")
                }
                else {
                    worm.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    worm.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    worm.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    worm.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    worm.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
                //changes value of hidden species input box to this species name
                $("#speciesBox").attr("value", "Caenorhabditis elegans");
            }
        );

        /*zFishC.click(
            function(){
                //first unset all icons
                allSpecieConts.css("font-weight", "normal");
                if(isIE) {
                    allSpecieConts.css("background", "none");
                }
                else {
                    allSpecieImgs.css("-webkit-filter", "none");
                    allSpecieImgs.css("-moz-filter", "none");
                    allSpecieImgs.css("-ms-filter", "none");
                    allSpecieImgs.css("-o-filter", "none");
                    allSpecieImgs.css("filter", "none");
                }
                //then set only for this one
                zFishC.css("font-weight", "bold");
                if(isIE){
                    zFishC.css("background", "hsla(280, 100%, 50%, 0.25)")
                }
                else {
                    zFish.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    zFish.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    zFish.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    zFish.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    zFish.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
				//changes value of hidden species input box to this species name
				$("#speciesBox").attr("value", "Danio rerio");
            }
        );

        fFlyC.click(
            function(){
                //first unset all icons
                allSpecieConts.css("font-weight", "normal");
                if(isIE) {
                    allSpecieConts.css("background", "none");
                }
                else {
                    allSpecieImgs.css("-webkit-filter", "none");
                    allSpecieImgs.css("-moz-filter", "none");
                    allSpecieImgs.css("-ms-filter", "none");
                    allSpecieImgs.css("-o-filter", "none");
                    allSpecieImgs.css("filter", "none");
                }
                //then set only for this one
                fFlyC.css("font-weight", "bold");
                if(isIE){
                    fFlyC.css("background", "hsla(110, 100%, 50%, 0.25)")
                }
                else {
                    fFly.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    fFly.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    fFly.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    fFly.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    fFly.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
				//changes value of hidden species input box to this species name
				$("#speciesBox").attr("value", "Drosophila melanogaster");
            }
        );

        chickenC.click(
            function(){
                //first unset all icons
                allSpecieConts.css("font-weight", "normal");
                if(isIE) {
                    allSpecieConts.css("background", "none");
                }
                else {
                    allSpecieImgs.css("-webkit-filter", "none");
                    allSpecieImgs.css("-moz-filter", "none");
                    allSpecieImgs.css("-ms-filter", "none");
                    allSpecieImgs.css("-o-filter", "none");
                    allSpecieImgs.css("filter", "none");
                }
                //then set only for this one
                chickenC.css("font-weight", "bold");
                if(isIE){
                    chickenC.css("background", "hsla(0, 100%, 50%, 0.25)")
                }
                else {
                    chicken.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    chicken.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    chicken.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    chicken.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    chicken.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
				//changes value of hidden species input box to this species name
				$("#speciesBox").attr("value", "Gallus gallus");
            }
        );

        humanC.click(
            function(){
                //first unset all icons
                allSpecieConts.css("font-weight", "normal");
                if(isIE) {
                    allSpecieConts.css("background", "none");
                }
                else {
                    allSpecieImgs.css("-webkit-filter", "none");
                    allSpecieImgs.css("-moz-filter", "none");
                    allSpecieImgs.css("-ms-filter", "none");
                    allSpecieImgs.css("-o-filter", "none");
                    allSpecieImgs.css("filter", "none");
                }
                //then set only for this one
                humanC.css("font-weight", "bold");
                if(isIE){
                    humanC.css("background", "hsla(120, 100%, 50%, 0.25)")
                }
                else {
                    human.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    human.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    human.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    human.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    human.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
				//changes value of hidden species input box to this species name
				$("#speciesBox").attr("value", "Homo sapiens");
            }
        );

        sUrchinC.click(
            function(){
                //first unset all icons
                allSpecieConts.css("font-weight", "normal");
                if(isIE) {
                    allSpecieConts.css("background", "none");
                }
                else {
                    allSpecieImgs.css("-webkit-filter", "none");
                    allSpecieImgs.css("-moz-filter", "none");
                    allSpecieImgs.css("-ms-filter", "none");
                    allSpecieImgs.css("-o-filter", "none");
                    allSpecieImgs.css("filter", "none");
                }
                //then set only for this one
                sUrchinC.css("font-weight", "bold");
                if(isIE){
                    sUrchinC.css("background", "hsla(210, 100%, 50%, 0.25)");
                }
                else {
                    sUrchin.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    sUrchin.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    sUrchin.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    sUrchin.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    sUrchin.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
				//changes value of hidden species input box to this species name
				$("#speciesBox").attr("value", "Paracentrotus lividus");
            }
        );

        mouseC.click(
            function(){
                //first unset all icons
                allSpecieConts.css("font-weight", "normal");
                if(isIE) {
                    allSpecieConts.css("background", "none");
                }
                else {
                    allSpecieImgs.css("-webkit-filter", "none");
                    allSpecieImgs.css("-moz-filter", "none");
                    allSpecieImgs.css("-ms-filter", "none");
                    allSpecieImgs.css("-o-filter", "none");
                    allSpecieImgs.css("filter", "none");
                }
                //then set only for this one
                mouseC.css("font-weight", "bold");
                if(isIE){
                    mouseC.css("background", "hsla(280, 25%, 50%, 0.25)");
                }
                else {
                    mouse.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    mouse.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    mouse.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    mouse.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    mouse.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
				//changes value of hidden species input box to this species name
				$("#speciesBox").attr("value", "Mus musculus");
            }
        );*/

        pigC.click(
            function(){
                //first unset all icons
                allSpecieConts.css("font-weight", "normal");
                if(isIE) {
                    allSpecieConts.css("background", "none");
                }
                else {
                    allSpecieImgs.css("-webkit-filter", "none");
                    allSpecieImgs.css("-moz-filter", "none");
                    allSpecieImgs.css("-ms-filter", "none");
                    allSpecieImgs.css("-o-filter", "none");
                    allSpecieImgs.css("filter", "none");
                }
                //then set only for this one
                pigC.css("font-weight", "bold");
                if(isIE){
                    pigC.css("background", "hsla(58, 100%, 50%, 0.25)");
                }
                else {
                    pig.css("-webkit-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    pig.css("-moz-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    pig.css("-ms-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    pig.css("-o-filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                    pig.css("filter", "drop-shadow(0 0 8px rgba(255,255,255,1))");
                }
                //changes value of hidden species input box to this species name
                $("#speciesBox").attr("value", "Sus domesticus");
            }
        );

        //lights up left or right arrow button for selecting species icon when hovering cursor above them
        var leftArrow = $("#speciesLeftArrow");
        var rightArrow = $("#speciesRightArrow");
        leftArrow.hover(
            function(){
                leftArrow.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/arrow-left_hover.png");
            },
            function(){
                leftArrow.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/arrow-left.png")
            }
        );
        rightArrow.hover(
            function(){
                rightArrow.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/arrow-right_hover.png");
            },
            function(){
                rightArrow.attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/arrow-right.png")
            }
        );

        //scrolls species selection icons left or right when clicking the side arrow buttons
        var species1 = $("#speciesSelection1");
        var species2 = $("#speciesSelection2");
        var currentFour = 1;
        species2.hide();
        leftArrow.click(
            function(){
                if(currentFour == 1){
                    species1.hide("slide", { direction: "left" }, 1000);
                    species2.delay(85).show("slide", { direction: "right" }, 1000);
                    currentFour = 2;
                }
                else if(currentFour == 2){
                    species2.hide("slide", { direction: "right" }, 1000);
                    species1.delay(85).show("slide", { direction: "left" }, 1000);
                    currentFour = 1;
                }
            }
        );
        rightArrow.click(
            function(){
                if(currentFour == 1){
                    species1.hide("slide", { direction: "left" }, 1000);
                    species2.delay(85).show("slide", { direction: "right" }, 1000);
                    currentFour = 2;
                }
                else if(currentFour == 2){
                    species2.hide("slide", { direction: "right" }, 1000);
                    species1.delay(85).show("slide", { direction: "left" }, 1000);
                    currentFour = 1;
                }
            }
        );





        //makes background of SEARCH TYPE buttons lighter/darker upon hovering/clicking them
        var bySIR = $("#bySirnaSeq");
        bySIR.hover(
            function(){
                bySIR.css("background", "hsla(240, 75%, 50%, 1)");
            },
            function() {
                if(bySIR.css("font-weight") != "700") {
                    bySIR.css("background", "hsla(240, 75%, 50%, 0.25)");
                    bySIR.css("font-weight", "normal");
                }
            }
        );

        var byMRNA = $("#byMrnaName");
        byMRNA.hover(
            function(){
                byMRNA.css("background", "hsla(240, 75%, 50%, 1)");
            },
            function() {
                if(byMRNA.css("font-weight") != "700") {
                    byMRNA.css("background", "hsla(240, 75%, 50%, 0.25)");
                    byMRNA.css("font-weight", "normal");
                }
            }
        );

        var searchInput = $("#searchInputText");

        bySIR.click(
            function(){
                //first unset other search type button
                byMRNA.css("font-weight", "normal");
                byMRNA.css("background", "hsla(240, 75%, 50%, 0.25)");

                //then set for this one
                bySIR.css("font-weight", "bold");
                searchInput.attr("placeholder", "Enter siRNA sequence here...");
                //changes value of hidden search type input box to this type
                $("#searchTypeBox").attr("value", "by siRNA sequence");
            }
        );

        byMRNA.click(
            function(){
                //first unset other search type button
                bySIR.css("font-weight", "normal");
                bySIR.css("background", "hsla(240, 75%, 50%, 0.25)");

                //then set for this one
                byMRNA.css("font-weight", "bold");
                searchInput.attr("placeholder", "Enter mRNA name here...");

                //changes value of hidden search type input box to this type
                $("#searchTypeBox").attr("value", "by MRNA name");
            }
        );

        //makes sure search text input field is empty when reloading page
        searchInput.val("");

        //calculates offset from top of page for beginning of search results section
        var resultsTopOffset = $("#search").offset().top;
        $("#searchResults").css("top", resultsTopOffset);


        //slides out search result screen after clicking "RETURN" button
        $("#returnGObutton").click(
            function(){
				$("#resultsTable").html("<img src=\"http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/loading.gif\" style=\"width:100px;height100px;margin:0 auto;\" /><div style=\"display:block;color:white;\">Now loading. Search may take up to 5 minutes.</div>");
                $("#searchResults").hide("slide", { direction: "right" }, 1000);
                $('body, html').animate({scrollTop: resultsTopOffset - 80});
                $("#resultGhost").css("display", "none");
            }
        );

        //returns search result
        $("#searchGObutton").click(
            function(){
                var seq = $("#searchInputText").val();
                var searchT = $("#searchTypeBox").val();
                var specVal = $("#speciesBox").val();
                var mismatchVal;
                if($("#mismatch0").is(':checked'))
                    mismatchVal = 0;
                else if($("#mismatch1").is(':checked'))
                    mismatchVal = 1;
                else
                    mismatchVal = 2;
                $.ajax({
                    url: 'ajax/search1/',
                    data: {
                        'mmVal': mismatchVal,
                        'sqn': seq,
                        'srchTyp': searchT,
                        'speciesVal': specVal
                    },
                    dataType: 'json',
                    success: function (data) {
                        $("#resultsTable").html("Species selected: " + data.sirSpecVal + "<br />Search type: " +  data.sirSrchType + "<br />siRname: " + data.sirName + "<br />Original Input Sequence: " + data.sirSeq + "<br />Input Flipped & Reversed: " + data.sirSeqR + "<br />Stage: " + data.sirStage + "<br />Source Author: " + data.sirSrc + "<br />Mismatches: " + data.mismatchesAllowed);
                        if(data.pubmedID != null)
                            $("#resultsTable").append("<br />Pubmed ID: " + data.pubmedID);
                        //only process non-empty result sets
                        if(data.resultSet != null){
                            for(i=0; i <= data.resultSet.length - 1; i++){
                                if(i==0){
                                    continue;
                                }
                                $("#resultsTable").append("<br /><br />Result " + i + ":");
                                $("#resultsTable").append("<br />mRNA name: " + data.resultSet[i][0]);
                                $("#resultsTable").append("<br />Chromosome #: " + data.resultSet[i][1]);
                                $("#resultsTable").append("<br />Start position: " + data.resultSet[i][2]);
                                $("#resultsTable").append("<br />End position: " + data.resultSet[i][3]);
                            }
                        }
                    }
                });

                //slides in search result screen after clicking "SEARCH" button
                $("#searchResults").show("slide", { direction: "right" }, 1000);
                $('body, html').animate({scrollTop: resultsTopOffset - 80});

                //makes rest of webpage darker
                $("#resultGhost").css("display", "block");
            }
        );
    }
);