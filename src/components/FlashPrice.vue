<template>

<div class="m-countdown-cont" v-for="item in items">
    <img v-bind:src="item.image">
    <div class="case a" v-el:caseA>
        <span class="txt">
            {item.formated_start}    开抢
        </span>
    </div>
    <div class="case b" v-el:caseB>
        <span class="txt">
            开抢倒计时
            <span class="m-counter">
                <span class="hours" v-el:hourB>00</span>:<span class="minutes" v-el:minutesB>00</span>:<span class="seconds" v-el:secondsB>00</span>
            </span>
        </span>
    </div>
    <div class="case c" v-el:caseC>
        <span class="txt">
            结束倒计时
            <span class="m-counter">
                <span class="hours" v-el:hourC>00</span>:<span class="minutes" v-el:minutesC>00</span>:<span class="seconds" v-el:secondsC>00</span>
            </span>
        </span>
    </div>
    <div class="case d" v-el:caseD>
        <span class="txt">
            抢购结束
        </span>
    </div>
</div>
</template>

<script>
var TimeUtils = { //timestamp是以毫秒为单位的
    getCurrentTimeStamp: function() {
        var crtTimestamp = new Date().getTime();
        return crtTimestamp;
    },
    getTimeStampByDate: function(date) {
        if(isNaN(date)){
            var year = date.substr(0,4);
            var month = date.substr(5,2);
            var day = date.substr(8,2);
            var hour = date.substr(11,2);
            var minute = date.substr(14,2);
            var second = date.substr(17,2);
            var timestamp = Date.parse(new Date(year,parseInt(month)-1,day,hour,minute,second));
            return timestamp;
        }
        var timestamp = Date.parse(new Date(date));
        return timestamp;
    },
    getTimespanInSeconds: function(start_at, expired_at) {
        var startStamp = this.getTimeStampByDate(start_at);
        var endStamp = this.getTimeStampByDate(expired_at);
        return (endStamp - startStamp) / 1000;
    },
    getTimespanInHours: function(start_at, expired_at) {
        var timeSpan = this.getTimespanInSeconds(start_at, expired_at);
        var hour = Math.floor(timeSpan / 3600);
        return hour;
    },
    getTimespanInMinutes: function(start_at, expired_at) {
        var timeSpan = this.getTimespanInSeconds(start_at, expired_at);
        var minutes = Math.floor(timeSpan / 60);
        return minutes;
    },
    formatStartedTime: function(started_at) {
        var formatedTime = parseInt(started_at.substr(5, 2)) + '月' + parseInt(started_at.substr(8, 2)) + '日 ' + started_at.substr(11);
        return formatedTime;
    }
}

export default {
    name : 'FlashPrice',

    props : {
        items: Array
    },

    methods : {
        checkActivityStatus () {
            var to_start_time = TimeUtils.getTimespanInSeconds(this.ctdVars.STARTED_AT, TimeUtils.getCurrentTimeStamp());
            if (to_start_time < -43200) { //1.活动开始前12小时外
                this.$els.caseA.show().siblings('.case').hide();
            } else if (to_start_time < 0) { //2.活动开始前12小时内倒计时
                this.$els.caseB.show().siblings('.case').hide();
                this.updateCounter('b');
            } else if (TimeUtils.getCurrentTimeStamp() < TimeUtils.getTimeStampByDate(this.ctdVars.EXPIRED_AT)) { //3.活动进行中倒计时
                this.$els.caseC.show().siblings('.case').hide();
                this.updateCounter('c');
            } else { //4.活动已结束
                this.$els.caseD.show().siblings('.case').hide();
            }
        },

        updateCounter () {
            var crtTimestamp = TimeUtils.getCurrentTimeStamp();
            var to_start_time = TimeUtils.getTimespanInSeconds(this.ctdVars.STARTED_AT, crtTimestamp);

            if (tag == 'b') { //2.活动开始前12小时内倒计时
                var nTime = Math.abs(to_start_time);
                var hour = Math.floor(nTime / 60 / 60 % 24);
                var min = Math.floor(nTime / 60 % 60);
                var sec = Math.floor(nTime % 60);
                hour = hour >= 10 ? hour : '0' + hour;
                min = min >= 10 ? min : '0' + min;
                sec = sec >= 10 ? sec : '0' + sec;
                this.$els.hourB.html(hour);
                this.$els.minutesB.html(min);
                this.$els.secondsB.html(sec);
            } else { //3.活动进行中倒计时
                var to_end_time = TimeUtils.getTimespanInSeconds(this.ctdVars.EXPIRED_AT, crtTimestamp);
                var nTime = Math.abs(to_end_time);
                var hour = Math.floor(nTime / 60 / 60);
                var min = Math.floor(nTime / 60 % 60);
                var sec = Math.floor(nTime % 60);
                hour = hour >= 10 ? hour : '0' + hour;
                min = min >= 10 ? min : '0' + min;
                sec = sec >= 10 ? sec : '0' + sec;
                this.$els.hourC.html(hour);
                this.$els.minutesC.html(min);
                this.$els.secondsC.html(sec);
            }
        }
    },

    ready () {
        var self = this
        setInterval(function() {
            self.checkActivityStatus();
        }, 1000);
    }
}
</script>

<style lang="less">
    @import '../less/_variable.less';
    @import '../less/_mixin.less';
    @import '../less/_menu.less';
    @import '../less/_layout.less';
    @import '../less/_sellcontent.less';
.m-countdown-cont{
    height: 50px;
    position: relative;
    img{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .a,.b,.c,.d{
        text-align: center;
        line-height: 50px;
        display: none;
        .txt{
            position: relative;
            left:60px;
            font-size: 17px;
            color: #fff;
            .m-counter{
                .hours,.minutes,.seconds{
                    font-weight: normal;
                    font-size: 13px;
                    padding: 2px;
                    margin: 3px;
                    border-radius: 2px;
                    color:#fff;
                    background-color: #373737;
                }
            }
        }
    }
    .d{
        .txt{
            letter-spacing: 10px;
            font-size: 20px;
        }
    }
}
</style>