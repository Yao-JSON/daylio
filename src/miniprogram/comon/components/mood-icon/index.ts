// @ts-ignore
import baseComponent from '../../wux/helpers/baseComponent'

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
            // @ts-ignore
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
            
            // bushuang
            if(type && /^bushuang/.test(type)) {
                return 'mood-bushuang'
            }
            
            // chaolan
            if(type && /^chaolan/.test(type)) {
                return 'mood-chaolan'
            }
            
            return ''
        }
    },
    methods: {
        // @ts-ignore
        updated(size = this.data.size) {
            let fontSize = size
            
            if (typeof size === 'number') {
                fontSize = `${size}px`
            } else if (typeof size === 'string') {
                if (!isNaN(Number(size))) {
                    fontSize = `${size}px`
                }
            }
            
            // @ts-ignore
            if (this.data.fontSize !== fontSize) {
                // @ts-ignore
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
