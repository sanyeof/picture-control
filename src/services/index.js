import BaseService from './base-service'

const upload = (request) => { return BaseService.post('images/upload', request) } // 上传
const download = (name, request) => { return BaseService.post('images/download-dispose/' + name, request) } // 下载裁剪好的图片


export default {
  upload,
  download
}
