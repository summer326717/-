// component/selectnum.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    number: {
      type: String,
      value: '123'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    num: '123'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jian() {
      console.log(this);
      this.number--;
    },
    jia() {
      this.number++;
    }
  }
})