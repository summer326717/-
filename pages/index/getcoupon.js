var base = require('../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_to_bottom: false,
    data_list: [],
    page_no: 1,
    page_size: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData() {
    let json = {
      page_no: this.data.page_no,
      page_size: this.data.page_size
    }
    base.http_post(json, '/goods/buyersQryCouponsActivity', res => {
      if (res.code == 0) {
        res.data.resultList.map(function (item, i) {
          item.startTime = base.transTime(item.startTime, 5);
          item.endTime = base.transTime(item.endTime, 5);
        });
        if (this.data.page_no == 1) {
          this.setData({
            data_list: res.data.resultList
          })
        } else {
          let result = base.concattArr(this.data.data_list, res.data.resultList);
          this.setData({
            data_list: result
          })
          if (res.data.resultList.length < this.data.page_size) {
            this.setData({
              is_to_bottom: true
            })
          }
        }
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  getCoupon(e) {
    let i = e.currentTarget.dataset.i;
    let json = {
      activityId: this.data.data_list[i].activityId,
      discountMode: this.data.data_list[i].discountMode,
      discountAmount: this.data.data_list[i].discountAmount,
      rangeId: this.data.data_list[i].rangeId,
      rangeName: this.data.data_list[i].rangeName,
      rangeCondition: this.data.data_list[i].rangeCondition,
      getWay: this.data.data_list[i].getWay,
      termValidity: this.data.data_list[i].termValidity,
      discountFactor: this.data.data_list[i].discountFactor,
      supplierId: this.data.data_list[i].supplierId,
      couponsType: this.data.data_list[i].couponsType,
    }
    base.http_post(json, '/user/payCenter/saveBuyersCoupons', res => {
      if (res.code == 0) {
        this.getData();
      } else { //code为20，券抢完了
        base.toast('warn', res.message);
      }
    })
  },
  toUse(e) {
    let rangeid = e.currentTarget.dataset.rangeid;
    if (rangeid == 0) { //可使用优惠券的列表
      wx.navigateTo({
        url: '/pages/index/hotsell?id=' + e.currentTarget.dataset.supplierid,
      });
    } else {
      wx.navigateTo({
        url: '../category/goods/goods?id=' + e.currentTarget.dataset.rangeid,
      })
    }
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