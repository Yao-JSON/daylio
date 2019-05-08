"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baseComponent_1 = require("../../wux/helpers/baseComponent");
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
            if (type && /^business/.test(type)) {
                return 'active-business-icon';
            }
            if (type && /^lvyou/.test(type)) {
                return 'active-lvyou-icon';
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
