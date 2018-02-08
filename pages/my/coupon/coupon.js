var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_no: 1,
    page_size: 10,
    data_list: [],
    coupon_type: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(1);
  },
  getData(state) { //1.未使用2.已使用3.已过期
    let json = {
      page_no: this.data.page_no,
      page_size: this.data.page_size,
      state: parseInt(state),
    }
    base.http_post(json, '/user/payCenter/queryBuyersCoupons', res => {
      if (res.code == 0) {
        res.data.resultList.map(function (item, i) {
          item.createTime = base.transTime(item.createTime, 5)
        })
        this.setData({
          data_list: res.data.resultList,
          coupon_type: state
        })
      } else if (res.code == 10) {
        this.setData({
          data_list: [],
          coupon_type: state
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  changeState(e) {
    this.getData(e.currentTarget.dataset.type);
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