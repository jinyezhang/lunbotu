

(function () {
    // 创建轮播图对象的构造函数
    function Swiper(options) {
        // 轮播图插入的位置
        this.wrap = options.wrap || $('body');
        // 轮播的图片列表
        this.imgList = options.imgList;
        // 轮播动画类型
        this.animateType = options.animateType || "fade";
        // 是否展示左右切换按钮
        this.changeBtn = options.changeBtn;
        // 是否展示小圆点
        this.showPointBtn = options.showPointBtn;
        this.isAuto = options.isAuto;
        // 初始化函数
        this.imgWidth = options.imgWidth || $(this.wrap).width();
        this.imgHeight = options.imgHeight || $(this.wrap).height();
        this.nowIndex = 0;
        this.imgNum = this.imgList.length;
        this.lock = true;
        this.init = function () {
            // 创建轮播图结构
            this.createDom();
            // 初始化样式
            this.initStyle();
            // 绑定事件
            this.bindEvent();
            if (this.isAuto) {
                this.autoChange();
            }
            
        }
    }

    Swiper.prototype.createDom = function () {
        var oUl = $('<ul class="swiper-wrap"></ul>');
        var spotDiv = $('<div class="spot"></div>');
        this.imgList.forEach(function (item) {
            $('<li><a href="#"><img src="' + item + '"/></a></li>').appendTo(oUl);
            $('<span></span>').appendTo(spotDiv);
        });
        if (this.animateType == 'animate') {
            $('<li><a href="#"><img src="' + this.imgList[0] + '"/></a></li>').appendTo(oUl);
        }
        var leftBtn = $('<div class="btn left-btn">&lt;</div>');
        var rightBtn = $('<div class="btn right-btn">&gt;</div>');
        $(this.wrap).append(oUl);
        if (this.changeBtn) {
            $(this.wrap).append(leftBtn).append(rightBtn);
        }
        if (this.showPointBtn) {
            $(this.wrap).append(spotDiv);
        }
    }
    Swiper.prototype.initStyle = function () {
        $(this.wrap).css({
            position: 'relative',
            overflow: 'hidden'
        })
        $('*', this.wrap).css({
            listStyle: 'none',
            textDecoration: 'none',
            padding: 0,
            margin: 0,
        }).find('a').css({
            width: '100%',
            height: '100%',
            display: 'inline-block'
        });
        $('img', this.wrap).css({
            width: '100%',
            height: '100%'
        });
        if (this.animateType == 'animate') {
            $('.swiper-wrap', this.wrap).css({
                width: this.imgWidth * (this.imgNum + 1),
                height: this.imgHeight,
                position: 'absolute',
            }).find('li').css({
                width: this.imgWidth,
                height: this.imgHeight,
                float: 'left'
            });
        } else {
            $('.swiper-wrap', this.wrap).css({
                position: 'relative'
            }).find('li').css({
                position: 'absolute',
                left: 0,
                top: 0,
                width: this.imgWidth,
                height: this.imgHeight,
                display: 'none'
            }).eq(this.nowIndex).css({
                display: 'block'
            })
        }

        $('.btn', this.wrap).css({
            width: 50,
            height: 30,
            lineHeight: '30px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            marginTop: -15,
            cursor: 'pointer',
        }).filter('.right-btn').css({
            right: 0,
        });
        $('.spot', this.wrap).css({
            position: "absolute",
            bottom: 10,
            width: '100%',
            textAlign: 'center',
            cursor: 'pointer'
        })
        $('.spot > span', this.wrap).css({
            display: 'inline-block',
            width: 10,
            height: 10,
            margin: '0 5px',
            borderRadius: '50%',
            backgroundColor: '#fff',
        }).eq(this.nowIndex).css({
            backgroundColor: 'red'
        });
    }

    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.left-btn', this.wrap).click(function () {
            if (!self.lock) {
                return false;
            }
            if (self.nowIndex == 0) {
                if (self.animateType == 'animate') {
                    $('.swiper-wrap', self.wrap).css({
                        left: -self.imgWidth * self.imgNum
                    });
                }
                self.nowIndex = self.imgNum - 1;
            } else {
                self.nowIndex --;
            }
            self.changeImage()
        });
        $('.right-btn', this.wrap).click(function () {
            if (!self.lock) {
                return false;
            }
            if (self.animateType == 'fade' && self.nowIndex == self.imgNum - 1) {
                self.nowIndex = 0;
            } else if (self.animateType == 'animate' && self.nowIndex == self.imgNum) {
                $('.swiper-wrap', self.wrap).css({
                    left: 0
                });
                self.nowIndex = 1;
            }else {
                self.nowIndex ++;
            }
            self.changeImage()
        });
        $('.spot > span', this.wrap).click(function () {
            if (!self.lock) {
                return false;
            }
            self.nowIndex = $(this).index();
            self.changeImage();
        });
        $(this.wrap).mouseenter(function () {
            clearTimeout(self.timer);
        }).mouseleave(function () {
            if (self.isAuto){
                self.autoChange()
            }
        })
    }
    Swiper.prototype.changeImage = function () {
        this.lock = false;
        var self = this;
        if (this.animateType == 'fade') {
            $('.swiper-wrap > li', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function () {
                self.lock = true;
            });
        } else {
            $('.swiper-wrap', this.wrap).animate({
                left: -this.nowIndex * this.imgWidth,
            }, function() {
                self.lock = true;
            })
        }
        $('.spot > span', this.wrap).css({
            backgroundColor: '#fff',
        }).eq(this.nowIndex % this.imgNum).css({
            backgroundColor: 'red'
        })
    }
    Swiper.prototype.autoChange = function () {
        var self = this;
        this.timer = setInterval(function () {
            $('.right-btn', self.wrap).click();
        }, 3000)
    }

    $.fn.extend({
        swiper: function (options) {
            options.wrap = this;
            var obj = new Swiper(options);
            obj.init();
        }
    });
    
} ())

// $.extend()  
// $.fn.extend() ---> fn == prototype

