(function () {
    // 获取Key
    const scriptSrc = document.currentScript.src;
    const urlParams = new URLSearchParams(scriptSrc.split('?')[1]);
    const key = urlParams.get('key');
    const API = 'http://localhost:3001/api/page-view/'

    const Analytics = {
        init: function () {
            // 查看当前session是否已经存在
            if (!sessionStorage.getItem('visitor_id')) {
                this.trackPageView();
            }
        },
        trackPageView: function () {
            const visitor_id = generateRandomId(16);
            sessionStorage.setItem('visitor_id', visitor_id);
            const pageViewData = {
                code: key,
                visitor_id,
                url: window.location.href,
                title: document.title,
                referrer: document.referrer,
                visit_time: convertTime(new Date()),
                user_agent: navigator.userAgent,
            };
            // 发送请求到服务器
            fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pageViewData),
            })

        },
        // 更新浏览时间
        updateVisitTime: function () {
            const visitor_id = sessionStorage.getItem('visitor_id');
            const close_time = convertTime(new Date());
            const updateVisitTimeData = {
                code: key,
                visitor_id,
                close_time,
            };
            // 发送请求到服务器
            navigator.sendBeacon(API + 'update', JSON.stringify(updateVisitTimeData));
        }
    };


    // 初始化插件
    document.addEventListener('DOMContentLoaded', () => {
        Analytics.init();
    });

    // 监听页面关闭事件 
    window.addEventListener('beforeunload', () => {
        Analytics.updateVisitTime();
    })

    // 转换时间
    function convertTime(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    // 随机生成ID 大写字母+数字
    function generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = '';
        for (let i = 0; i < length; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return id;
    }
})();