import Mock from 'mockjs';

const tree = Mock.mock({
  'array|20': [
    {
      'id|+1': 1,
      label: '@city()',
      'hasChild|1-2': true,
      'levelOne': true,
      'checked|1-2': true,
      'children|15': [ {
        'id|+1': 100,
        label: '@county(true)',
        'hasChild|1-2': true,
        'checked|1-2': false,
        'children|5': [ {
          'id|+1': 200,
          label: '@protocol()',
          'checked|1-2': true,
          'hasChild|1-2': true,
          'disabled|1': true,
        } ]
      } ]
    }
  ]
});
export {
  tree
};
