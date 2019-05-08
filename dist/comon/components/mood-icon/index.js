"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baseComponent_1 = require("./../../wux/helpers/baseComponent");
baseComponent_1.default({
    externalClasses: ['wux-class'],
    properties: {
        type: {
            type: String,
            value: '',
        },
        size: {
            type: [String, Number],
            value: 32,
            observer: 'updated',
        },
        color: {
            type: String,
            value: '',
        },
        hidden: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        fontSize: '',
    },
    computed: {
        groupType: function () {
            var type = this.data.type;
            if (type && /^happy/.test(type)) {
                return 'mood-happy';
            }
            if (type && /^kaixin/.test(type)) {
                return 'mood-kaixin';
            }
            if (type && /^yiban/.test(type)) {
                return 'mood-yiban';
            }
            if (type && /^bushuang/.test(type)) {
                return 'mood-bushuang';
            }
            if (type && /^chaolan/.test(type)) {
                return 'mood-chaolan';
            }
            return '';
        }
    },
    methods: {
        updated: function (size) {
            if (size === void 0) { size = this.data.size; }
            var fontSize = size;
            if (typeof size === 'number') {
                fontSize = size + "px";
            }
            else if (typeof size === 'string') {
                if (!isNaN(Number(size))) {
                    fontSize = size + "px";
                }
            }
            if (this.data.fontSize !== fontSize) {
                this.setData({
                    fontSize: fontSize,
                });
            }
        },
    },
    attached: function () {
        this.updated();
    },
});
