$(document).ready(
    function() {

        //hides all DEBUG result tables
        $("#resultsTableXS").hide();
        $("#resultsTableS").hide();
        $("#resultsTableM").hide();
        $("#resultsTableL").hide();

        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);

        var isMobileDevice = false;

        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ){
            isMobileDevice = true;
        }

        var justMadeWindowWider = false;
        var justMadeWindowWider2 = false;
        var resultsGenerated = false;

        var prevSeq = '';
        var prevSearchT = '';
        var prevSpecVal = '';
        var prevMismatchVal = '';

        //hides results until ready to display
        $("#resultsTableM").hide();
        $("#resultsTableL").hide();

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

        //don't remove this: needed for its display property persistence
        $("#header_content_mini").hide(0);
        $("#resultGhost").hide(0);

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



            //decreases page content width if window width gets too small
            if (windowsize < 735) {
                computeGhostSideWidthSmall();
                $("#searchTool").css("margin", "0");
                $("#searchTool").css("width", "100%");
                $("#contactForm").css("width", "100%");

                $("#searchResultsContent").css("width", "100%");
                $("#searchDetails").css("width", "100%");
                computeSearchDetailWidth();

                $(".searchDetailLeftA").css("margin", "0 auto");
                $(".searchDetailLeftB").css("margin", "0 auto");
                $(".searchDetailRightA").css("margin", "0 auto");
                $(".searchDetailRightB").css("margin", "0 auto");

                $(".searchDetailLeftA").css("text-align", "left");
                $(".searchDetailLeftB").css("text-align", "left");

                $(".searchDetailLeftA").css("float", "none");
                $(".searchDetailLeftB").css("float", "none");
                $(".searchDetailRightA").css("float", "none");
                $(".searchDetailRightB").css("float", "none");

                $(".searchDetailLeftA").css("display", "block");
                $(".searchDetailLeftB").css("display", "block");
                $(".searchDetailRightA").css("display", "block");
                $(".searchDetailRightB").css("display", "block");

                $(".searchDetailLeftA").css("padding-left", "4px");
                $(".searchDetailLeftB").css("padding-left", "4px");
                $(".searchDetailRightA").css("padding-left", "4px");
                $(".searchDetailRightB").css("padding-left", "4px");

                $(".searchDetailLeftA").css("padding-right", "0");
                $(".searchDetailLeftB").css("padding-right", "0");

                $(".searchDetailLeftA").css("border-left", "1px solid white");
                $(".searchDetailLeftB").css("border-left", "1px solid white");
                $(".searchDetailRightA").css("border-left", "1px solid white");
                $(".searchDetailRightB").css("border-left", "1px solid white");

                $(".searchDetailLeftA").css("border-right", "1px solid white");
                $(".searchDetailLeftB").css("border-right", "1px solid white");
                $(".searchDetailRightA").css("border-right", "1px solid white");
                $(".searchDetailRightB").css("border-right", "1px solid white");

                $("#searchDetailsTop").css("border-top", "1px solid white");

                $("#mrnaList").css("width", "100%");
                computeMrnaResultWidthSandXS();

                $("#RNAi-Process-Image").css("width", "100%");
            }
            else if (windowsize < 984) {
                computeGhostSideWidthMedium();
                $("#searchTool").css("margin", "0 auto");
                $("#searchTool").css("width", "695px");
                $(".pageSection").css("max-width", "695px");
                $("#contactForm").css("width", "695px");

                $("#searchResultsContent").css("width", "695px");
                $("#searchDetails").css("width", "695px");
                $(".searchDetailLeftA").css("width", "113px");
                $(".searchDetailLeftB").css("width", "113px");
                $(".searchDetailRightA").css("width", "263px");
                $(".searchDetailRightB").css("width", "263px");

                $(".searchDetailLeftA").css("margin-left", "20px");
                $(".searchDetailLeftB").css("margin-left", "20px");
                $(".searchDetailRightA").css("margin-right", "289px");
                $(".searchDetailRightB").css("margin-right", "289px");

                $(".searchDetailRightA").css("margin-left", "2px");
                $(".searchDetailRightB").css("margin-left", "2px");

                $(".searchDetailLeftA").css("text-align", "left");
                $(".searchDetailLeftB").css("text-align", "left");

                $(".searchDetailLeftA").css("display", "inline-block");
                $(".searchDetailLeftB").css("display", "inline-block");
                $(".searchDetailRightA").css("display", "inline-block");
                $(".searchDetailRightB").css("display", "inline-block");

                $(".searchDetailLeftA").css("padding-left", "4px");
                $(".searchDetailLeftB").css("padding-left", "4px");
                $(".searchDetailRightA").css("padding-left", "4px");
                $(".searchDetailRightB").css("padding-left", "4px");

                $(".searchDetailLeftA").css("padding-right", "0");
                $(".searchDetailLeftB").css("padding-right", "0");




                $(".searchDetailLeftA").css("border", "0");
                $(".searchDetailLeftB").css("border", "0");
                $(".searchDetailRightA").css("border", "0");
                $(".searchDetailRightB").css("border", "0");

                $("#searchDetailsTop").css("border-top", "none");

                $("#mrnaList").css("width", "695px");
                computeMrnaResultWidthM();

                $("#RNAi-Process-Image").css("width", "693px");

                //for home+search text version A
                $(".pageSectionA").css("max-width", "675px");
                $("#searchDescriptionA1").html("The search tool below will return putative endo-siRNA/mRNA reverse complementary pairs with up to two mismatches, if desired. To query, select the species, choose one of the two search options, and type a putative endo-siRNA sequence or the name of the mRNA.");
                $("#searchDescriptionA1").css("padding-bottom", "20px");
                $("#searchDescriptionA2").css("display", "none");

                //for home+search text version B
                $(".pageSectionB").css("max-width", "675px");
                $("#searchDescriptionB1").html("The search tool below will return putative endo-siRNA/mRNA reverse complementary pairs with up to two mismatches, if desired. To query, select the species, choose one of the two search options, and type a putative endo-siRNA sequence or the name of the mRNA.");
                $("#searchDescriptionB1").css("padding-bottom", "10px");
                $("#searchDescriptionB2").css("display", "none");

                //for home+search text version C
                $(".pageSectionC").css("max-width", "673px");
                $("#homeContainer").css("margin-top", "20px");
                $("#psirbaseSummary").css("font-size", "12px");
            }
            else{
                computeGhostSideWidthLarge();
                $("#searchTool").css("margin", "0");
                $("#searchTool").css("width", "100%");
                $(".pageSection").css("max-width", "944px");
                $("#contactForm").css("width", "944px");

                $("#searchResultsContent").css("width", "944px");
                $("#searchDetails").css("width", "944px");
                $(".searchDetailLeftA").css("width", "186px");
                $(".searchDetailLeftB").css("width", "186px");
                $(".searchDetailRightA").css("width", "229px");
                $(".searchDetailRightB").css("width", "229px");

                $(".searchDetailLeftA").css("margin-left", "20px");
                $(".searchDetailLeftB").css("margin-left", "20px");
                $(".searchDetailRightA").css("margin-right", "497px");
                $(".searchDetailRightB").css("margin-right", "497px");

                $(".searchDetailRightA").css("margin-left", "2px");
                $(".searchDetailRightB").css("margin-left", "2px");

                $(".searchDetailLeftA").css("text-align", "left");
                $(".searchDetailLeftB").css("text-align", "left");

                $(".searchDetailLeftA").css("display", "inline-block");
                $(".searchDetailLeftB").css("display", "inline-block");
                $(".searchDetailRightA").css("display", "inline-block");
                $(".searchDetailRightB").css("display", "inline-block");

                $(".searchDetailLeftA").css("padding-left", "4px");
                $(".searchDetailLeftB").css("padding-left", "4px");
                $(".searchDetailRightA").css("padding-left", "4px");
                $(".searchDetailRightB").css("padding-left", "4px");

                $(".searchDetailLeftA").css("padding-right", "0");
                $(".searchDetailLeftB").css("padding-right", "0");




                $(".searchDetailLeftA").css("border", "0");
                $(".searchDetailLeftB").css("border", "0");
                $(".searchDetailRightA").css("border", "0");
                $(".searchDetailRightB").css("border", "0");

                $("#searchDetailsTop").css("border-top", "none");

                $("#mrnaList").css("width", "944px");
                computeMrnaResultWidthL();

                $("#RNAi-Process-Image").css("width", "942px");

                //for home+search text version A
                $(".pageSectionA").css("max-width", "924px");
                $("#searchDescriptionA1").html("The search tool below will return putative endo-siRNA/mRNA reverse complementary pairs with up to two mismatches, if desired.");
                $("#searchDescriptionA1").css("padding-bottom", "5px");
                $("#searchDescriptionA2").css("display", "block");

                //for home+search text version B
                $(".pageSectionB").css("max-width", "924px");
                $("#searchDescriptionB1").html("The search tool below will return putative endo-siRNA/mRNA reverse complementary pairs with up to two mismatches, if desired.");
                $("#searchDescriptionB1").css("padding-bottom", "10px");
                $("#searchDescriptionB2").css("display", "block");

                //for home+search text version C
                $(".pageSectionC").css("max-width", "922px");
                $("#homeContainer").css("margin-top", "10px");
                $("#psirbaseSummary").css("font-size", "14px");
            }

            //displays results table with different formats, depending on window width
            displayResultsWithCorrectFormat();

            //displays correct "download results" button on search results
            if(resultsGenerated)
                displayDownloadButtonWithCorrectFormat();

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

                justMadeWindowWider = true;
            }
            else{
                $("#speciesSelectionContainer").css("width", "944px");
                $("#speciesSelectionContainer").css("height", "160px");
                $("#speciesSelectionContainer").css("margin-bottom", "0px");

                //$("#speciesSelections").css("width", "auto");
                $("#speciesSelections").css("width", "595px");
                //$("#speciesSelections").css("height", "inherit");
                $("#speciesSelections").css("height", "160px");
                $("#speciesSelections").css("left", "0px");

                //$("#speciesSelection1").css("width", "inherit");
                //$("#speciesSelection1").css("height", "inherit");
                $("#speciesSelection1").css("width", "595px");
                $("#speciesSelection1").css("height", "160px");

                //$("#speciesSelection2").css("width", "inherit");
                //$("#speciesSelection2").css("height", "inherit");
                $("#speciesSelection2").css("width", "595px");
                $("#speciesSelection2").css("height", "160px");

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

                if(justMadeWindowWider) {
                    refreshSpeciesSelectionSet(species1, species2, currentFour);
                    justMadeWindowWider = false;
                }
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
            if (isMobileDevice) {
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
                $("#mismatchBox").css("width", "105px");

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
                $("#searchGObutton").css("border", "solid 2px white");
                $("#searchGObutton").css("background", "green");

                justMadeWindowWider2 = true;
            }
            else if (windowsize < 735) {
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
                $("#searchGObutton").css("border", "solid 2px white");

                justMadeWindowWider2 = true;
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
                $("#searchGObutton").css("border", "none");

                if(justMadeWindowWider2){
                    refreshSearchInput();
                    justMadeWindowWider2 = false;
                }
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
                $("#searchGObutton").css("border", "none");

                if(justMadeWindowWider2){
                    refreshSearchInput();
                    justMadeWindowWider2 = false;
                }
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
                $miniButtons.css("visibility", "visible");
                $miniButtons.delay(10).slideToggle();
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
                if(wormC.css("font-weight") != "bold" && wormC.css("font-weight") != "700") {
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
                if(pigC.css("font-weight") != "bold" && pigC.css("font-weight") != "700") {
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
                currentFour = moveSpeciesSelectionSetLeft(species1, species2, currentFour, 1000, 85);
            }
        );
        rightArrow.click(
            function(){
                currentFour = moveSpeciesSelectionSetRight(species1, species2, currentFour, 1000, 85);
            }
        );





        //makes background of SEARCH TYPE buttons lighter/darker upon hovering/clicking them
        var bySIR = $("#bySirnaSeq");
        bySIR.hover(
            function(){
                bySIR.css("background", "hsla(240, 75%, 50%, 1)");
            },
            function() {
                if(bySIR.css("font-weight") != "bold" && bySIR.css("font-weight") != "700") {
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
                if(byMRNA.css("font-weight") != "bold" && byMRNA.css("font-weight") != "700") {
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

        //adjusts search "go" button browser-dependent padding issue
        if(isFirefox)
            $("#searchGObutton").css("paddingBottom", "6px");
        else if(isSafari) {
            $("#searchGObutton").css("paddingBottom", "5px");
            $('head').append('<style>#searchGObutton:hover {padding-top : 1px;}</style>');
        }
        else
            $("#searchGObutton").css("paddingBottom", "7px");

        //adjusts search "go" button background color issue for Safari
        if(isSafari && !isMobileDevice)
            $("#searchGObutton").css("background", "purple");

        //gives download search results icon hover effect
        $("#downloadIconS").hover(
            function(){
                $("#downloadIconS").attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/downloadIconS-hover.png");
            },
            function(){
                $("#downloadIconS").attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/downloadIconS.png");
            }
        )

        $("#downloadIconM").hover(
            function(){
                //document.getElementById("downloadIconM").src = "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/downloadIconM-hover.png";
                $("#downloadIconM").attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/downloadIconM-hover.png");
            },
            function(){
                //document.getElementById("downloadIconM").src = "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/downloadIconM.png";
                $("#downloadIconM").attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/downloadIconM.png");
            }
        )

        $("#downloadIconL").hover(
            function(){
                $("#downloadIconL").attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/downloadIconL-hover.png");
            },
            function(){
                $("#downloadIconL").attr("src", "http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/downloadIconL.png");
            }
        )

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

                //slides in search result screen after clicking "SEARCH" button
                $("#searchResults").show("slide", { direction: "right" }, 1000);
                $('body, html').animate({scrollTop: 0});

                //makes rest of webpage darker
                $("#resultGhost").show(0);
                if($(window).width() < 735)
                    computeGhostSideWidthSmall()
                else if($(window).width() < 984)
                    computeGhostSideWidthMedium();
                else
                    computeGhostSideWidthLarge();

                if(prevSearchT == searchT && prevSeq == seq && prevSpecVal == specVal && prevMismatchVal == mismatchVal)
                    return;

                prevSeq = seq;
                prevSearchT = searchT;
                prevSpecVal = specVal;
                prevMismatchVal = mismatchVal;

                //variables for local DEBUGGING PURPOSES (actual ones will come from "data" - data.sirSpecVal for example will be used as a parameter below)
                /*
                var sirSpecVal = specVal;
                var sirSrchType = searchT;
                var sirSeq = 'TAAATATTATATTTATAATATTT';
                var mismatchesAllowed = mismatchVal;
                var sirSeqR = 'AATAAATATTATATTTATAATAT';
                var resultsFound = 'yes';
                var sirnaResults = 'ACGTTCGACCZX';
                var bedFileResults = [
                    [],
                    ['MtDNA', 20908965, 20908987, 'magic', '+', 'Embryonic', 'Kelly (2018)', '985221', 'X54252.1', 'AATAAATATTATATTTATAATAT', 2],
                    ['IV', 9097, 9112, 'cel-siR-295', '-', 'NS', 'Kamminga et al (2012)', '22829772', 'Y71A12B.3', 'AAAAAAAAAAATAATCGGGAGGAAGA', 0],
                    ['X', 9097, 9112, 'cel-siR-442595', '-', 'NS', 'Kamminga et al (2012)', '22829772', 'Y71A12B.3', 'AAATTGAAA', 0],
                    ['MtDNA', 3098965, 20908987, 'magic', '+', 'Embryonic', 'Kelly (2018)', '985221', 'X54252.1', 'AATAAATATTATATTTATAATAT', 1],
                    ['III', 13502, 13525, 'cel-siR-26951', '+', 'Embryonic', 'Kelly (2018)', '985221', 'X54252.1', 'AATAAATATTATATTTATAATAT', 2]
                ];
                var mrnaResults = [
                    [],
                    ['IV', 4923, 4947, 'X54252.1', '-'],
                    ['X', 777601, 777618, 'J4893.2b', '-'],
                    ['MtDNA', 0, 80041, 'FO04BEH', '+']
                ];
                */

                resultsGenerated = false;
                $("#downloadIconS").hide();
                $("#downloadIconM").hide();
                $("#downloadIconL").hide();
                $("#mrnaList").html("");
                $("#resultsTableL").html("");
                $("#resultsTableM").html("");
                $("#resultsTableS").html("");
                $("#resultsTableXS").html("");
                $("#errorMessage").html("");

                if(seq == '' || searchT == 'no search type selected' || specVal == 'no species selected'){
                    $("#resultsTableL").html("<div style=\"text-align:center;\">Error:<br /><br /></div>");
                    $("#resultsTableM").html("<div style=\"text-align:center;\">Error:<br /><br /></div>");
                    $("#resultsTableS").html("<div style=\"text-align:center;\">Error:<br /><br /></div>");
                    $("#resultsTableXS").html("<div style=\"text-align:center;\">Error:<br /><br /></div>");
                    if(specVal == 'no species selected') {
                        $("#resultsTableL").append("<div style=\"text-align:center;\">You must select a species.<br /></div>");
                        $("#resultsTableM").append("<div style=\"text-align:center;\">You must select a species.<br /></div>");
                        $("#resultsTableS").append("<div style=\"text-align:center;\">You must select a species.<br /></div>");
                        $("#resultsTableXS").append("<div style=\"text-align:center;\">You must select a species.<br /></div>");
                    }
                    if(searchT == 'no search type selected') {
                        $("#resultsTableL").append("<div style=\"text-align:center;\">You must select a search type.<br /></div>");
                        $("#resultsTableM").append("<div style=\"text-align:center;\">You must select a search type.<br /></div>");
                        $("#resultsTableS").append("<div style=\"text-align:center;\">You must select a search type.<br /></div>");
                        $("#resultsTableXS").append("<div style=\"text-align:center;\">You must select a search type.<br /></div>");
                    }
                    if(seq == '' && searchT == 'by siRNA sequence') {
                        $("#resultsTableL").append("<div style=\"text-align:center;\">You must enter an siRNA sequence.<br /></div>");
                        $("#resultsTableM").append("<div style=\"text-align:center;\">You must enter an siRNA sequence.<br /></div>");
                        $("#resultsTableS").append("<div style=\"text-align:center;\">You must enter an siRNA sequence.<br /></div>");
                        $("#resultsTableXS").append("<div style=\"text-align:center;\">You must enter an siRNA sequence.<br /></div>");
                    }
                    if(seq == '' && searchT == 'by MRNA name') {
                        $("#resultsTableL").append("<div style=\"text-align:center;\">You must enter an mRNA name.</div>");
                        $("#resultsTableM").append("<div style=\"text-align:center;\">You must enter an mRNA name.</div>");
                        $("#resultsTableS").append("<div style=\"text-align:center;\">You must enter an mRNA name.</div>");
                        $("#resultsTableXS").append("<div style=\"text-align:center;\">You must enter an mRNA name.</div>");
                    }

                    return;
                }




                $("#resultsTableL").html("");
                $("#resultsTableM").html("");
                $("#resultsTableS").html("");
                $("#resultsTableXS").html("");
                $("#errorMessage").html("");
                $("#searchDetails").html("<div style=\"word-wrap:break-word;width:100%;\"><img src=\"http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/loading.gif\" style=\"width:100px;height:100px;margin:0 auto;display:block;\" /><div style=\"display:block;color:white;text-align:center;\">Now loading. (May take up to ~30 seconds to return results.)</div></div>");




                /*
                //delay for DEBUGGING PURPOSES (simulates retrieving delay)
                setTimeout(outputSR, 2000);
                function outputSR(){
                    outputSearchResults(sirSpecVal, sirSrchType, sirSeq, mismatchesAllowed, sirSeqR, bedFileResults, mrnaResults, resultsFound, sirnaResults);
                }*/



                $("#resultsTable").html("<img src=\"http://psirbase-dev.us-west-2.elasticbeanstalk.com/static/images/loading.gif\" style=\"width:100px;height100px;margin:0 auto;\" /><div style=\"display:block;margin-top:5px;\">Now loading. Search may take a few seconds.</div>");

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
                        outputSearchResults(data.sirSpecVal, data.sirSrchType, data.sirSeq, data.mismatchesAllowed, data.sirSeqR, data.bedFileResults, data.mrnaResults, data.resultsFound, data.sirnaResults);
                        /*
                        //if species not available yet
                        if(data.sirSrchType == "NOT READY"){
                            $("#resultsTable").html("Data for " + data.sirSpecVal + " is not available yet.");
                        }
                        //if user input is invalid
                        else if(data.sirSpecVal == "INVALID INPUT"){
                            $("#resultsTable").html("The siRNA sequence " + data.sirnaResults + " may consist of the following characters only: a, c, g, t, u, A, C, G, T, U <br /><br />(No spaces or special characters)");
                        }
                        //if sirna sequence / mRNA name doesn't exist for the species
                        else if(data.sirSeq == "EXISTS NOT" && searchT == 'by siRNA sequence'){
                            $("#resultsTable").html("The siRNA sequence " + data.sirnaResults + " does not exist for " + data.sirSpecVal);
                        }
                        else if(data.sirSeq == "EXISTS NOT" && searchT == 'by MRNA name'){
                            $("#resultsTable").html("The mRNA name " + data.sirnaResults + " does not exist for " + data.sirSpecVal);
                        }
                        //if mismatch limit exceeded for all sirnas that were returned
                        else if(data.resultsFound == "no" && searchT == 'by siRNA sequence'){
                            $("#resultsTable").html("Species selected: " + data.sirSpecVal + "<br />Search type: " +  data.sirSrchType + "<br />Input Sequence: " +  data.sirSeq + "<br />Flipped & Reversed: " + data.sirSeqR + "<br />Mismatches Allowed: " + data.mismatchesAllowed + "<br /><br />");
                            $("#resultsTable").append("No results (mismatch limit exceeded for all siRNAs)");
                        }
                        else if(data.resultsFound == "no" && searchT == 'by MRNA name'){
                            $("#resultsTable").html("Species selected: " + data.sirSpecVal + "<br />Search type: " +  data.sirSrchType + "<br />mRNA: " +  data.sirSeq + "<br />Chromosome: " + data.mrnaResults[1][0] + "<br />Start: " + data.mrnaResults[1][1] + "<br />End: " + data.mrnaResults[1][2] + "<br />Strand: " + data.mrnaResults[1][4] + "<br /><br />");
                            $("#resultsTable").append("No results (mismatch limit exceeded for all siRNAs or simply no siRNAs affect this mRNA)");
                        }
                        //only process non-empty result sets
                        else if(searchT == 'by siRNA sequence'){
                            $("#resultsTable").html("Species selected: " + data.sirSpecVal + "<br />Search type: " +  data.sirSrchType);
                            if(data.dotsInSequence == 2 || data.dotsInSequence == '2'){
                                $("#resultsTable").append("<br />siRNA Sequence (Before Dots Removed): " + data.originalSeq);
                                $("#resultsTable").append("<br />siRNA Sequence (After Dots Removed): " +  data.sirSeq);
                            }
                            else
                                $("#resultsTable").append("<br />siRNA Sequence: " +  data.sirSeq);
                            $("#resultsTable").append("<br />Flipped & Reversed: " + data.sirSeqR + "<br />Mismatches Allowed: " + data.mismatchesAllowed + "<br /><br />");

                            for(i=0; i <= data.bedFileResults.length - 1; i++){
                                if(i==0)
                                    continue;
                                $("#resultsTable").append(data.bedFileResults[i][3] + "<br />" +
                                    "Chromosome: " + data.bedFileResults[i][0] + "<br />" +
                                    "Start: " + data.bedFileResults[i][1] + "<br />" +
                                    "End: " + data.bedFileResults[i][2] + "<br />" +
                                    "Strand: " + data.bedFileResults[i][4] + "<br />" +
                                    "Stage: " + data.bedFileResults[i][5] + "<br />" +
                                    "Source: " + data.bedFileResults[i][6] + "<br />" +
                                    "Pubmed ID: " + data.bedFileResults[i][7] + "<br />" +
                                    "Target mRNA: " + data.bedFileResults[i][8] + "<br />" +
                                    "Matched sequence: " + data.bedFileResults[i][9] + "<br />" +
                                    "Mismatches Counted: " + data.bedFileResults[i][10] + "<br /><br />"
                                );
                            }

                            $("#resultsTable").append("<br /><hr /><br /><br />Genes<br /><br />");

                            for(i=0; i <= data.mrnaResults.length - 1; i++){
                                if(i==0)
                                    continue;
                                $("#resultsTable").append(data.mrnaResults[i][3] + "<br />" +
                                    "Chromosome: " + data.mrnaResults[i][0] + "<br />" +
                                    "Start: " + data.mrnaResults[i][1] + "<br />" +
                                    "End: " + data.mrnaResults[i][2] + "<br />" +
                                    "Strand: " + data.mrnaResults[i][4] + "<br /><br />"
                                );
                            }
                        }
                        else if(searchT == 'by MRNA name'){
                            $("#resultsTable").html("Species selected: " + data.sirSpecVal + "<br />Search type: " +  data.sirSrchType + "<br />mRNA: " +  data.sirSeq + "<br />Chromosome: " + data.mrnaResults[1][0] + "<br />Start: " + data.mrnaResults[1][1] + "<br />End: " + data.mrnaResults[1][2] + "<br />Strand: " + data.mrnaResults[1][4]);

                            $("#resultsTable").append("<br /><br /><br /><hr /><br /><br />");

                            for(i=0; i <= data.bedFileResults.length - 1; i++){
                                if(i==0)
                                    continue;
                                $("#resultsTable").append(data.bedFileResults[i][3] + "<br />" +
                                    "Chromosome: " + data.bedFileResults[i][0] + "<br />" +
                                    "Start: " + data.bedFileResults[i][1] + "<br />" +
                                    "End: " + data.bedFileResults[i][2] + "<br />" +
                                    "Strand: " + data.bedFileResults[i][4] + "<br />" +
                                    "Stage: " + data.bedFileResults[i][5] + "<br />" +
                                    "Source: " + data.bedFileResults[i][6] + "<br />" +
                                    "Pubmed ID: " + data.bedFileResults[i][7] + "<br />" +
                                    "Target mRNA: " + data.bedFileResults[i][8] + "<br />"
                                );
                                if(data.bedFileResults[i][14] == 1 || data.bedFileResults[i][14] == '1')
                                    $("#resultsTable").append("siRNA Sequence: " + data.bedFileResults[i][11] + "<br />");
                                else{
                                    $("#resultsTable").append("siRNA Sequence (before removing dots): " + data.bedFileResults[i][13] + "<br />");
                                    $("#resultsTable").append("siRNA Sequence (after): " + data.bedFileResults[i][11] + "<br />");
                                }
                                $("#resultsTable").append("Flipped & Reversed: " + data.bedFileResults[i][12] + "<br />" +
                                    "Matched sequence: " + data.bedFileResults[i][9] + "<br />" +
                                    "Mismatches Counted: " + data.bedFileResults[i][10] + "<br /><br />"
                                );
                            }
                        }*/
                    }

                });

            }
        );

        //slides out search result screen after clicking "RETURN" button
        $("#returnGObutton").click(
            function(){
                $("#searchResults").hide("slide", { direction: "right" }, 1000);
                $('body, html').animate({scrollTop: 0});
                $("#resultGhost").hide(0);
            }
        );

        //slides results screen away when the resultGhost is clicked
        $("#resultGhost").click(
            function(){
                $("#searchResults").hide("slide", { direction: "right" }, 1000);
                $('body, html').animate({scrollTop: 0});
                $("#resultGhost").hide(0);
            }
        );
        $(".resultGhostSide").click(
            function(){
                $("#searchResults").hide("slide", { direction: "right" }, 1000);
                $('body, html').animate({scrollTop: 0});
                $("#resultGhost").hide(0);
                $(".resultGhostSide").css("width", "0");
            }
        );

        function outputSearchResults(sirSpecVal, sirSrchType, sirSeq, mismatchesAllowed, sirSeqR, bedFileResults, mrnaResults, resultsFound, sirnaResults){

            $("#searchDetails").html("");
            //if species not available yet
            if(sirSrchType == "NOT READY"){
                $("#errorMessage").html("Data for " + sirSpecVal + " is not available yet.");
                return;
            }
            //if user input is invalid
            else if(sirSpecVal == "INVALID INPUT"){
                $("#errorMessage").html("The siRNA sequence " + sirSeq + " may consist of the following characters only: a, c, g, t, u, A, C, G, T, U <br /><br />(No spaces or special characters)");
                return;
            }
            //if sirna sequence / mRNA name doesn't exist for the species
            else if(sirSeq == "EXISTS NOT" && sirSrchType == 'by siRNA sequence'){
                $("#errorMessage").html("The siRNA sequence " + sirnaResults + " does not exist for " + sirSpecVal);
                return;
            }
            else if(sirSeq == "EXISTS NOT" && sirSrchType == 'by MRNA name'){
                $("#errorMessage").html("The mRNA name " + sirnaResults + " does not exist for " + sirSpecVal);
                return;
            }
            //if mismatch limit exceeded for all sirnas that were returned
            else if(resultsFound == "no" && sirSrchType == 'by siRNA sequence'){
                $("#errorMessage").html("Species selected: " + sirSpecVal + "<br />Search type: " +  sirSrchType + "<br />Input Sequence: " +  sirSeq + "<br />Flipped & Reversed: " + sirSeqR + "<br />Mismatches Allowed: " + mismatchesAllowed + "<br /><br />");
                $("#errorMessage").append("No results (mismatch limit exceeded for all siRNAs)");
                return;
            }
            else if(resultsFound == "no" && sirSrchType == 'by MRNA name'){
                $("#errorMessage").html("Species selected: " + sirSpecVal + "<br />Search type: " +  sirSrchType + "<br />mRNA: " +  sirSeq + "<br />Chromosome: " + mrnaResults[1][0] + "<br />Start: " + mrnaResults[1][1] + "<br />End: " + mrnaResults[1][2] + "<br />Strand: " + mrnaResults[1][4] + "<br /><br />");
                $("#errorMessage").append("No results (mismatch limit exceeded for all siRNAs or simply no siRNAs affect this mRNA)");
                return;
            }

            //output search details first
            $("#searchDetails").html("<div class=\"searchDetailLeftA\" id=\"searchDetailsTop\">Species</div>");
            $("#searchDetails").append("<div class=\"searchDetailRightA\">" + sirSpecVal + "</div>");
            $("#searchDetails").append("<div class=\"searchDetailLeftB\">Search Type</div>");
            $("#searchDetails").append("<div class=\"searchDetailRightB\">" + sirSrchType + "</div>");
            if(sirSrchType == 'by siRNA sequence') {
                $("#searchDetails").append("<div class=\"searchDetailLeftA\">siRNA Sequence</div>");
                $("#searchDetails").append("<div class=\"searchDetailRightA\">" + sirSeq + "</div>");
                $("#searchDetails").append("<div class=\"searchDetailLeftB\">Rev. Complement</div>");
                $("#searchDetails").append("<div class=\"searchDetailRightB\">" + sirSeqR + "</div>");
            }
            else{
                $("#searchDetails").append("<div class=\"searchDetailLeftA\">mRNA Name</div>");
                $("#searchDetails").append("<div class=\"searchDetailRightA\">" + mrnaResults[1][3] + "</div>");
                $("#searchDetails").append("<div class=\"searchDetailLeftB\">Location</div>");
                $("#searchDetails").append("<div class=\"searchDetailRightB\">chr-" + mrnaResults[1][0] + ":" + mrnaResults[1][1] + ":" + mrnaResults[1][2] + ":" + mrnaResults[1][4] + "</div>");
            }
            $("#searchDetails").append("<div class=\"searchDetailLeftA\">Max Mismatches</div>");
            $("#searchDetails").append("<div class=\"searchDetailRightA\">" + mismatchesAllowed + "</div>");

            //output search results for LARGE window width
            $("#resultsTableL").html("<div class=\"bedLocation\" style=\"margin-top:20px;\">Location</div><div class=\"bedID\">ID</div><div class=\"bedStage\">Stage</div><div class=\"bedSource\">Source</div><div class=\"bedPubmed\">PubMed</div><div class=\"bedTargetMrna\">Target mRNA</div><div class=\"bedMatchedSeq\">Matched Sequence</div><div class=\"bedMismatches\">#</div>");
            var resultCellBG = 1;
            for(i=0; i <= bedFileResults.length - 1; i++) {
                if (i == 0)
                    continue;
                var locationTextLength = 3 + bedFileResults[i][0].length + bedFileResults[i][1].toString().length + bedFileResults[i][2].toString().length + bedFileResults[i][4].length;
                if(resultCellBG == 1){
                    resultCellBG = 2;
                    if(locationTextLength >= 23){
                        $("#resultsTableL").append("<div class=\"bedLocation\" style=\"background:white;color:black;font-size:11px;vertical-align:bottom;\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    }
                    else {
                        $("#resultsTableL").append("<div class=\"bedLocation\" style=\"background:white;color:black;\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    }
                    $("#resultsTableL").append("</div><div class=\"bedID\" style=\"background:white;color:black;\"><p>" + bedFileResults[i][3] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedStage\" style=\"background:white;color:black;\"><p>" + bedFileResults[i][5] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedSource\" style=\"background:white;color:black;\"><p>" + bedFileResults[i][6] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedPubmed\" style=\"background:white;color:black;\"><p>" + bedFileResults[i][7] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedTargetMrna\" style=\"background:white;color:black;\"><p>" + bedFileResults[i][8] + "</p>");
                    if (bedFileResults[i][9].length > 15)
                        $("#resultsTableL").append("</div><div class=\"bedMatchedSeq\" style=\"background:white;color:black;\"><p>"+ bedFileResults[i][9].substring(0, 15) + "...</p>");
                    else
                        $("#resultsTableL").append("</div><div class=\"bedMatchedSeq\" style=\"background:white;color:black;\"><p>"+ bedFileResults[i][9] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedMismatches\" style=\"background:white;color:black;\"><p>" + bedFileResults[i][10] + "</p></div>");
                }
                else{
                    resultCellBG = 1;
                    if(locationTextLength >= 23){
                        $("#resultsTableL").append("<div class=\"bedLocation\" style=\"background:#b4b6eb;color:black;font-size:11px;vertical-align:bottom;\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    }
                    else {
                        $("#resultsTableL").append("<div class=\"bedLocation\" style=\"background:#b4b6eb;color:black;\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    }                    $("#resultsTableL").append("</div><div class=\"bedID\" style=\"background:#b4b6eb;color:black;\"><p>" + bedFileResults[i][3] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedStage\" style=\"background:#b4b6eb;color:black;\"><p>" + bedFileResults[i][5] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedSource\" style=\"background:#b4b6eb;color:black;\"><p>" + bedFileResults[i][6] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedPubmed\" style=\"background:#b4b6eb;color:black;\"><p>" + bedFileResults[i][7] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedTargetMrna\" style=\"background:#b4b6eb;color:black;\"><p>" + bedFileResults[i][8] + "</p>");
                    if (bedFileResults[i][9].length > 15)
                        $("#resultsTableL").append("</div><div class=\"bedMatchedSeq\" style=\"background:#b4b6eb;color:black;\"><p>"+ bedFileResults[i][9].substring(0, 15) + "...</p>");
                    else
                        $("#resultsTableL").append("</div><div class=\"bedMatchedSeq\" style=\"background:#b4b6eb;color:black;\"><p>"+ bedFileResults[i][9] + "</p>");
                    $("#resultsTableL").append("</div><div class=\"bedMismatches\" style=\"background:#b4b6eb;color:black;\"><p>" + bedFileResults[i][10] + "</p></div>");
                }
            }

            //output search results for MEDIUM window width
            for(i=0; i <= bedFileResults.length - 1; i++) {
                if (i == 0)
                    continue;
                //if only one column for this row (odd # of results, last result)
                if (bedFileResults.length - i == 1){
                    $("#resultsTableM").append("<div class=\"bedResultHeaderColumn\" style=\"background:#72613c; margin-top:20px;\">Location");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\" style=\"margin-right:269px;\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#723c3d;\">ID");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\" style=\"margin-right:269px;\"><p>" + bedFileResults[i][3] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#6f3c72;\">Stage");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\" style=\"margin-right:269px;\"><p>" + bedFileResults[i][5] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#423c72;\">Source");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\" style=\"margin-right:269px;\"><p>" + bedFileResults[i][6] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#3c4f72;\">PubMed");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\" style=\"margin-right:269px;\"><p>" + bedFileResults[i][7] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#3c6772;\">Target mRNA");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\" style=\"margin-right:269px;\"><p>" + bedFileResults[i][8] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#40723c;\">Matched Sequence");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\" style=\"margin-right:269px;\"><p>" + bedFileResults[i][9] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#575757;\"># of Mismatches");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\" style=\"margin-right:269px;\"><p>" + bedFileResults[i][10] + "</p></div>");
                }
                else{
                    $("#resultsTableM").append("<div class=\"bedResultHeaderColumn\" style=\"background:#72613c; margin-top:20px;\">Location");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn2\"><p>chr-" + bedFileResults[i+1][0] + ":" + bedFileResults[i+1][1] + ":" + bedFileResults[i+1][2] + ":" + bedFileResults[i+1][4] + "</p>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#723c3d;\">ID");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\"><p>" + bedFileResults[i][3] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn2\"><p>" + bedFileResults[i+1][3] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#6f3c72;\">Stage");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\"><p>" + bedFileResults[i][5] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn2\"><p>" + bedFileResults[i+1][5] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#423c72;\">Source");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\"><p>" + bedFileResults[i][6] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn2\"><p>" + bedFileResults[i+1][6] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#3c4f72;\">PubMed");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\"><p>" + bedFileResults[i][7] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn2\"><p>" + bedFileResults[i+1][7] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#3c6772;\">Target mRNA");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\"><p>" + bedFileResults[i][8] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn2\"><p>" + bedFileResults[i+1][8] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#40723c;\">Matched Sequence");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\"><p>" + bedFileResults[i][9] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn2\"><p>" + bedFileResults[i+1][9] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#575757;\"># of Mismatches");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn1\"><p>" + bedFileResults[i][10] + "</p></div>");
                    $("#resultsTableM").append("</div><div class=\"bedResultColumn2\"><p>" + bedFileResults[i+1][10] + "</p></div>");
                }
                ++i;
            }

            //output search results for SMALL window width
            resultCellBG = 1;
            for(i=0; i <= bedFileResults.length - 1; i++) {
                if (i == 0)
                    continue;
                if(resultCellBG == 1){
                    resultCellBG = 2;
                    $("#resultsTableS").append("<div class=\"bedResultHeaderColumn\" style=\"background:#72613c; margin-top:20px;\">Location");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn1S\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#723c3d;\">ID");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn1S\"><p>" + bedFileResults[i][3] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#6f3c72;\">Stage");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn1S\"><p>" + bedFileResults[i][5] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#423c72;\">Source");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn1S\"><p>" + bedFileResults[i][6] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#3c4f72;\">PubMed");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn1S\"><p>" + bedFileResults[i][7] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#3c6772;\">Target mRNA");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn1S\"><p>" + bedFileResults[i][8] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#40723c;\">Matched Sequence");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn1S\"><p>" + bedFileResults[i][9] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#575757;\"># of Mismatches");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn1S\"><p>" + bedFileResults[i][10] + "</p></div>");

                }
                else{
                    resultCellBG = 1;
                    $("#resultsTableS").append("<div class=\"bedResultHeaderColumn\" style=\"background:#72613c; margin-top:20px;\">Location");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn2S\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#723c3d;\">ID");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn2S\"><p>" + bedFileResults[i][3] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#6f3c72;\">Stage");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn2S\"><p>" + bedFileResults[i][5] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#423c72;\">Source");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn2S\"><p>" + bedFileResults[i][6] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#3c4f72;\">PubMed");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn2S\"><p>" + bedFileResults[i][7] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#3c6772;\">Target mRNA");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn2S\"><p>" + bedFileResults[i][8] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#40723c;\">Matched Sequence");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn2S\"><p>" + bedFileResults[i][9] + "</p></div>");

                    $("#resultsTableS").append("</div><div class=\"bedResultHeaderColumn\" style=\"background:#575757;\"># of Mismatches");
                    $("#resultsTableS").append("</div><div class=\"bedResultColumn2S\"><p>" + bedFileResults[i][10] + "</p></div>");
                }
            }

            //output search results for XTRA-SMALL window width
            resultCellBG = 1;
            for(i=0; i <= bedFileResults.length - 1; i++) {
                if (i == 0)
                    continue;
                if(resultCellBG == 1){
                    resultCellBG = 2;
                    $("#resultsTableXS").append("<div class=\"bedResultHeaderXS\" style=\"background:#72613c; margin-top:20px;\">Location");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#723c3d;\">ID");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS\"><p>" + bedFileResults[i][3] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#6f3c72;\">Stage");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS\"><p>" + bedFileResults[i][5] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#423c72;\">Source");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS\"><p>" + bedFileResults[i][6] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#3c4f72;\">PubMed");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS\"><p>" + bedFileResults[i][7] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#3c6772;\">Target mRNA");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS\"><p>" + bedFileResults[i][8] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#40723c;\">Matched Sequence");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS\"><p>" + bedFileResults[i][9] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#575757;\"># of Mismatches");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS\"><p>" + bedFileResults[i][10] + "</p></div>");

                }
                else{
                    resultCellBG = 1;
                    $("#resultsTableXS").append("<div class=\"bedResultHeaderXS\" style=\"background:#72613c; margin-top:20px;\">Location");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS2\"><p>chr-" + bedFileResults[i][0] + ":" + bedFileResults[i][1] + ":" + bedFileResults[i][2] + ":" + bedFileResults[i][4] + "</p>");
                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#723c3d;\">ID");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS2\"><p>" + bedFileResults[i][3] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#6f3c72;\">Stage");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS2\"><p>" + bedFileResults[i][5] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#423c72;\">Source");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS2\"><p>" + bedFileResults[i][6] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#3c4f72;\">PubMed");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS2\"><p>" + bedFileResults[i][7] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#3c6772;\">Target mRNA");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS2\"><p>" + bedFileResults[i][8] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#40723c;\">Matched Sequence");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS2\"><p>" + bedFileResults[i][9] + "</p></div>");

                    $("#resultsTableXS").append("</div><div class=\"bedResultHeaderXS\" style=\"background:#575757;\"># of Mismatches");
                    $("#resultsTableXS").append("</div><div class=\"bedResultXS2\"><p>" + bedFileResults[i][10] + "</p></div>");
                }
            }

            //output genes/mRNA results list
            if(sirSrchType == 'by siRNA sequence') {
                for (i = 0; i <= mrnaResults.length - 1; i++) {
                    if (i == 0) {
                        $("#mrnaList").html("");
                        continue;
                    }
                    $("#mrnaList").append("<div class=\"mrnaResultIdHeader\">mRNA ID");
                    $("#mrnaList").append("</div><div class=\"mrnaResultId\"><p>" + mrnaResults[i][3] + "</p>");
                    $("#mrnaList").append("</div><div class=\"mrnaResultLocHeader\">mRNA Location");
                    $("#mrnaList").append("</div><div class=\"mrnaResultLoc\"><p>chr-" + mrnaResults[i][0] + ":" + mrnaResults[i][1] + ":" + mrnaResults[i][2] + ":" + mrnaResults[i][4] + "</p></div>");
                }
            }

            resultsGenerated = true;
            checkWidth();
        }
    }
);

function moveSpeciesSelectionSetLeft(species1, species2, currentFour, movementDuration, delayValue){
    if(currentFour == 1){
        species1.hide("slide", { direction: "left" }, movementDuration);
        species2.delay(delayValue).show("slide", { direction: "right" }, movementDuration);
        currentFour = 2;
    }
    else if(currentFour == 2){
        species2.hide("slide", { direction: "right" }, movementDuration);
        species1.delay(delayValue).show("slide", { direction: "left" }, movementDuration);
        currentFour = 1;
    }
    return currentFour;
}

function moveSpeciesSelectionSetRight(species1, species2, currentFour, movementDuration, delayValue){
    if(currentFour == 1){
        species1.hide("slide", { direction: "left" }, movementDuration);
        species2.delay(delayValue).show("slide", { direction: "right" }, movementDuration);
        currentFour = 2;
    }
    else if(currentFour == 2){
        species2.hide("slide", { direction: "right" }, movementDuration);
        species1.delay(delayValue).show("slide", { direction: "left" }, movementDuration);
        currentFour = 1;
    }
    return currentFour;
}

function refreshSpeciesSelectionSet(species1, species2, currentFour){
    if(currentFour == 1){
        species1.hide(0);
        species1.show(0);
    }
    if(currentFour == 2){
        species2.hide(0);
        species2.show(0);
    }
}

function refreshSearchInput(){
    $("#searchForm").hide(0);
    $("#searchForm").show(0);
}

function computeSearchDetailWidth(){
    var sdWidth = $(window).width() - 46;
    sdWidth = "" + sdWidth + "px";
    $(".searchDetailLeftA").css("width", sdWidth);
    $(".searchDetailLeftB").css("width", sdWidth);
    $(".searchDetailRightA").css("width", sdWidth);
    $(".searchDetailRightB").css("width", sdWidth);
}

function computeGhostSideWidthLarge(){
    var sideGhostWidth = ($(window).width() - 944) / 2;
    sideGhostWidth = sideGhostWidth.toString() + "px";
    $(".resultGhostSide").css("width", sideGhostWidth);
    //$(".resultGhostSide").css("background", "red");
}

function computeGhostSideWidthMedium(){
    var sideGhostWidth = ($(window).width() - 694) / 2;
    sideGhostWidth = sideGhostWidth.toString() + "px";
    $(".resultGhostSide").css("width", sideGhostWidth);
    //$(".resultGhostSide").css("background", "green");
}

function computeGhostSideWidthSmall(){
    $(".resultGhostSide").css("width", "20px");
}

function displayResultsWithCorrectFormat(){
    var windowsize = $(window).width();
    if(windowsize >= 984){
        $("#resultsTableXS").hide();
        $("#resultsTableS").hide();
        $("#resultsTableM").hide();
        $("#resultsTableL").show();
    }
    else if(windowsize < 984 && windowsize >= 735){
        $("#resultsTableXS").hide();
        $("#resultsTableS").hide();
        $("#resultsTableM").show();
        $("#resultsTableL").hide();
    }
    else if(windowsize < 735 && windowsize >= 350){
        computeResultWidthForSmall();
        $("#resultsTableXS").hide();
        $("#resultsTableS").show();
        $("#resultsTableM").hide();
        $("#resultsTableL").hide();
        //$(".resultGhostSide").css("background", "blue");
    }
    else{
        computeResultWidthForXtraSmall();
        $("#resultsTableXS").show();
        $("#resultsTableS").hide();
        $("#resultsTableM").hide();
        $("#resultsTableL").hide();
        //$(".resultGhostSide").css("background", "yellow");
    }
}

function computeResultWidthForSmall(){
    var windowsize = $(window).width();
    var resultWidthSmall = windowsize-(113+40+8);
    resultWidthSmall = "" + resultWidthSmall + "px";
    $(".bedResultColumn1S").css("width", resultWidthSmall);
    $(".bedResultColumn2S").css("width", resultWidthSmall);
}

function computeResultWidthForXtraSmall(){
    var windowsize = $(window).width();
    var resultWidthXS = windowsize-(40+4);
    resultWidthXS = "" + resultWidthXS + "px";
    $(".bedResultHeaderXS").css("width", resultWidthXS);
    $(".bedResultXS").css("width", resultWidthXS);
    $(".bedResultXS2").css("width", resultWidthXS);
}

function computeMrnaResultWidthSandXS(){
    var MrnaResultWidth = $(window).width() - 40;
    MrnaResultWidth = MrnaResultWidth.toString() + "px";
    $(".mrnaResultId").css("width", MrnaResultWidth);
    $(".mrnaResultIdHeader").css("width", MrnaResultWidth);
    $(".mrnaResultLoc").css("width", MrnaResultWidth);
    $(".mrnaResultLocHeader").css("width", MrnaResultWidth);
}

function computeMrnaResultWidthM(){
    var MrnaResultWidth = 695 - 40;
    MrnaResultWidth = MrnaResultWidth.toString() + "px";
    $(".mrnaResultId").css("width", MrnaResultWidth);
    $(".mrnaResultIdHeader").css("width", MrnaResultWidth);
    $(".mrnaResultLoc").css("width", MrnaResultWidth);
    $(".mrnaResultLocHeader").css("width", MrnaResultWidth);
}

function computeMrnaResultWidthL(){
    var MrnaResultWidth = 944 - 40;
    MrnaResultWidth = MrnaResultWidth.toString() + "px";
    $(".mrnaResultId").css("width", MrnaResultWidth);
    $(".mrnaResultIdHeader").css("width", MrnaResultWidth);
    $(".mrnaResultLoc").css("width", MrnaResultWidth);
    $(".mrnaResultLocHeader").css("width", MrnaResultWidth);
}

function displayDownloadButtonWithCorrectFormat(){
    var windowsize = $(window).width();
    if(windowsize >= 984){
        $("#downloadIconS").hide();
        $("#downloadIconM").hide();
        $("#downloadIconL").show();
    }
    else if(windowsize < 984 && windowsize >= 735){
        $("#downloadIconS").hide();
        $("#downloadIconM").show();
        $("#downloadIconL").hide();
    }
    else if(windowsize < 735 && windowsize >= 350){
        $("#downloadIconS").show();
        $("#downloadIconM").hide();
        $("#downloadIconL").hide();
    }
    else{
        $("#downloadIconS").show();
        $("#downloadIconM").hide();
        $("#downloadIconL").hide();
    }
}

