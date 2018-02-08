var base = require('../../../utils/common/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_to_bottom: false,
    address_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData() {
    let json = {
      page_no: 1,
      page_size: 10
    }
    base.http_post(json, '/user/orderCenter/findReceivingAddressPage', res => {
      if (res.code == 0) {
        if (this.data.page_no == 1) {
          this.setData({
            address_list: res.data.items
          })
        } else {
          let result = base.concattArr(this.data.address_list, res.data.items);
          this.setData({
            address_list: result
          })
          if (res.data.items.length < this.data.page_size) {
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
  deleteAddress(e) {
    let json = {
      address_id: address_id
    }
    base.http_post(json, '/user/orderCenter/findReceivingAddressPage', res => {
      if (res.code == 0) {
        this.setData({
          address_list: res.data.items
        })
        wx.showToast({
          title: res.message,
          icon: 'success',
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  editAddress(e) {
    wx.navigateTo({
      url: '../addaddress/addaddress?id=' + e.currentTarget.dataset.id,
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '../addaddress/addaddress'
    })
  },
  selectAddress(e) {
    let i = e.currentTarget.dataset.i;
    let json = this.data.address_list[i];
    wx.setStorageSync('payAddress', JSON.stringify(json));
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
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