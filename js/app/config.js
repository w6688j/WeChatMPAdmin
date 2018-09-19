var config = {
    g_restUrl: 'https://mp.w6688j.com/api/v1/',
    tpl: function (tpl) {
        return '//' + window.location.host + "/js/app/views/" + tpl + '.tpl.html?v=' + VERSION;
    },
    parse: function (url) {
        return this.g_restUrl + url;
    }
};