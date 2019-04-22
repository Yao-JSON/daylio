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

            // lvyou
            if(type && /^lvyou/.test(type)) {
                return 'active-lvyou-icon'
            }
            
            return ''
        }
    },
    methods: {
        updated(size = this.data.size) {
            let fontSize = size

            if (typeof size === 'number') {
                fontSize = `${size}px`
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