(function() {
    function DropDown(options) {
        this.href = options.href;
        this.title = options.title;
        this.wrap = options.wrap;
        this.width = options.width;
        this.menuList = options.menuList;
        this.direction = options.direction || 'y';
        this.init = function () {
            this.createDom();
            this.initStyle();
            this.bindEvent();
        }
    }

    DropDown.prototype.createDom = function () {
        // 创建标题  展示在导航条里面元素
        $(this.wrap).append($('<a class="dropdown-btn" href="#">' + this.title + '</a>' ));
        // 添加下拉列表
        var dropDownDiv = $('<div class="my-dropdown"></div>');
        // 添加下拉列表内的每块元素
        for (var i = 0; i < this.menuList.length; i++) {
            var menu = this.menuList[i];
            // 创建下拉列表里面的每一块
            var dl = $('<dl></dl>');
            // 如果该部分存在标题则添加标题
            if (menu.title) {
                $('<dt>' + menu.title + '</dt>').appendTo(dl);
            }
            // 向每块中添加元素内容
            menu.items.forEach(function(item) {
                $('<dd>' + item.name + '</dd>').appendTo(dl);
            });
            // 讲每块内容添加到下拉列表div中
            dropDownDiv.append(dl);
        }
        // 将下拉列表添加到父元素中
        dropDownDiv.appendTo($(this.wrap));
    }
    DropDown.prototype.initStyle = function () {
        $(this.wrap).css({
            position: 'relative',
        })
        $('.my-dropdown', this.wrap).css({
            position: 'absolute',
            backgroundColor: '#fff',
            border: '1px solid #eee',
            paddingLeft: 10,
            overflow: 'hidden',
            display: 'none',
            left: 0,
            zIndex:200,
        }).find('dl').css({
            width: (this.width + 10)  * 2,
            overflow: 'hidden',
            // padding: '0 10px',
            borderBottom: '1px solid #eee'
        }).find('dd').css({
            width: this.width,
            float: 'left',
            // textAlign: 'left',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
        });
        $('.my-dropdown dl', this.wrap).find('dt').css({
            textAlign: 'left',
            fontWeight: 700,
            color: '#666'
        });
        // 如果每块区域横向排列样式不同
        if (this.direction == 'x') {
            $('.my-dropdown', $(this.wrap)).css({
                width: 1190,
                right: -84,
                left: 'auto',
            });
            var self = this;
            console.log(this.wrap)
            $('.my-dropdown  dl', $(this.wrap)).each(function(i) {
                $(this).css({
                    width: self.menuList[i].width,
                    float: 'left',
                    borderRight: '1px solid #eee',
                    borderBottom: 'none',
                    margin: 10
                }).find('dd').css({
                    width: self.menuList[i].itemWidth
                })
            })

        }
    }
    DropDown.prototype.bindEvent = function () {
        var self = this;
        $(this.wrap).hover(function () {
            $( this).css({
                backgroundColor: "#fff"
            })
            $('.my-dropdown', self.wrap).show();
        }, function () {
            $('.my-dropdown', self.wrap).hide();
            $(this).css('background-color', 'transparent')
        });
    }
        // 下拉列表不同   每个下拉列表分的区块不同  宽度不同
    $.fn.extend({
        addDropdown: function (options) {
            options.wrap = this;
            var dropdownObj = new DropDown(options);
            dropdownObj.init();
        }
    })
} ())