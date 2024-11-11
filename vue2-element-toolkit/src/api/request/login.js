import service from '@/api/axios';

// 测试接口
export function test() {
  return service({
    method: 'GET',
    url: '/front/common/oauth/test',
  });
}

// 支付宝
// 支付宝授权
// 001-账号绑定校验
export function accountBindingVerification(bindType, id) {
  return service({
    method: 'GET',
    url: `/front/common/alipay/oauth/bindValid/${ bindType }/${ id }`,
  });
}

// 002-账号绑定获取验证码
export function accountBindingToObtainVerificationCode(data) {
  return service({
    method: 'POST',
    url: `/front/common/alipay/oauth/bindRandom`,
    data
  });
}

// 002-账号绑定
export function accountBinding(data) {
  return service({
    method: 'POST',
    url: `/front/common/alipay/oauth/bind`,
    data
  });
}

// 031.支付宝公众号个人增量指标业务
// 001-个人增量指标申请信息查询
export function incrementalIndicatorInformationQuery(idMd5) {
  return service({
    method: 'GET',
    url: `/front/alipay/person/increment/apply/info/${ idMd5 }`,
  });
}

// 005-个人增量指标延期申请
export function incrementalIndicatorExtensionApplication(idMd5) {
  return service({
    method: 'GET',
    url: `/front/alipay/person/increment/apply/delay/${ idMd5 }`,
  });
}

// 007-个人增量指标信息查询
export function individualIncrementalIndicatorInformationQuery(idMd5) {
  return service({
    method: 'GET',
    url: `/front/alipay/person/increment/norm/info/${ idMd5 }`,
  });
}

// 007-个人增量指标延期申请（未绑定）
export function incrementalIndicatorExtensionApplicationNo(idMd5) {
  return service({
    method: 'GET',
    url: `/front/alipay/person/increment/apply/delay/noSubscribe/${ idMd5 }`,
  });
}

// 032.支付宝公众号个人更新指标业务
// 001-个人更新指标申请信息查询（分页）
export function updateIndicatorApplicationInformationPage(idMd5, data) {
  return service({
    method: 'POST',
    url: `/front/alipay/person/replace/apply/info/${ idMd5 }`,
    data
  });
}

// 002-个人更新指标信息查询（分页）
export function individualUpdateIndicatorInformationQuery(idMd5, data) {
  return service({
    method: 'POST',
    url: `/front/alipay/person/replace/norm/info/${ idMd5 }`,
    data
  });
}

// 033.支付宝公众号个人其他指标业务
// 001-个人其他指标申请信息查询（分页）
export function queryOfOtherIndicatorApplicationInformation(idMd5, data) {
  return service({
    method: 'POST',
    url: `/front/alipay/person/other/apply/info/${ idMd5 }`,
    data
  });
}

// 002-个人其他指标信息查询（分页）
export function otherIndicatorInformationQuery(idMd5, data) {
  return service({
    method: 'POST',
    url: `/front/alipay/person/other/norm/info/${ idMd5 }`,
    data
  });
}
