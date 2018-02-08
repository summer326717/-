var base = require('../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_no: 1,
    page_size: 2,
    data_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) { //能使用优惠券的商品列表
      let json = {
        page_no: this.data.page_no,
        page_size: this.data.page_size,
        supplier_id: options.id
      }
      base.http_post(json, "/goods/buyerQrySupplierGoods", res => {
        if (res.code == 0) {
          this.setData({
            data_list: res.data.resultList
          })
        } else {
          base.toast('warn', res.message);
        }
      })
    } else { //热销列表
      let json = {
        page_no: this.data.page_no,
        page_size: this.data.page_size
      };
      base.http_post(json, '/goods/buyersQryBestSelling', res => {
        if (res.code == 0) {
          this.setData({
            data_list: res.data.resultList
          })
        } else {
          base.toast('warn', res.message);
        }
      })
    }
  },
  Derect() {
    base.toast('warn', '该商品未发布拼团');
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})