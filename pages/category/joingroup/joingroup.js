var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    groupsGoodsId: '',
    groups_info_id: '',
    groupItem: '',
    groupsGoods: '',
    goods_specifications: [],
    stockAmount: 0,
    spec_num: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsId: options.goodsId,
      groupsGoodsId: options.groupsGoodsId,
      groups_info_id: options.groups_info_id
    })
    this.getData();
    this.getSpecifications();
  },
  getData() {
    let json = {
      goodsId: this.data.goodsId,
      groupsGoodsId: this.data.groupsGoodsId,
      groups_info_id: this.data.groups_info_id
    }
    base.http_post(json, '/orderCenter/queryJoinInGroupInfo', res => {
      if (res.code == 0) {
        this.setData({
          groupsGoods: res.data.groupsGoods,
          groupItem: res.data
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  openOrCloseDialog() {
    this.setData({
      is_show_select: !this.data.is_show_select
    })
  },
  getSpecifications() {
    let json = {
      goodsId: this.data.goodsId
    }
    base.http_post(json, '/goods/queryGoodsSpecifications', res => {
      if (res.code == 0) {
        this.setData({
          goods_specifications: res.data,
          stockAmount: res.data[0].stockAmount
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  selectColor(e) {
    this.setData({
      specificationsId: e.currentTarget.dataset.specificationsid, //选择的规格id
      stockAmount: e.currentTarget.dataset.stockamount //库存量
    })
  },
  jia() {
    if (this.data.spec_num == this.data.stockAmount) {
      return;
    }
    this.setData({
      spec_num: this.data.spec_num + 1
    })
  },
  jian() {
    if (this.data.spec_num == 1) {
      return;
    }
    this.setData({
      spec_num: this.data.spec_num - 1
    })
  },
  toJoin() {
    if (this.data.specificationsId == "") {
      base.toast('请选择规格', res.message);
      return;
    }
    if (this.data.stockAmount < this.data.spec_num) {
      base.toast('购买数量不能大于库存数量', res.message);
      return;
    }
    let UserInfo = getApp().globalData;
    let json = {
      buy_count: this.data.spec_num,
      buy_price: this.data.groupsGoods.price,
      buyers_icon: UserInfo.avatarUrl,
      goods_id: this.data.groupsGoods.goodsId,
      groups_goods_id: this.data.groupsGoods.groupsGoodsId,
      groups_info_id: this.data.groups_info_id,
      goodsIcon: this.data.groupsGoods.goodsIcon,
      market_price: this.data.groupsGoods.marketPrice,
      specifications_id: this.data.specificationsId
    };
    base.http_post(json, '/orderCenter/saveJoinInGroupsGoods', res => {
      if (res.code == 0) {
        this.setData({
          is_show_select: false
        })
        base.toast('succ', res.message);
        wx.navigateTo({
          url: '../comfirmpay/comfirmpay?orderid=' + res.data
        })
      } else if (res.code == 19) {
        base.toast('warn', '开团人数已满，请重新开团'); //最多显示7个文字
      } else {
        base.toast('warn', res.message);
      }
    });
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