var base = require('../../../utils/common/base')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '', //商品id
    goodsIntroduce: '',
    collectionState: 0, //收藏状态0.未收藏1.已收藏
    commentMap: '', //评论
    goodsGroups: [],
    goodsImgList: [],
    groupRule: [],
    groupsImg: [],
    is_open_rule: false, //是否显示团规则
    is_over_time: false, //商品是否失效
    is_show_select: false, //是否显示规则弹框
    goods_specifications: [], //商品规格
    specificationsId: "", //选择的规格id
    stockAmount: 0, //选择规格对应的库存
    spec_num: 1, //选择规格的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.id)
  },
  getData(goods_id) {
    let json = {
      goodsId: goods_id
    }
    base.http_post(json, '/goods/queryGroupsGoodsInfoByBuyer', res => {
      if (res.code == 0) {
        this.setData({
          goodsId: goods_id,
          goodsIntroduce: res.data.goodsIntroduce,
          goodsGroups: res.data.goodsGroups,
          goodsImgList: res.data.goodsImgList,
          groupsImg: res.data.groupsImg,
          commentMap: res.data.commentMap,
          groupRule: res.data.groupRule,
          collectionState: res.data.collectionState
        })
      } else if (res.code == 10) {
        //商品失效
        this.setData({
          is_over_time: true
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  openRule() {
    this.setData({
      is_open_rule: !this.data.is_open_rule
    })
  },
  lookMore() {
    wx.navigateTo({
      url: '../assesslist/assesslist?id=' + this.data.goodsId
    })
  },
  jumpIndex() {
    //跳转到首页
    wx.switchTab({
      url: '../../index/index'
    })
  },
  cancelCollectGoods() {
    //取消收藏商品
    let json = {
      goodsId: this.data.goodsId
    }
    base.http_post(json, '/goods/buyersCancelCollectionGoods', res => {
      if (res.code == 0) {
        base.toast('succ', res.message);
        this.setData({
          collectionState: 0
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  collectGoods() { //收藏商品
    let json = {
      goodsId: this.data.goodsId,
      collectionPrice: this.data.goodsIntroduce.price
    }
    base.http_post(json, '/goods/buyersSaveCollectionGoods', res => {
      if (res.code == 0) {
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 3000
        })
        this.setData({
          collectionState: 1
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  getSpecifications() { //获取规格信息
    let json = {
      goodsId: this.data.goodsId
    }
    base.http_post(json, '/goods/queryGoodsSpecifications', res => {
      if (res.code == 0) {
        this.setData({
          goods_specifications: res.data
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  joinGroup() { //点击一键开团按钮
    this.getSpecifications();
    this.setData({
      is_show_select: true
    })
  },
  lookGroup(e) { //点击查看按钮
    if (!e.currentTarget.dataset.groupinfoid) {
      base.toast('warn', '查看开团的groupInfoId接口未返回');
      return;
    }
    wx.navigateTo({
      url: '../joingroup/joingroup?goodsId=' + this.data.goodsId + '&&groupsGoodsId=' + this.data.goodsIntroduce.groupsGoodsId + '&&groups_info_id=' + e.currentTarget.dataset.groupinfoid
    })
  },
  subBuyInfo() { //点击确定，一键开团
    let UserInfo = getApp().globalData;
    let json = {
      groups_goods_id: this.data.goodsIntroduce.groupsGoodsId,
      goods_id: this.data.goodsId,
      specifications_id: this.data.specificationsId,
      buyers_icon: UserInfo.avatarUrl,
      buy_count: this.data.spec_num,
      market_price: this.data.goodsIntroduce.marketPrice,
      buy_price: this.data.goodsIntroduce.price,
      end_time: this.data.goodsIntroduce.settlementTime,
      goodsIcon: this.data.goodsIntroduce.goodsIcon
    }
    base.http_post(json, '/orderCenter/saveOneKeyOpenGroupsGoods', res => {
      if (res.code == 0) {
        base.toast('succ', res.message);
        wx.navigateTo({
          url: '../comfirmpay/comfirmpay?orderid=' + res.data
        })
      } else {
        base.toast('warn', res.message);
      }
    })
  },
  contactKefu() { //联系客服
    base.toast('warn', '联系客服');
  },
  selectColor(e) { //选择规格
    this.setData({
      specificationsId: e.currentTarget.dataset.specificationsid, //选择的规格id
      stockAmount: e.currentTarget.dataset.stockamount //库存量
    })
  },
  closeSelected() {
    this.setData({
      is_show_select: false
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