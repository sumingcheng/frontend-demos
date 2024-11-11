const HomeURL = "https://jsonplaceholder.typicode.com";

// HTTP 请求 
function createXHR() {
  var XHR = [ //兼容不同浏览器和版本得创建函数数组
    function () {
      return new XMLHttpRequest()
    },
    function () {
      return new ActiveXObject("Msxml2.XMLHTTP")
    },
    function () {
      return new ActiveXObject("Msxml3.XMLHTTP")
    },
    function () {
      return new ActiveXObject("Microsoft.XMLHTTP")
    }
  ];
  var xhr = null;
  //尝试调用函数，如果成功则返回XMLHttpRequest对象，否则继续尝试
  for (var i = 0; i < XHR.length; i++) {
    try {
      xhr = XHR[i]();
    } catch (e) {
      continue //如果发生异常，则继续下一个函数调用
    }
    break; //如果成功，则中止循环
  }
  return xhr; //返回对象实例
}

function getTest() {
  var url = HomeURL + "/posts"; // Base URL + 接口地址
  var xhr = createXHR();
  xhr.open("GET", url, false);
  xhr.send(null);
  var time = JSON.parse(xhr.responseText);
  console.log(time);
  return time;
  // if (time.code === 200) {
  //   return time.data.dateTime;
  // }
}

// index的Vue实例
const index = new Vue({
  el: '#index',
  data: {
    title: 'Vue + element UI + XMLHttp',
    tableData: [{}]
  },
  mounted() {
    this.transitData();
  },
  methods: {
    transitData() {
      // 使用接口返回的数据
      this.tableData = getTest();
    }
  },
})

