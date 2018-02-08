// pages/category/category/category.js
var base = require('../../../utils/common/base.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu_list: [],
    second_menu_list: [],
    menu_id: '~', //左侧菜单id
    menu_name: "全部" //左侧菜单传给右侧上方分类
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getFirstMenu();
  },
  getFirstMenu() {
    let json = {
      supplier_accounts: 'admin',
      supplier_pass: '123456'
    }
    base.http_post(json, '/centerConfig/queryGoodsTypeList', res => {
      if (res.code == 0) {
        var menu_id = '' //sessionStorage.getItem("menu_id");
        if (menu_id) {
          //_this.menu_id = menu_id;
        } else {
          //_this.menu_id = res.data[0].typeId;
        }
        this.setData({
          menu_list: res.data,
          menu_name: res.data[0].typeChinese
        })
        this.getSecondMenu();
      } else {
        //_this.menu_list = [];
        //_this.second_menu_list = [];
        base.toast('warn', res.message);
      }
    });
  },
  getSecondMenu() {
    let json = {
      typeMode: 2,
      typeId: this.data.menu_id
    };
    base.http_post(json, "/centerConfig/queryGoodsTypeList", res => {
      if (res.code == 0) {
        this.setData({
          second_menu_list: res.data
        })
      } else {
        base.toast('warn', res.message);
      }
    });
  },
  changeSecondMenu(e) {
    if (e.currentTarget.dataset.typeid == this.data.menu_id) {
      return;
    }
    //sessionStorage.setItem("menu_id", this.data.menu_id);
    this.setData({
      menu_id: e.currentTarget.dataset.typeid,
      menu_name: e.currentTarget.dataset.typechinese
    })
    this.getSecondMenu();
  },
  toSearch() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  secondSearch(e) {
    wx.navigateTo({
      url: '../result/result?name=' + e.currentTarget.dataset.typeid + '&keyword=' + e.currentTarget.dataset.typechinese
    })
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