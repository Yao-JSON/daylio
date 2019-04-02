import baseComponent from './../../wux/helpers/baseComponent';

baseComponent({
  properties:{
    
  },
  data: {
    visible: false
  },
  methods: {
    onLongPress(e) {
      console.log('onLongPress', e);
      this.setData({
        visible: true
      });
    }
  }
})