import baseComponent from './../../wux/helpers/baseComponent'

baseComponent({
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
        groupType() {
            const { type } = this.data;

            // happy
            if(type && /^happy/.test(type)) {
                return 'mood-happy'
            }

            // kaixin
            if(type && /^kaixin/.test(type)) {
                return 'mood-kaixin'
            }
            
            // yiban
            if(type && /^yiban/.test(type)) {
                return 'mood-yiban'
            }
            
            // yiban
            if(type && /^bushuang/.test(type)) {
                return 'mood-bushuang'
            }
            
            // yiban
            if(type && /^chaolan/.test(type)) {
                return 'mood-chaolan'
            }
            
            return ''
        }
    },
    methods: {
        updated(size = this.data.size) {
            let fontSize = size

            if (typeof size === 'number') {
                fontSize = `${size}px`
            } else if (typeof size === 'string') {
                if (!isNaN(Number(size))) {
                    fontSize = `${size}px`
                }
            }

            if (this.data.fontSize !== fontSize) {
                this.setData({
                    fontSize,
                })
            }
        },
    },
    attached() {
        this.updated()
    },
})
