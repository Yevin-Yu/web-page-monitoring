(function () {
    // 获取Key
    const scriptSrc = document.currentScript.src;
    const urlParams = new URLSearchParams(scriptSrc.split('?')[1]);
    const key = urlParams.get('key');

    const Analytics = {
        init: function () {
            this.trackPageView();
        },
        trackPageView: function () {
            const pageViewData = {
                key: key,
                event: 'page_view',
                url: window.location.href,
                referrer: document.referrer,
                timestamp: convertTime(new Date()),
                userAgent: navigator.userAgent,
            };
            console.log(pageViewData)
        },
    };

    // 初始化插件
    document.addEventListener('DOMContentLoaded', () => {
        Analytics.init();
    });


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
})();