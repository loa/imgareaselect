module("Basic");

(function () {

test("Plugin initialization", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();
        
    $('#test-img').imgAreaSelect({
        x1: 10, y1: 20, x2: 30, y2: 40,
        onInit: function (img, selection) {
            ok($('#test-img').imgAreaSelect({ instance: true }) instanceof
                    jQuery.imgAreaSelect, 'Check if "instance: true" returns an instance of ' +
                    'jQuery.imgAreaSelect');
            
            ok($('.imgareaselect-selection').length == 1,
                'Check if there is one element with the class ' +
                '"imgareaselect-selection"');

            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();

            start();
        }
    });
});

/* Test disabled for now */
1||test("", function () {
    $('#t').append('<img id="test-img" src="data/elephant.jpg?'
           + Math.random() + '" />');
    
    $('#test-img').imgAreaSelect({
        onInit: function (img, selection) {
            ok(true, 'Check if the plugin is correctly initialized when the ' +
                    'image finishes loading after .imgAreaSelect() is called');
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
    
    stop();
});

test("Elements layout", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" ' +
            'style="position: relative; z-index: 25;" />');

    stop();
    
    $('#test-img').imgAreaSelect({ x1: 10, y1: 20, x2: 30, y2: 40,
        handles: true,
        onInit: function (img, selection) {
            imgOfs = $('#test-img').offset();
            imgWidth = $('#test-img').width();
            imgHeight = $('#test-img').height();
            imgDim = dim($('#test-img'));

            /* Left */
            deepEqual(dim($('.imgareaselect-outer').eq(0)), { x1: imgDim.x1, 
                    y1: imgDim.y1, x2: imgDim.x1 + 10, y2: imgDim.y2 },
                    'Check if the first outer div is positioned correctly');

            /* Top */
            deepEqual(dim($('.imgareaselect-outer').eq(1)), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1, x2: imgDim.x1 + 30, y2: imgDim.y1 + 20 },
                'Check if the second outer div is positioned correctly');
            
            /* Right */
            deepEqual(dim($('.imgareaselect-outer').eq(2)), { x1: imgDim.x1 + 30, 
                y1: imgDim.y1, x2: imgDim.x2, y2: imgDim.y2 },
                'Check if the third outer div is positioned correctly');
            
            /* Bottom */
            deepEqual(dim($('.imgareaselect-outer').eq(3)), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 40, x2: imgDim.x1 + 30, y2: imgDim.y2 },
                'Check if the fourth outer div is positioned correctly');
            
            /* Selection area */
            deepEqual(dim($('.imgareaselect-selection')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the selection area div is positioned correctly');
            
            /* Selection border */
            deepEqual(dim($('.imgareaselect-border1')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the first area border div is positioned correctly');
            deepEqual(dim($('.imgareaselect-border2')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the second area border div is positioned correctly');
            deepEqual(dim($('.imgareaselect-border3')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the third area border div is positioned correctly');
            deepEqual(dim($('.imgareaselect-border4')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the fourth area border div is positioned correctly');
            
            /* Handles */
            deepEqual(dim($('.imgareaselect-handle').eq(0)), { x1: imgDim.x1 + 10,
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 10 + 5, y2: imgDim.y1 + 20 + 5 },
                'Check if the top left handle div is positioned correctly');
            deepEqual(dim($('.imgareaselect-handle').eq(4)), { x1: imgDim.x1 + 10 + 6,
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 10 + 11, y2: imgDim.y1 + 20 + 5 },
                'Check if the top handle div is positioned correctly');

            /* Z-index */
            equals($('.imgareaselect-selection').parent().css('z-index'), 27,
                'Check if the automatically calculated z-index value is correct');

            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("Elements layout with a bordered image", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" ' +
            'style="border: solid 10px red;" />');
    
    stop();
    
    $('#test-img').imgAreaSelect({ x1: 10, y1: 20, x2: 30, y2: 40,
        handles: true,
        onInit: function (img, selection) {
            imgOfs = $('#test-img').offset();
            imgWidth = $('#test-img').width();
            imgHeight = $('#test-img').height();
            imgDim = dim($('#test-img'), 10);

            /* Left */
            deepEqual(dim($('.imgareaselect-outer').eq(0)), { x1: imgDim.x1, 
                    y1: imgDim.y1, x2: imgDim.x1 + 10, y2: imgDim.y2 },
                    'Check if the first outer div is positioned correctly');

            /* Top */
            deepEqual(dim($('.imgareaselect-outer').eq(1)), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1, x2: imgDim.x1 + 30, y2: imgDim.y1 + 20 },
                'Check if the second outer div is positioned correctly');
            
            /* Right */
            deepEqual(dim($('.imgareaselect-outer').eq(2)), { x1: imgDim.x1 + 30, 
                y1: imgDim.y1, x2: imgDim.x2, y2: imgDim.y2 },
                'Check if the third outer div is positioned correctly');
            
            /* Bottom */
            deepEqual(dim($('.imgareaselect-outer').eq(3)), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 40, x2: imgDim.x1 + 30, y2: imgDim.y2 },
                'Check if the fourth outer div is positioned correctly');
            
            /* Selection area */
            deepEqual(dim($('.imgareaselect-selection')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the selection area div is positioned correctly');
            
            /* Selection border */
            deepEqual(dim($('.imgareaselect-border1')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the first area border div is positioned correctly');
            deepEqual(dim($('.imgareaselect-border2')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the second area border div is positioned correctly');
            deepEqual(dim($('.imgareaselect-border3')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the third area border div is positioned correctly');
            deepEqual(dim($('.imgareaselect-border4')), { x1: imgDim.x1 + 10, 
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 30, y2: imgDim.y1 + 40 },
                'Check if the fourth area border div is positioned correctly');
            
            /* Handles */
            deepEqual(dim($('.imgareaselect-handle').eq(0)), { x1: imgDim.x1 + 10,
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 10 + 5, y2: imgDim.y1 + 20 + 5 },
                'Check if the top left handle div is positioned correctly');
            deepEqual(dim($('.imgareaselect-handle').eq(4)), { x1: imgDim.x1 + 10 + 6,
                y1: imgDim.y1 + 20, x2: imgDim.x1 + 10 + 11, y2: imgDim.y1 + 20 + 5 },
                'Check if the top handle div is positioned correctly');
            
            /* Cleanup */
            $('#test-img').imgAreaSelect({ remove: true });
            testCleanup();
            
            start();
        }
    });
});

test("Positioning", function () {
    if ($.browser.msie && $.browser.version < 7)
        expect(7);
    else
        expect(9);
    
    /* Initialization */
    $('#t').append('\
        <div id="test-force-scroll" style="position: absolute;\
         width: 2000px; height: 2000px;">\
            &nbsp;\
        </div>\
    ');

    $('#t').append('\
        <div id="test-div-static">\
            Static<br />\
            <img id="test-img-static" src="data/elephant-small.jpg" />\
            <img id="test-img-static-parent" src="data/elephant-small.jpg" />\
        </div>\
    ');

    $('#t').append('\
        <div id="test-div-relative" style="position: relative;">\
            Relative<br />\
            <img id="test-img-relative" src="data/elephant-small.jpg" />\
            <img id="test-img-relative-parent" src="data/elephant-small.jpg" />\
        </div>\
    ');

    $('#t').append('\
        <div id="test-div-absolute" style="position: absolute; left: 10px;">\
            Absolute<br />\
            <img id="test-img-absolute" src="data/elephant-small.jpg" />\
            <img id="test-img-absolute-parent" src="data/elephant-small.jpg" />\
        </div>\
    ');

    $('#t').append('\
        <div id="test-div-fixed" style="position: fixed; left: 440px;">\
            Fixed<br />\
            <img id="test-img-fixed" src="data/elephant-small.jpg" />\
            <img id="test-img-fixed-parent" src="data/elephant-small.jpg" />\
        </div>\
    ');

    $('#t').append('\
        <div id="test-div-scrolled" style="position: absolute;\
         overflow: auto; height: 60px; left: 220px;">\
            Scrolled<br />\
            <img id="test-img-scrolled-parent" src="data/elephant-small.jpg" />\
        </div>\
    ');

    stop();

    $('#test-img-static').imgAreaSelect({
        x1: 10, y1: 20, x2: 30, y2: 40,
        show: true,
        classPrefix: 'ias',
        onInit: function (img, selection) {
            var imgOfs = $('#test-img-static').offset();
            var selOfs = $('.ias-selection').offset();

            equals(Math.round(selOfs.left) + ';' + Math.round(selOfs.top),
                Math.round(imgOfs.left + 10) + ';' + Math.round(imgOfs.top + 20),
                'Check if the selection area offset is correct for an ' +
                'image on a statically positioned div element');

            $('#test-img-static').imgAreaSelect({ remove: true });

            testImgStaticParent(); 
        }
    });

    var testImgStaticParent = function () {
        $('#test-img-static-parent').imgAreaSelect({
            parent: '#test-div-static',
            show: true,
            classPrefix: 'ias',
            x1: 10, y1: 20, x2: 30, y2: 40,
            onInit: function (img, selection) {
                var imgOfs = $('#test-img-static-parent').offset();
                var selOfs = $('.ias-selection').offset();
 
                equals(Math.round(selOfs.left) + ';' + Math.round(selOfs.top),
                    Math.round(imgOfs.left + 10) + ';' + Math.round(imgOfs.top + 20),
                    'Check if the selection area offset is correct for an ' +
                    'image on a statically positioned div element, ' +
                    'div specified as parent');
 
                /* Cleanup */
                $('#test-img-static-parent').imgAreaSelect({ remove: true });
 
                testImgRelative();
            }
        });
    };

    var testImgRelative = function () {
        $('#test-img-relative').imgAreaSelect({
            x1: 10, y1: 20, x2: 30, y2: 40,
            show: true,
            classPrefix: 'ias',
            onInit: function (img, selection) {
                var imgOfs = $('#test-img-relative').offset();
                var selOfs = $('.ias-selection').offset();
     
                equals(Math.round(selOfs.left) + ';' + Math.round(selOfs.top),
                    Math.round(imgOfs.left + 10) + ';' + Math.round(imgOfs.top + 20),
                    'Check if the selection area offset is correct for an ' +
                    'image on a relatively positioned div element');
     
                $('#test-img-relative').imgAreaSelect({ remove: true }); 
     
                testImgRelativeParent();
            }
        });
    };

    var testImgRelativeParent = function () {
        $('#test-img-relative-parent').imgAreaSelect({
            parent: '#test-div-relative',
            show: true,
            classPrefix: 'ias',
            x1: 10, y1: 20, x2: 30, y2: 40,
            onInit: function (img, selection) {
                var imgOfs = $('#test-img-relative-parent').offset();
                var selOfs = $('.ias-selection').offset();
     
                equals(Math.round(selOfs.left) + ';' + Math.round(selOfs.top),
                    Math.round(imgOfs.left + 10) + ';' + Math.round(imgOfs.top + 20),
                    'Check if the selection area offset is correct for an ' +
                    'image on a relatively positioned div element, ' +
                    'div specified as parent');
     
                /* Cleanup */
                $('#test-img-relative-parent').imgAreaSelect({ remove: true });
     
                testImgAbsolute();
            }
        });
    };
        
    var testImgAbsolute = function () {
        $('#test-img-absolute').imgAreaSelect({
            x1: 10, y1: 20, x2: 30, y2: 40,
            show: true,
            classPrefix: 'ias',
            onInit: function (img, selection) {
                var imgOfs = $('#test-img-absolute').offset();
                var selOfs = $('.ias-selection').offset();
     
                equals(Math.round(selOfs.left) + ';' + Math.round(selOfs.top),
                    Math.round(imgOfs.left + 10) + ';' + Math.round(imgOfs.top + 20),
                    'Check if the selection area offset is correct for an ' +
                    'image on an absolutely positioned div element');

                /* Cleanup */
                $('#test-img-absolute').imgAreaSelect({ remove: true }); 
     
                testImgAbsoluteParent();
            }
        });
    };

    var testImgAbsoluteParent = function () {
        $('#test-img-absolute-parent').imgAreaSelect({
            parent: '#test-div-absolute',
            show: true,
            classPrefix: 'ias',
            x1: 10, y1: 20, x2: 30, y2: 40,
            onInit: function (img, selection) {
                var imgOfs = $('#test-img-absolute-parent').offset();
                var selOfs = $('.ias-selection').offset();
 
                equals(Math.round(selOfs.left) + ';' + Math.round(selOfs.top),
                    Math.round(imgOfs.left + 10) + ';' + Math.round(imgOfs.top + 20),
                    'Check if the selection area offset is correct for an ' +
                    'image on an absolutely positioned div element, ' +
                    'div specified as parent');
 
                /* Cleanup */
                $('#test-img-absolute-parent').imgAreaSelect({ remove: true });

                if ($.browser.msie && $.browser.version < 7)
                    testImgScrolledParent();
                else
                    testImgFixed();
            }
        });
    };

    var testImgFixed = function () {
        $('#test-img-fixed').imgAreaSelect({
            x1: 10, y1: 20, x2: 30, y2: 40,
            show: true,
            classPrefix: 'ias',
            onInit: function (img, selection) {
                $(window).scrollLeft($(window).scrollLeft() + 100);
                $(window).scrollTop($(window).scrollTop() + 100);

                var imgOfs = $('#test-img-fixed').offset();
                var selOfs = $('.ias-selection').offset();
 
                equals(Math.round(selOfs.left) + ';' + Math.round(selOfs.top),
                    Math.round(imgOfs.left + 10) + ';' + Math.round(imgOfs.top + 20),
                    'Check if the selection area offset is correct for an ' +
                    'image on a fixedly positioned div element');

                /* Cleanup */
                $('#test-img-fixed').imgAreaSelect({ remove: true });
 
                testImgFixedParent(); 
            }
        });
    };

    var testImgFixedParent = function () {
        $('#test-img-fixed-parent').imgAreaSelect({
            parent: '#test-div-fixed',
            show: true,
            classPrefix: 'ias',
            x1: 10, y1: 20, x2: 30, y2: 40,
            onInit: function (img, selection) {
                $(window).scrollLeft($(window).scrollLeft() + 100);
                $(window).scrollTop($(window).scrollTop() + 100);
    
                var imgOfs = $('#test-img-fixed-parent').offset();
                var selOfs = $('.ias-selection').offset();
     
                equals(Math.round(selOfs.left) + ';' + Math.round(selOfs.top),
                    Math.round(imgOfs.left + 10) + ';' + Math.round(imgOfs.top + 20),
                    'Check if the selection area offset is correct for an ' +
                    'image on a fixedly positioned div element, ' +
                    'div specified as parent');
     
                /* Cleanup */
                $('#test-img-fixed-parent').imgAreaSelect({ remove: true });
     
                $(window).scrollLeft($(window).scrollLeft() - 200);
                $(window).scrollTop($(window).scrollTop() - 200);
     
                testImgScrolledParent();
            }
        });
    };
        
    var testImgScrolledParent = function () {
        $('#test-img-scrolled-parent').imgAreaSelect({
            parent: '#test-div-scrolled',
            show: true,
            classPrefix: 'ias',
            x1: 10, y1: 20, x2: 30, y2: 40,
            onInit: function (img, selection) {
                $('#test-div-scrolled').scrollTop($('#test-div-scrolled').scrollTop() + 20);
                
                var imgOfs = $('#test-img-scrolled-parent').offset();
                var selOfs = $('.ias-selection').offset();
     
                equals(Math.round(selOfs.left) + ';' + Math.round(selOfs.top),
                    Math.round(imgOfs.left + 10) + ';' + Math.round(imgOfs.top + 20),
                    'Check if the selection area offset is correct for an ' +
                    'image on an absolutely positioned scrolled div element, ' +
                    'div specified as parent');
     
                /* Cleanup */
                $('#test-img-scrolled-parent').imgAreaSelect({ remove: true });
                $('#test-div-scrolled').scrollTop($('#test-div-scrolled').scrollTop() - 20);
                testCleanup();
    
                start();
            }
        });
    };
});

test("Window resize", function () {
    /* Initialization */
    $('#t').append('<div style="display: none;">' +
            '<img id="test-img" src="data/elephant.jpg" /></div>');

    expect(1);
    
    var done = false;
    
    var continueTests = function (success, exception) {
        if (done)
            return;
        
        done = true;
        
        if (!success)
            ok(false, exception);
        else
            ok(true, 'Check if no exception is raised when the image is ' +
                    'hidden and window resize event occurs');
        
        /* Cleanup */
        $('#test-img').imgAreaSelect({ remove: true });
        $.handlerException(false);
        testCleanup();

        start();
    };
    
    $.handlerException($(window), 'resize',
        function (exception) {
            continueTests(false, exception);
        },
        function () {
            continueTests(true);
        });
    
    stop();

    $('#test-img').imgAreaSelect({
        onInit: function (img, selection) {
            $(window).resize();
            continueTests();
        }
    });
});

test("Plugin removal", function () {
    /* Initialization */
    $('#t').append('<img id="test-img" src="data/elephant.jpg" />');

    stop();
        
    $('#test-img').imgAreaSelect({
        x1: 10, y1: 20, x2: 30, y2: 40,
        onInit: function (img, selection) {
            ok($('#test-img').imgAreaSelect({ instance: true }) instanceof
                    jQuery.imgAreaSelect, 'Check if "instance: true" returns an instance of ' +
                    'jQuery.imgAreaSelect');
            
            ok($('.imgareaselect-selection').length == 1,
                'Check if there is one element with the class ' +
                '"imgareaselect-selection"');

            $('#test-img').imgAreaSelect({ remove: true });
        
            ok($('#test-img').data('imgAreaSelect') === undefined,
                    'Check if there is no imgAreaSelect instance stored as ' +
                    'element data');

            /* Cleanup */
            testCleanup();

            start();
        }
    });
});

})();