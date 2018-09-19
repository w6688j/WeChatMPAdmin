define(['oa', 'config', 'srv/local-storage'], function (oa, $c, $localStorage) {
    return oa
    //下拉菜单
        .directive('uiDropdown', function () {
            return {
                restrict: 'A',
                link: function ($scope, elem, attrs) {
                    $(elem).dropdown({
                        onChange: function () {
                            if (attrs.onChange) {
                                $scope.$eval(attrs.onChange);
                            }
                        }
                    });
                }
            };
        })
        //popup
        .directive('uiPopup', function () {
            return {
                restrict: 'A',
                link: function ($scope, elem, attrs) {
                    $(elem).popup(attrs);
                }
            };
        })
        //tab
        .directive('uiTab', function () {
            return {
                restrict: 'A',
                link: function ($scope, elem, attrs) {
                    $('.item', elem).tab();
                }
            };
        })
        .directive('uiCheckbox', function () {
            return {
                restrict: 'A',
                link: function ($scope, elem, attrs) {
                    $(elem).checkbox();
                }
            };
        })
        .directive('uiModal', function () {
            return {
                restrict: 'A',
                link: function ($scope, elem, attrs) {
                    $(elem)
                        .modal('show')
                        .modal({
                            onHide: function () {
                            },
                            onDeny: function () {
                                if (attrs.onDeny) {
                                    return $scope.$eval(attrs.onDeny);
                                } else {
                                    return true;
                                }
                            },
                            onApprove: function () {
                                if (attrs.onApprove) {
                                    return $scope.$eval(attrs.onApprove);
                                } else {
                                    return true;
                                }
                            }
                        });
                    $scope.$on('close-modal', function () {
                        $(elem).modal('hide');
                    })
                }
            };
        })
        .directive('inputFile', function () {
            return {
                restrict: 'E',
                template: '<input type="file" />',
                replace: true,
                link: function (scope, elem) {
                    $(elem).bind("change", function (changeEvent) {
                        if (changeEvent.target.files) {
                            var reader = new FileReader();
                            reader.onload = function (loadEvent) {
                                scope.$apply(function () {
                                    scope.uploadfile = loadEvent.target.result.replace(/\+/g, '_');
                                });
                            };
                            reader.readAsDataURL(changeEvent.target.files[0]);
                        }
                    });
                }
            };
        })
        .directive('initNavbar', ['$http', '$rootScope', '$localStorage', function ($http, $rootScope, $localStorage) {
            return {
                restrict: 'A',
                link: function () {
                    var callback;
                    // 验证登录
                    let token = $localStorage.get('token');
                    if (!token) {
                        window.location.href = 'http://mpadmin.w6688j.com/login.html';
                    }
                    $http.get($c.parse('admin/navlist'))
                        .success(function (json) {
                            if (json.code == 0) {
                                $rootScope.navlist = json.data;
                                if (callback) {
                                    callback();
                                }
                            }
                        });
                    var setNav = function (id, type_id, subid) {
                        $rootScope.active.nav = null;
                        angular.forEach($rootScope.navlist, function (v) {
                            if (v.id == id) {
                                $rootScope.active.nav = v;
                            }
                        });
                        if (!$rootScope.active.nav) {
                            $rootScope.active.nav = $rootScope.navlist[0];
                        }
                        $rootScope.active.sub_navid = 0;
                        angular.forEach($rootScope.active.nav.list, function (v) {
                            if (v.id == type_id) {
                                angular.forEach(v.list, function (vv) {
                                    if (vv.id == subid) {
                                        $rootScope.active.sub_navid = subid;
                                    }
                                })
                            }
                        });
                        console.log($rootScope.active);
                        $rootScope.active.sub_navid == 0 && ($rootScope.active.sub_navid = $rootScope.active.nav.list[0]['id']);
                    };

                    $rootScope.setNavReport = function (id, type_id, subid) {
                        console.log(subid);
                        if ($rootScope.navlist) {
                            setNav(id, type_id, subid);
                        } else {
                            callback = function () {
                                setNav(id, type_id, subid);
                            }
                        }
                    };
                }
            };
        }])
        .directive('datepicker', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function ($scope, elem, attrs, ngModelCtrl) {
                    var options = {
                        dateFormat: attrs.format || 'yy/mm/dd',
                        onSelect: function (dateText) {
                            $scope.$apply(function () {
                                ngModelCtrl.$setViewValue(dateText);
                                if (attrs.onselect) {
                                    $scope.$eval(attrs.onselect);
                                }
                            });
                        }
                    };
                    if (attrs.beforeShowDay) {
                        options.beforeShowDay = $scope.$eval(attrs.beforeShowDay);
                    }
                    if (attrs.minDate) {
                        options.minDate = attrs.minDate;
                    }
                    if (attrs.maxDate) {
                        options.maxDate = attrs.maxDate;
                    }
                    $(elem).datepicker(options);
                }
            }
        })
        .directive('lowerthannow', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function ($scope, elem, attrs, ngModelCtrl) {

                    var format = function (input) {
                        ngModelCtrl.$setValidity('max', true);
                        var date = new Date(input), now = new Date();
                        if (input && date) {
                            if (date.getTime() <= now.getTime()) {
                                ngModelCtrl.$setValidity('max', true);
                                return input;
                            } else {
                                ngModelCtrl.$setValidity('max', false);
                            }
                        }
                        return undefined;
                    };
                    ngModelCtrl.$parsers.push(format);
                    ngModelCtrl.$formatters.push(format);
                }
            };
        })
        .directive('datetimepicker', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function ($scope, elem, attrs, ngModelCtrl) {
                    var options = {
                        dateFormat: attrs.format || 'yy/mm/dd',
                        timeFormat: attrs.timeFormat || 'HH:mm:00',
                        stepHour: 1,
                        stepMinute: 5,
                        showHour: true,
                        showMinute: true,
                        timeText: '时间',
                        hourText: '时',
                        minuteText: '分',
                        closeText: '确定',
                        currentText: '当前时间',
                        onSelect: function (dateText) {
                            $scope.$apply(function () {
                                ngModelCtrl.$setViewValue(dateText);
                                if (attrs.onselect) {
                                    $scope.$eval(attrs.onselect);
                                }
                            });
                        }
                    };
                    if (attrs.minDate) {
                        options.minDate = attrs.minDate;
                    }
                    if (attrs.maxDate) {
                        options.maxDate = attrs.maxDate;
                    }
                    $(elem).datetimepicker(options);
                }
            }
        })
        //格式化价格
        .directive('priceFormat', function () {
            //格式化input框中的合法价格
            return {
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModelCtrl) {

                    ngModelCtrl.$parsers.push(function (value) {
                        return '' + value;
                    });
                    ngModelCtrl.$formatters.push(function (value) {
                        return parseFloat(value);
                    });
                }
            };
        }).directive('dragX', function () {
            return {
                restrict: 'A',
                link: function ($scope, elem, attrs) {
                    var start = false;
                    var nowX, scrollLeft, minX, maxX, minY, maxY;
                    $(elem).css({
                        '-moz-user-select': 'none',
                        '-webkit-user-select': 'none',
                        '-ms-user-select': 'none',
                        'user-select': 'none',
                        'cursor': 'pointer'
                    })
                    ;
                    var parent = $(elem).parent();
                    minX = parent.offset().left;
                    maxX = minX + parent.width();
                    minY = parent.offset().top;
                    maxY = parent.height() + minY;
                    var first = false;
                    var loadConfig = function () {
                        minX = parent.offset().left;
                        maxX = minX + parent.width();
                        minY = parent.offset().top;
                        maxY = parent.height() + minY;
                        first = true;
                    }

                    parent.bind('dragstart', function () {
                        return false;
                    })
                    $(document).mousemove(function (e) {
                        if (!start) {
                            return false;
                        }
                        if (e.clientX > maxX || e.clientX < minX || e.clientY < minY || e.clientY > maxY) {
                            start = false;
                        }
                    });
                    $(elem).mousedown(function (e) {
                        !first && loadConfig();
                        if (start) {
                            return false;
                        }
                        nowX = e.clientX;
                        scrollLeft = $(elem).parent().scrollLeft();
                        start = true;
                    })
                    $(elem).mousemove(function (e) {

                        if (!start) {
                            return false;
                        }
                        var space = nowX - e.clientX;
                        $(elem).parent().scrollLeft(space + scrollLeft);
                        scrollLeft = space + scrollLeft;
                        nowX = e.clientX;
                    })
                    $(elem).mouseup(function (e) {
                        if (!start) {
                            return false;
                        }
                        start = false;
                    })
                }
            };
        })
});