var base = require('../../../utils/common/base');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiver_name: '',
    receiver_phone: '',
    pcr_address: '',
    receiver_address: '',
    receiver_city: '',
    receiver_province: '',
    receiver_region: '',
    receiver_is_default: 0,
    multiArray: [],
    province_list: [],
    city_list: [],
    region_list: [],
    multiIndex: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let address_id = options.id;
    if (address_id) {
      this.getData(address_id);
    }
    this.selectPcr();
  },
  getData(address_id) {
    let json = {
      address_id: address_id
    };
    base.http_post(json, "/user/orderCenter/findReceivingAddressById", res => {
      if (res.code == 0) {
        this.setData({
          receiver_name: res.data.receiver_name,
          receiver_phone: res.data.receiver_phone,
          pcr_address: res.data.pcr_address,
          receiver_address: res.data.receiver_address,
          receiver_city: res.data.receiver_city,
          receiver_province: res.data.receiver_province,
          receiver_region: res.data.receiver_region,
          receiver_is_default: res.data.receiver_is_default
        })
      } else {
        base.toast('warn', res.message);
      }
    });
  },
  getName: (e) => {
    console.log(e);
  },
  saveAddress() {
    let json = {
      receiver_name: this.name,
      receiver_phone: this.tel,
      receiver_city: this.receiver_city,
      receiver_province: this.receiver_province,
      receiver_region: this.receiver_region,
      receiver_address: this.address,
      receiver_is_default: this.is_new
    };
    base.http_post(json, "/user/orderCenter/findReceivingAddressById", res => {
      if (res.code == 0) {
        wx.navigateBack({
          delta: 1,
        })
        wx.showToast({
          title: res.message,
          icon: 'success',
        })
      } else {
        base.toast('warn', res.message);
      }
    });
  },
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log('c', e.detail.column, 'i', e.detail.value);
    let c = e.detail.column;
    var i = e.detail.value;
    if (c == 0) {
      this.setData({
        city_list: this.data.province_list[i].area_list,
        multiArray: [this.data.province_list, this.data.province_list[i].area_list, this.data.province_list[i].area_list[0].area_list]
      });
    }
    if (c == 1) {
      this.data.multiArray.splice(2, 1, this.data.city_list[i].area_list);
      this.setData({
        multiArray: this.data.multiArray
      });
    }
  },
  selectPcr() {
    base.http_post('', "/orderCenter/findAreaTree", res => {
      if (res.code == 0) {
        this.setData({
          province_list: res.data,
          city_list: res.data[0].area_list,
          multiArray: [res.data, res.data[0].area_list, res.data[0].area_list[0].area_list]
        })
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