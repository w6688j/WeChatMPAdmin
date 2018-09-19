//提示消息框
function tip(options) {
    var conf = {
        html: "<div class=\"mingming-tips\" id=\"__ID__\"><div class=\"box\"><div class=\"shade\"><\/div><p>__TEXT__<\/p><\/div><\/div>",
        text: '提示',
        url: '',
        reload: false,
        time: 3000,
        id: new Date().valueOf()
    };
    if (typeof options == "string") {
        conf.text = options;
    } else {
        conf = $.extend(conf, options);
    }

    $('body').append(conf.html.replace('__TEXT__', conf.text).replace('__ID__', conf.id));
    $('#' + conf.id).fadeIn(500);
    if (conf.url) {
        $.URL.url(conf.url);
        conf.reload = true;
    }
    setTimeout(function () {
        if (conf.reload) {
            $.URL.reload();
        } else {
            $('#' + conf.id).fadeOut(1000, null, function () {
                $(this).remove();
            });
        }
    }, conf.time);
}