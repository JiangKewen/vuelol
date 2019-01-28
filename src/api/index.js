import axios from 'axios'

// axios初始化配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = process.env.BASE_API

// post请求
export const _post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, json2Form(params))
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// get请求
export const _get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

// 参数封装
function json2Form (json) {
  var str = []
  for (var p in json) {
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
  }
  return str.join('&')
}

export const getAllHeroes = params => _get('/lol/heroic/showAllHeroic', params) // 获取所有英雄数据

export const putHero = params => _post('/lol/heroic/insertHeroic', params) // 录入英雄资料

export const updateHero = params => _post('/lol/heroic/updateHeroic', params) // 更新英雄资料

export const delHero = params => _post('/lol/heroic/deleteHeroicById', params) // 删除英雄
