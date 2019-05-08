/*! *****************************************************************************
Copyright (c) 2018 Tencent, Inc. All rights reserved. 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

declare namespace Component {

 
  interface ComponentInstanceBaseProps<D extends IAnyObject = any> {
    /** 页面的初始数据
     * 
     * `data` 是页面第一次渲染使用的**初始数据**。
     * 
     * 页面加载时，`data` 将会以`JSON`字符串的形式由逻辑层传至渲染层，因此`data`中的数据必须是可以转成`JSON`的类型：字符串，数字，布尔值，对象，数组。
     * 
     * 渲染层可以通过 `WXML` 对数据进行绑定。
    */
    data?: D

    /** `setData` 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 `this.data` 的值（同步）。
     *
     * **注意：**
     *
     * 1. **直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致**。
     * 1. 仅支持设置可 JSON 化的数据。
     * 1. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
     * 1. 请不要把 data 中任何一项的 value 设为 `undefined` ，否则这一项将不被设置并可能遗留一些潜在问题。
     */

    setData?<K extends keyof D>(
      /** 这次要改变的数据
       *
       * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
       *
       * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
       */
      data: D | Pick<D, K> | IAnyObject,
      /** setData引起的界面更新渲染完毕后的回调函数，最低基础库： `1.5.0` */
      callback?: () => void
    ): void

    triggerEvent?<K extends keyof D>(eventName: string): void

    /** 到当前页面的路径，类型为`String`。最低基础库： `1.2.0` */
    route?: string
  }

  interface ComponentInstance<D extends IAnyObject = any, T extends IAnyObject = any> extends ComponentInstanceBaseProps<D> {

    lifetimes?: {
      /** 生命周期回调—监听页面加载
       *
       * 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
       */
      onLoad?(
        /** 打开当前页面路径中的参数 */
        query?: { [queryKey: string]: string }
      ): void
      /** 生命周期回调—监听页面显示
       *
       * 页面显示/切入前台时触发。
       */
      onShow?(): void
      /** 生命周期回调—监听页面初次渲染完成
       * 
       * 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
       * 
     
      * 注意：对界面内容进行设置的 API 如`wx.setNavigationBarTitle`，请在`onReady`之后进行。
      */
      onReady?(): void
      /** 生命周期回调—监听页面隐藏
       *
       * 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等。
       */
      onHide?(): void
      /** 生命周期回调—监听页面卸载
       *
       * 页面卸载时触发。如`redirectTo`或`navigateBack`到其他页面时。
       */
      onUnload?(): void
    }

    options?: {
      [propsName: string]: any; 
    }
    
  }

  interface ComponentConstructor {
    <D extends IAnyObject, T extends IAnyObject & ComponentInstance>(
      options: ComponentInstance<D, T> & T
    ): void
  }

  // interface GetCurrentPages {
  //   <D extends IAnyObject = {}, T extends IAnyObject = {}>(): (PageInstance<D, T> & T)[]
  // }
}

declare const Component: Component.ComponentConstructor
