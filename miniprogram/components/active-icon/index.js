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

            // business
            if(type && /^business/.test(type)) {
                return 'active-business-icon'
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
