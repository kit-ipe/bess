$("#message").draggable();
$("#orientation").draggable();
$("#settings").draggable();


function setMessage(bheader, bcontent) {
    //console.log("Creating message");
    var timeNow = new Date();
    var hours   = timeNow.getHours();
    var minutes = timeNow.getMinutes();
    var seconds = timeNow.getSeconds();
    //var timeString = "" + ((minutes > 12) ? - 12 : hours);
    var timeString  = ((minutes < 10) ? "0" : "") + minutes;
    timeString  += ((seconds < 10) ? ":0" : ":") + seconds;
    
    var html = "<div><span class='bar-hl'>";
    //html += timeString;
    html += bheader;
    html += "</span><span class='bar-info'>";
    html += bcontent;
    html += "</span></div>";
    
    console.log(html);
    $(".bar-message > .bar-wrapper").append(html);
    $('.bar-message > .bar-wrapper').scrollTop($('.bar-message > .bar-wrapper')[0].scrollHeight);
}

$(".bar-dropdown").click(function() {
    console.log($(this).parent().parent().attr('id'));
    var _id = $(this).parent().parent().attr('id');
    if (parseInt($(".bar-"+ _id).css("height")) > 0) {
        $(".bar-dropdown", "#"+_id).css("transform", "rotate(180deg)");
        $(".bar-"+ _id + "> .bar-wrapper").hide();
        $(".bar-"+ _id).css("height", 0);
        $("#"+_id).css("height", 36);
    } else {
        $(".bar-dropdown", "#"+_id).css("transform", "rotate(0deg)");
        $(".bar-"+ _id).css("height", 200);
        $("#"+_id).css("height", 236);
        $(".bar-"+ _id + "> .bar-wrapper").show();
    }
});

// master hide all elements on screen
$("#toggleGUI").click(function() {
    $(".window-item").toggle();
});

$("#showTabs").hover(
    function() {
        $("#window-tab").show();
    }, function() {
        $("#window-tab").hide();
    }
);

$("#window-tab").hover(
    function() {
        $("#window-tab").show();
    }, function() {
        $("#window-tab").hide();
    }
);

$("#offMessage").click(function() {
    if ($("#message").is(":visible")) {
        $("#message").removeClass("window-item");
        $("#message").hide();
    } else {
        $("#message").addClass("window-item");
        $("#message").show();
    }
});

$("#offOrientation").click(function() {
    if ($("#orientation").is(":visible")) {
        $("#orientation").removeClass("window-item");
        $("#orientation").hide();
    } else {
        $("#orientation").addClass("window-item");
        $("#orientation").show();
    }
});

$("#offSettings").click(function() {
    if ($("#settings").is(":visible")) {
        $("#settings").removeClass("window-item");
        $("#settings").hide();
    } else {
        $("#settings").addClass("window-item");
        $("#settings").show();
    }
});


function setMessage(bheader, bcontent) {
    //console.log("Creating message");
    var timeNow = new Date();
    var hours   = timeNow.getHours();
    var minutes = timeNow.getMinutes();
    var seconds = timeNow.getSeconds();
    //var timeString = "" + ((minutes > 12) ? - 12 : hours);
    var timeString  = ((minutes < 10) ? "0" : "") + minutes;
    timeString  += ((seconds < 10) ? ":0" : ":") + seconds;
    
    var html = "<div><span class='bar-hl'>";
    //html += timeString;
    html += bheader;
    html += "</span><span class='bar-info'>";
    html += bcontent;
    html += "</span></div>";
    
    //console.log(html);
    $(".bar-message > .bar-wrapper").append(html);
    $('.bar-message > .bar-wrapper').scrollTop($('.bar-message > .bar-wrapper')[0].scrollHeight);
}

$('#settings-box :checkbox').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        if (this.name == "wireframe") {
            rcl2.addWireframe();
            setMessage("tomo", "Add cube wireframe.");
        }
        // the checkbox was checked 
    } else {
        if (this.name == "wireframe") {
            rcl2.removeWireframe();
            setMessage("tomo", "Remove cube wireframe.");
        }
        // the checkbox was unchecked
    }
});

$( "#bg-color" ).change(function() {
    console.log(this.value);
    rcl2.setBackgroundColor("#"+this.value);
    setMessage("tomo", "Set background color: #" + this.value);
});



$( document ).ready(function() {
    setMessage("GUI", "Initialized.");
    
    var date = new Date(parseInt( $("#start_time").val() )*1000);
    // Hours part from the timestamp
    var year = date.getUTCFullYear();
    // Minutes part from the timestamp
    var month = "0" + parseInt(date.getUTCMonth()+1);
    // Seconds part from the timestamp
    var day = "0" + date.getUTCDate();
                
    var hours = "0" + date.getUTCHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getUTCMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getUTCSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = year + '-' + month.substr(-2) + '-' + day.substr(-2) + ' ' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);            
    $("#slider-tooltip").text(formattedTime);
    
    // Handler for .ready() called.
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 100,
        values: [ 0, 100 ],
        slide: function( event, ui ) {
            console.log(ui.values);
            rcl2.setMinSos(ui.values[0]/100.0);
            rcl2.setMaxSos(ui.values[1]/100.0);
          //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $("#slider").slider({
        min: parseInt( $("#start_time").val() ),
        max: parseInt( $("#end_time").val() ),
        slide: function( event, ui ) {
            console.log(ui.value);
        }
    });
});