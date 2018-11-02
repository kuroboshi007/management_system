# 管理后台Web前端


## Usage

``` bash
# install dependencies
$ yarn # or npm install

# serve with hot reload at localhost:3000
$ yarn dev # or npm run dev

# build for production and launch server
$ yarn build # or npm run dev
$ yarn start # or npm run dev

# generate static project
$ yarn generate # or npm run generate
```

## 登陆账号
1. 管理员 【un：smalldata pw：123456】 
2. 客户 【un：CON001 pw：123456】   [app.html id:09]
3. 代理商 【un：ORG001 pw：123456】 [app.html id:03]

> app.html 切换对应角色，在default.vue中查看角色对应需求


## 通用方法

> import { ... } from '~/utils/common.js'

*  任务id获取采集任务详情,平台、团队、甲方管理员公用接口

```js
getTaskInfoById(id)
```

*  任务状态模拟枚举方式见对应备注

```js
// e.g：
PackageStatus.IS_START // 1
PackageStatus.properties[PackageStatus.IS_START].txt // 已开始
```

## 打包注意事项


1. 注释 app.html下的userInfo，打开nuxt.config.js中对应项 
2. app.html中的resetUserInfoFormat不要直接return val，即
```js
function resetUserInfoFormat (val) {
  var Obj = {}
  var deletBrace = val.slice(1, -1)
  var items = deletBrace.split(',')
  for (var i = 0; i < items.length; i++) {
    Obj[items[i].split('=')[0].trim()] = items[i].split('=')[1]
  }
  return Obj
  // return val
}
```


## Other

* eslint标准使用的是：vue/strongly-recommended，[规则见此](https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-preventio)

* eslint其他一些个性化规则在eslintrc.js中查看备注

* 配置了webpack中resolve.alias的路径引用，可在utils文件夹中配置（非必须）

* 简单的封装了axios的用法，详情见 /service/index.js & /utils/common.js

* 这里有一个坑：在使用iview中的clo标签时会报错，已经修改eslint语言检查，若使用vscode时候还需要在首选项----》设置---》"vetur.validation.template": false

* 后续发现问题会及时更新项目构建

* 甲方&团队在搜索复数的状态值时，用statuss代替status，并用 , 隔开
```js
// e.g statuss: '1,2,3'
```
