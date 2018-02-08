var MD5 = require('../common/md5.js');

export function http_post(json, url, completion) {
  toast('load', '加载中...');
  var time = Date.parse(new Date());
  var hash = MD5.hex_md5(time + "hotol");
  json = JSON.stringify(json);
  wx.request({
    method: "POST",
    url: 'http://testwb.hotol.cn/api/1' + url,
    data: json,
    dataType: "text",
    header: {
      "version": "1",
      "client_type": "3",
      "Timestamp": time,
      "SignInfo": hash,
      "token": "B2c478bfe86b041ccb888d80d1918ee47",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8"
    },
    success: function (res) {
      res = JSON.parse(res.data);
      wx.hideLoading()
      if (res.error) {
        toast('warn', res.status + res.error);
      } else {
        console.log(res)
        completion(res);
      }
    },
    fail: function (err) {
      wx.hideLoading()
      toast('warn', err.status + err.error);
    }
  })
}
export function http_post_img(completion) {
  wx.request({
    method: "POST",
    url: 'http://testwb.hotol.cn/api/1/oss/uploadGoodsFile',
    dataType: "json",
    success: function (res) {
      completion(res);
    },
    fail: function (err) {
      completion(err);
    }
  })
}

export function uploadImg() {
  wx.chooseImage({
    count: 6,
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      wx.getImageInfo({
        src: tempFilePaths[0],
        success: function (res) {
          console.log(res);
          http_post_img(resp => {
            console.log(resp);
          })
        }
      })
    }
  })
}
export function previewImage() {
  wx.previewImage({
    current: '', // 当前显示图片的http链接
    urls: [] // 需要预览的图片http链接列表
  })
}
export function toast(type, message) {
  if (type == 'succ') {
    wx.showToast({
      title: message,
      icon: 'success',
    })
  }
  if (type == 'load') {
    wx.showToast({
      title: message,
      icon: 'loading',
    })
  }
  if (type == 'warn') {
    wx.showToast({
      title: message,
      icon: 'success',
      image: '../../../images/info.png',
      duration: 3000
    })
  }
}
export function transTime(t, type) {
  var d = new Date(t);
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  var dd = d.getDate();
  var h = d.getHours();
  var mm = d.getMinutes();
  var s = d.getSeconds();
  if (type == 1) {
    return y + '-' + e(m) + '-' + e(dd)
  } else if (type == 2) {
    return e(m) + '-' + e(dd);
  } else if (type == 3) {
    return e(h) + ':' + e(mm);
  } else if (type == 4) {
    return y + '年' + e(m) + '月' + e(dd) + ' ' + e(h) + ':' + e(mm);
  } else if (type == 5) {
    return y + '-' + e(m) + '-' + e(dd);
  } else {
    return y + '-' + e(m) + '-' + e(dd) + ' ' + e(h) + ':' + e(mm) + ':' + e(s);
  }
}

function e(t) {
  return t > 9 ? t : '0' + t;
}