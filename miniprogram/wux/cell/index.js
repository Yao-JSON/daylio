import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { getTouchPoints, getPointsNumber, getSwipeDirection } from '../helpers/gestures'

// 是否在跳转中
let isLinkJumping = false;

const restXy = {
    x: 0,
    y: 0
};

let start = restXy;

let end = restXy;

baseComponent({
    relations: {
        '../cell-group/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-cell',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        hoverClass: {
            type: String,
            value: 'default',
        },
        hoverStopPropagation: {
            type: Boolean,
            value: false,
        },
        hoverStartTime: {
            type: Number,
            value: 20,
        },
        hoverStayTime: {
            type: Number,
            value: 70,
        },
        lang: {
            type: String,
            value: 'en',
        },
        sessionFrom: {
            type: String,
            value: '',
        },
        sendMessageTitle: {
            type: String,
            value: '',
        },
        sendMessagePath: {
            type: String,
            value: '',
        },
        sendMessageImg: {
            type: String,
            value: '',
        },
        showMessageCard: {
            type: Boolean,
            value: false,
        },
        appParameter: {
            type: String,
            value: '',
        },
        thumb: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        extra: {
            type: String,
            value: '',
        },
        isLink: {
            type: Boolean,
            value: false,
        },
        openType: {
            type: String,
            value: 'navigateTo',
        },
        url: {
            type: String,
            value: '',
        },
        delta: {
            type: Number,
            value: 1,
        },
    },
    data: {
        isLast: false,
    },
    computed: {
        classes() {
            const { prefixCls, hoverClass, isLast, isLink, disabled } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--last`]: isLast,
                [`${prefixCls}--access`]: isLink,
                [`${prefixCls}--disabled`]: disabled,
            })
            const hd = `${prefixCls}__hd`
            const thumb = `${prefixCls}__thumb`
            const bd = `${prefixCls}__bd`
            const text = `${prefixCls}__text`
            const desc = `${prefixCls}__desc`
            const ft = `${prefixCls}__ft`
            const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

            return {
                wrap,
                hd,
                thumb,
                bd,
                text,
                desc,
                ft,
                hover,
            }
        },
    },
    methods: {
        onTap() {
            if (!this.data.disabled) {
                this.triggerEvent('click')
                this.linkTo()
            }
        },
        onTouchStart(e) {
            if(getPointsNumber(e) <= 1) {
                start = getTouchPoints(e);
            }
        },
        onTouchend(e) {
            if(getPointsNumber(e) <= 1) {    
                end = getTouchPoints(e);
                if (Math.abs(end.x - start.x) < 3 && !this.data.disabled) {
                    this.triggerEvent('click')
                    this.linkTo();

                }
                end = restXy;
                start = restXy;
            }
        },
        bindgetuserinfo(e) {
            this.triggerEvent('getuserinfo', e.detail)
        },
        bindcontact(e) {
            this.triggerEvent('contact', e.detail)
        },
        bindgetphonenumber(e) {
            this.triggerEvent('getphonenumber', e.detail)
        },
        bindopensetting(e) {
            this.triggerEvent('opensetting', e.detail)
        },
        onError(e) {
            this.triggerEvent('error', e.detail)
        },
        linkTo() {
            const { url, isLink, openType, delta } = this.data
            const navigate = [
                'navigateTo',
                'redirectTo',
                'switchTab',
                'navigateBack',
                'reLaunch',
            ]

            // openType 属性可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch
            if (!isLink || !url || !navigate.includes(openType)) {
                return false
            } else if (openType === 'navigateBack') {
                return wx[openType].call(wx, { delta })
            } else if(!isLinkJumping) {
                isLinkJumping = true;
                return wx[openType].call(wx, { url, complete() {
                    isLinkJumping = false;
                }})
            }
        },
        updateIsLastElement(isLast) {
            this.setData({ isLast })
        },
    },
})
