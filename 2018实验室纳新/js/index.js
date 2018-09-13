$(() => {
    let welcome = Vue.component("my-welcome", {
        template: `<div id="welcome" class="container-fluid">
            <div class="container">
                <div class="row txtwrap" id="txt-wrap">
                    <h1 class="col-md-12">Hello , my friend !</h1>
                    <h1 class="col-md-12">Thanks for your watching . </h1>
                    <h2 class="col-sm-12 text-right">I'm Curtin —— 刘柯廷</h2>    
                </div>
            </div>
        </div>`,
        data: function () {
            return {
                isShadow: true, //是否设置效果标记
                $txtwrap: null, //设置效果对象
                timer: null, //定时器标记
                $welcome: null,
                $head: null
            }
        },
        mounted: function () {
            // 获取DOM对象
            this.$head = $("#pageHead");
            // console.log(this.$head);
            this
                .$head
                .removeClass("bgopacity");
            this.$welcome = $($("#welcome")[0]);
            this
                .$welcome
                .removeClass("out");
            this.$txtwrap = $($("#txt-wrap")[0]);
            // this
            //     .$txtwrap
            //     .addClass("bgchange");
            this.timer = setInterval(() => {
                this.isShadow = !this.isShadow;
                if (this.isShadow) {
                    this
                        .$txtwrap
                        .addClass("bgchange");
                } else {
                    this
                        .$txtwrap
                        .removeClass("bgchange");
                }
            }, 6000);
        },
        beforeDestroy: function () {
            clearInterval(this.timer);
            this
                .$welcome
                .addClass("out");
            this
                .$head
                .addClass("bgopacity");
        }
    });
    let baseInfo = Vue.component("my-info", {
        template: `<div id="baseInfo"  class="container-fluid">
                <div class="container content text-center">
                    <div class="imgwrap center-block"><img :src="avatar"></div>
                    <div class="row text-center">
                        <div class="row content">
                            <div class="col-sm-6 text-right" >{{name}}</div>
                            <div class="col-sm-4 col-sm-offset-2 col-md-offset-1 text-left" >{{birthday}}</div>
                        </div>
                        <div class="row content">
                            <div class="col-sm-5 text-right" >{{school}}</div>
                            <div class="col-sm-5 col-md-offset-1 col-sm-offset-2 text-left" >{{major}}</div>
                        </div>
                        <div class="row content">
                            <div class="col-sm-4 text-right" >{{graduate}}</div>
                            <div class="col-sm-6 col-md-offset-1 col-sm-offset-2 text-left" >{{email}}</div>
                        </div>
                    </div>
                </div>
        </div>`,
        data: function () {
            return {
                avatar: "img/avatar.jpg",
                name: "姓名——刘柯廷",
                birthday: "出生日期——1998年9月",
                school: "学校——西安邮电大学",
                major: "专业——光电信息科学与工程",
                graduate: "毕业时间——2021年6月",
                email: "邮箱——1138580559@qq.com"
            }
        }
    });
    let skillList = Vue.component("my-skill", {
        template: `<div id="skillList"  class="container-fluid">
            <div class="container content">
                <div class="row  text-center">
                    <div class="col-md-3 col-md-offset-1 col-xs-4" v-for="item in urlList"><img :src="item"></div>
                </div>
            </div>
        </div>`,
        data: function () {
            return {
                urlList: [
                    "img/html5.png",
                    "img/css3.png",
                    "img/es6.png",
                    "img/prog-jquery.png",
                    "img/bootstrap.png",
                    "img/vue.png",
                    "img/ajax.png"
                ]
            }
        }
    });
    let products = Vue.component("my-products", {
        template: `<div id="products"  class="container-fluid">
            <div class="container content">
                <ul class="wrap list-unstyled col-md-10 col-md-offset-1 text-center">
                    <li v-for="(item,index) in imgList" class="show">
                        <a :href="item.addr">
                            <img :src="item.url">
                        </a>
                    </li>
                </ul>
            </div>
        </div>`,
        
        mounted: function () {
            this.showItem = $(".show");
            for (let idx in this.classList) {
                this.showItem[idx].className = this.classList[idx];
            }
            this.play();
        },
        destroyed: function () {
            clearInterval(this.timer);
        },
        methods:{
            play:function(){
                let index = 0;
                this.timer = setInterval(() => {
                    index++;
                    this.showItem[0].className = this.classList[index];
                    if (index == 2) {
                        this.showItem[1].className = this.classList[1];
                        this.showItem[2].className = this.classList[0];
                    } else if (index == 1) {
                        this.showItem[1].className = this.classList[0];
                        this.showItem[2].className = this.classList[2];
                    } else if (index == 0) {
                        this.showItem[1].className = this.classList[2];
                        this.showItem[2].className = this.classList[1];
                    }
                    if (index == 2) {
                        index = -1;
                    }
                }, 4000);
            }
        }
    });
    Vue.component("logo-box", {
        template: `<div class="logo-box col-xs-5 col-md-2">
            <a href="itemObj.url">
                <img v-if="itemObj.img!=''" :src="itemObj.img"/>
                <p class="text-left"><span>{{itemObj.name}}</span> {{itemObj.title}}</p>
            </a>
        </div>`,
        props: ["itemObj"]
    });
    Vue.component("my-books", {
        template: `
            <div class="row">
                <div class="col-xs-5 col-md-2 books" v-for="item in books">
                    <a :href="item.url">
                        <img :src="item.img" />
                        {{item.name}}
                    </a>
                </div>
            </div>
        `,
        data: function () {
            return {
                books: [
                    {
                        name: "JavaScript高级程序设计（第3版）",
                        url: "https://book.douban.com/subject/10546125//",
                        img: "img/b1.jpg"
                    }, {
                        name: "JavaScript权威指南(第6版)",
                        url: "https://book.douban.com/subject/10549733/",
                        img: "img/b2.jpg"
                    }, {
                        name: "高性能网站建站指南",
                        url: "https://book.douban.com/subject/3132277/",
                        img: "img/b4.jpg"
                    }, {
                        name: "高性能网站建设进阶指南",
                        url: "https://book.douban.com/subject/4719162/",
                        img: "img/b6.jpg"
                    }, {
                        name: "构建可扩展的Web站点",
                        url: "https://book.douban.com/subject/3039216/",
                        img: "img/b5.jpg"
                    }, {
                        name: "你不知道的JavaScript（上卷）",
                        url: "https://read.douban.com/ebook/12051836/?dcs=subject-rec&dcm=douban&dct=10549733",
                        img: "img/b3.jpg"
                    }
                ]
            };
        }
    });
    Vue.component("my-community", {
        template: `
            <div>
                <logo-box v-for="item in comList" :itemObj="item"/>
            </div>
        `,
        data: function () {
            return {
                comList: [
                    {
                        name: "",
                        title: "一个帮助开发者成长的社区",
                        img: "img/juejin.svg",
                        url: "https://juejin.im/"
                    }, {
                        name: "JS Tips",
                        title: "每天推出一个JS技巧的网站",
                        img: "img/jstips.svg",
                        url: "http://www.jstips.co/"
                    }, {
                        name: "Git Hub",
                        title: "项目托管平台",
                        img: "img/git.gif",
                        url: "https://github.com/"
                    }, {
                        name: "",
                        title: "在SegmentFault，解决技术问题",
                        img: "img/sf.svg",
                        url: "https://segmentfault.com/"
                    }, {
                        name: "",
                        title: "Node.js专业中文社区",
                        img: "img/cnode.svg",
                        url: "https://cnodejs.org/"
                    }
                ]
            };
        }
    });
    Vue.component("my-utils", {
        template: `
        <div class="utils">
            <logo-box v-for="item in comList" :itemObj="item"/>
        </div>
    `,
        data: function () {
            return {
                comList: [
                    {
                        name: "Gulp",
                        title: "基于流的自动化构建工具",
                        img: "",
                        url: "https://www.gulpjs.com.cn/"
                    }, {
                        name: "Webpack",
                        title: "代码模块化构建工具",
                        img: "",
                        url: "https://webpack.js.org/"
                    }, {
                        name: "Browserify",
                        title: "遵循commonjs规范的模块化工具",
                        img: "",
                        url: "http://browserify.org/"
                    }
                ]
            };
        }
    });
    Vue.component("my-matirel", {template: `
            <div>
                <h1>待续。。。</h1>
            </div>
        `});
    let resource = Vue.component("my-rsc", {
        template: `<div id="resource"  class="container-fluid">
            <div class="row text-center">
                <div class="col-xs-12 col-sm-4 col-md-2">
                   <ul class="nav nav-pills nav-stacked">
                    <li v-for="item in navData" :data-id="item.isShow">{{item.name}}</li>
                   </ul>
                </div>
                <div class="col-sm-8 col-md-9">
                    <my-books v-if="showItem==1"/>
                    <my-community v-else-if="showItem==2"/>
                    <my-utils v-else-if="showItem==3"/>
                    <my-matirel v-else-if="showItem==4"/>
                </div>
            </div>
        </div>`,
        data: function () {
            return {
                navData: [
                    {
                        name: "书籍推荐",
                        isShow: 1
                    }, {
                        name: "技术社区",
                        isShow: 2
                    }, {
                        name: "框架/工具",
                        isShow: 3
                    }, {
                        name: "素材/配色",
                        isShow: 4
                    }
                ],
                $arrList: null,
                showItem: 1
            };
        },
        // <h1>内容</h1> <a
        // href="https://luuman.github.io/FrontEndGuide/V1/index.html">前端导航1</a> <a
        // href="http://www.alloyteam.com/nav/">前端导航2</a>
        mounted: function () {
            this.$arrList = $("#resource li");
            let that = this;
            for (let li of this.$arrList) {
                $(li)
                    .click(function () {
                        $(this)
                            .addClass("active")
                            .siblings()
                            .removeClass("active");
                        that.showItem = $(this).attr("data-id");
                    });
            }
        }
    });

    const myRoutes = [
        {
            path: "",
            component: welcome
        }, {
            path: "/welcome",
            component: welcome
        }, {
            path: "/baseInfo",
            component: baseInfo
        }, {
            path: "/skillList",
            component: skillList
        }, {
            path: "/products",
            component: products
        }, {
            path: "/resource",
            component: resource
        }
    ];
    const myRouter = new VueRouter({routes: myRoutes});
    new Vue({el: "#app", router: myRouter});
});