"use strict";
Component({
    externalClasses: ['wux-class'],
    properties: {
        moodText: {
            type: String,
            value: '',
        },
        date: {
            type: String,
            value: '',
        },
        time: {
            type: String,
            value: '',
        },
        activity: {
            type: Array,
            value: [],
        },
        icon: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        },
    },
});
