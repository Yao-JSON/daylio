
Component({
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
    icon: {
        type: String,
        value: '',
    },
    content: {
        type: String,
        value: '',
    },
},
})