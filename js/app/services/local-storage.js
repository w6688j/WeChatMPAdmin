define(['oa'], function (pms) {
    pms.service('$localStorage', ['$window', function ($window) {
        return {
            //读取单个属性
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            //存储对象，以JSON格式存储
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            //读取对象
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);//将对象以字符串保存
            },
            //获取字符串并解析成对象
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            deleteLocalStorage: function (key) {
                return $window.localStorage.removeItem(key);
            }
        }
    }])
});