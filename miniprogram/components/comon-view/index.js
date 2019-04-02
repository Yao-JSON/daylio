import baseComponent from './../../wux/helpers/baseComponent';

baseComponent({
  methods: {
    onLongTap(e) {
      console.log('onLongTap', e);
    },
    onTap(e) {
      console.log('onTap', e);
    }
  }
})