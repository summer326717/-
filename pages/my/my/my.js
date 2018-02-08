var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_portrait: "",
    nick_name: "",
    phone: "",
    groupIngNum: 0,
    groupFailedNum: 0,
    waitingPayNum: 0,
    waitingReceiveNum: 0,
    waitingReturnMnyNum: 0,
    waitingCommentNum: 0,
    waitingViewChatNum: 0,
    groupSuccessNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: (res) => {
        var userInfo = res.userInfo;
        this.setData({
          nick_name: userInfo.nickName,
          head_portrait: userInfo.avatarUrl,
          phone: ''
        })
      }
    })
    base.http_post('', '/orderCenter/queryOrderInfoCount', res => {
      if (res.code == 0) {
        this.setData({
          groupIngNum: res.data.groupIngNum, //拼团中的订单数量
          groupFailedNum: res.data.groupFailedNum, //拼团失败的订单数量
          waitingPayNum: res.data.waitingPayNum, //待付款的订单数量
          waitingReceiveNum: res.data.waitingReceiveNum, //待收货订单数量
          waitingReturnMnyNum: res.data.waitingReturnMnyNum, //待退款订单数量
          waitingCommentNum: res.data.waitingCommentNum, //待评价订单数量
          waitingViewChatNum: res.data.waitingViewChatNum,
          groupSuccessNum: res.data.groupSuccessNum
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  goToUpdate: function () {
    wx.navigateTo({
      url: '/pages/my/updateinfo/updateinfo'
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