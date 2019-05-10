// @ts-ignore
import assign from 'lodash/assign';

// @ts-ignore
const safeSetDataBehavior =  Behavior({
  lifetimes: {
    created () {
      // @ts-ignore
      this.nextCallback = null
    },
    detached() {
      // @ts-ignore
      this.cancelNextCallback()
    },
  },
  methods: {
    /**
     * safeSetData
     * @param {Object} nextData 数据对象
     * @param {Function} callback 回调函数
     */
    safeSetData(nextData, callback) {
      // @ts-ignore
      this.pendingData = assign({}, this.data, nextData)
      callback = this.setNextCallback(callback)
      
      // @ts-ignore
      this.setData(nextData, () => {
        // @ts-ignore
        this.pendingData = null
        callback()
      })
    },
    /**
     * 设置下一回调函数
     * @param {Function} callback 回调函数
     */
    setNextCallback(callback) {
      let active = true
      
      // @ts-ignore
      this.nextCallback = (event) => {
        if (active) {
          active = false
          // @ts-ignore
          this.nextCallback = null
          
          callback.call(this, event)
        }
      }
      
      // @ts-ignore
      this.nextCallback.cancel = () => {
        active = false
      }
      
      // @ts-ignore
      return this.nextCallback
    },
    /**
     * 取消下一回调函数
     */
    cancelNextCallback() {
      // @ts-ignore
      if (this.nextCallback !== null) {
        // @ts-ignore
        this.nextCallback.cancel()
        // @ts-ignore
              this.nextCallback = null
          }
      },
  },
})

export default safeSetDataBehavior;
