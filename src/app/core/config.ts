// 这里可以配置各种全局配置信息，通过注入的方式来获取
export const ApiConfig = {

  csApi: {

  },

  servcie: {

  },

  retail: {

  },

  store: {

  },

  baiduMap: {
    // 地址逆解析API地址
    baiduGeocoder: 'http://api.map.baidu.com/geocoder/v2/',
    ak: 'R6l3LOp0hMYGpxw0nZGHXWymNP9Y6kIH',
    location: 'http://api.map.baidu.com/location/ip',
    // 使用GPS经纬度坐标
    coordtype: 'wgs84ll'
  },

  wan: {

  }
}

export const ConstConfig = {
  RepairBaseInfoKey: 'repairBaseInfo',
  DeliveryRepairKey: 'deliveryRepair',
  OrderRepairKey: 'orderRepair',
  HomeRepairKey: 'homeRepair',

  repairType: {
    repair: 1,  // 维修
    replaceNew: 2, // 维修
    returnBack: 3 // 退机
  },

  applyCode: {
    delivery: 1, // 寄送快修
    order: 2,    // 预约维修
    home: 3      // 上门快修
  },

  // 固定配置信息
  serviceType: [{
    id: 1,
    label: '维修',
    isSelected: false
  }, {
    id: 2,
    label: '换新',
    isSelected: false
  }],

  // 故障类型
  faultList: [{
    id: 1,
    label: '死机',
    isSelected: false
  }, {
    id: 2,
    label: '无法上网',
    isSelected: false,
  }, {
    id: 3,
    label: '通话异常',
    isSelected: false
  }, {
    id: 4,
    label: '屏幕故障',
    isSelected: false
  }, {
    id: 5,
    label: '信号问题',
    isSelected: false
  }, {
    id: 6,
    label: '进水',
    isSelected: false
  }, {
    id: 7,
    label: '自动关机',
    isSelected: false
  }],
}
