var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_to_bottom: false,
    page_no: 1,
    page_size: 10,
    data_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.name);
  },
  getData(secondType) {
    let json = {
      page_no: this.data.page_no,
      page_size: this.data.page_size,
      secondType: secondType
    }
    base.http_post(json, '/goods/queryGoodsInfoByClass', res => {
      if (res.code == 0) {
        if (res.data) {
          if (this.data.page_no == 1) {
            this.setData({
              data_list: res.data.list
            })
          } else {
            let result = base.concattArr(this.data.data_list, res.data.list);
            this.setData({
              data_list: result
            })
            if (res.data.list.length < this.data.page_size) {
              this.setData({
                is_to_bottom: true
              })
            }
          }
        }
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  goodsDetail() {
    base.toast('warn', "该商品未发布拼团");
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
    this.setData({
      page_no: 1
    })
    this.getData();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.is_to_bottom) {
      wx.showNavigationBarLoading();
      this.setData({
        page_no: this.data.page_no + 1
      })
      this.getData();
      wx.hideNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})