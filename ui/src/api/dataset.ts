import { Result } from '@/request/Result'
import { get, post, del, put, exportExcel, exportFile } from '@/request/index'
import type { datasetData } from '@/api/type/dataset'
import type { pageRequest } from '@/api/type/common'
import type { ApplicationFormType } from '@/api/type/application'
import { type Ref } from 'vue'

const prefix = '/dataset'

/**
 * 获取分页知识库
 * @param 参数
 * page {
 "current_page": "string",
 "page_size": "string",
 }
 * param {
 "name": "string",
 }
 */
const getDataset: (
  page: pageRequest,
  param: any,
  loading?: Ref<boolean>
) => Promise<Result<any>> = (page, param, loading) => {
  return get(`${prefix}/${page.current_page}/${page.page_size}`, param, loading)
}

/**
 * 获取全部知识库
 * @param 参数
 */
const getAllDataset: (loading?: Ref<boolean>) => Promise<Result<any[]>> = (loading) => {
  return get(`${prefix}`, undefined, loading)
}

/**
 * 删除知识库
 * @param 参数 dataset_id
 */
const delDataset: (dataset_id: String, loading?: Ref<boolean>) => Promise<Result<boolean>> = (
  dataset_id,
  loading
) => {
  return del(`${prefix}/${dataset_id}`, undefined, {}, loading)
}

/**
 * 创建知识库
 * @param 参数
 * {
 "name": "string",
 "desc": "string",
 "documents": [
 {
 "name": "string",
 "paragraphs": [
 {
 "content": "string",
 "title": "string",
 "problem_list": [
 {
 "id": "string",
 "content": "string"
 }
 ]
 }
 ]
 }
 ]
 }
 */
const postDataset: (data: datasetData, loading?: Ref<boolean>) => Promise<Result<any>> = (
  data,
  loading
) => {
  return post(`${prefix}`, data, undefined, loading, 1000 * 60 * 5)
}

/**
 * 创建Web知识库
 * @param 参数
 * {
 "name": "string",
 "desc": "string",
 "source_url": "string",
 "selector": "string",
 }
 */
const postWebDataset: (data: any, loading?: Ref<boolean>) => Promise<Result<any>> = (
  data,
  loading
) => {
  return post(`${prefix}/web`, data, undefined, loading)
}
/**
 * 创建Lark知识库
 * @param 参数
 * {
 "name": "string",
 "desc": "string",
 "app_id": "string",
 "app_secret": "string",
 "folder_token": "string",
 }
 */
const postLarkDataset: (data: any, loading?: Ref<boolean>) => Promise<Result<any>> = (
  data,
  loading
) => {
  return post(`${prefix}/lark/save`, data, undefined, loading)
}

/**
 * 创建QA知识库
 * @param 参数 formData
 * {
 "file": "file",
 "name": "string",
 "desc": "string",
 }
 */
const postQADataset: (data: any, loading?: Ref<boolean>) => Promise<Result<any>> = (
  data,
  loading
) => {
  return post(`${prefix}/qa`, data, undefined, loading)
}

/**
 * 知识库详情
 * @param 参数 dataset_id
 */
const getDatasetDetail: (dataset_id: string, loading?: Ref<boolean>) => Promise<Result<any>> = (
  dataset_id,
  loading
) => {
  return get(`${prefix}/${dataset_id}`, undefined, loading)
}

/**
 * 修改知识库信息
 * @param 参数
 * dataset_id
 * {
 "name": "string",
 "desc": true
 }
 */
const putDataset: (
  dataset_id: string,
  data: any,
  loading?: Ref<boolean>
) => Promise<Result<any>> = (dataset_id, data, loading) => {
  return put(`${prefix}/${dataset_id}`, data, undefined, loading)
}
const putLarkDataset: (
  dataset_id: string,
  data: any,
  loading?: Ref<boolean>
) => Promise<Result<any>> = (dataset_id, data, loading) => {
  return put(`${prefix}/lark/${dataset_id}`, data, undefined, loading)
}
/**
 * 获取知识库 可关联的应用列表
 * @param dataset_id
 * @param loading
 * @returns
 */
const listUsableApplication: (
  dataset_id: string,
  loading?: Ref<boolean>
) => Promise<Result<Array<ApplicationFormType>>> = (dataset_id, loading) => {
  return get(`${prefix}/${dataset_id}/application`, {}, loading)
}

/**
 * 命中测试列表
 * @param dataset_id
 * @param loading
 * @query  { query_text: string, top_number: number, similarity: number }
 * @returns
 */
const getDatasetHitTest: (
  dataset_id: string,
  data: any,
  loading?: Ref<boolean>
) => Promise<Result<Array<any>>> = (dataset_id, data, loading) => {
  return get(`${prefix}/${dataset_id}/hit_test`, data, loading)
}

/**
 * 同步知识库
 * @param 参数 dataset_id
 * @query 参数 sync_type // 同步类型->replace:替换同步,complete:完整同步
 */
const putSyncWebDataset: (
  dataset_id: string,
  sync_type: string,
  loading?: Ref<boolean>
) => Promise<Result<any>> = (dataset_id, sync_type, loading) => {
  return put(`${prefix}/${dataset_id}/sync_web`, undefined, { sync_type }, loading)
}

/**
 * 向量化知识库
 * @param 参数 dataset_id
 */
const putReEmbeddingDataset: (
  dataset_id: string,
  loading?: Ref<boolean>
) => Promise<Result<any>> = (dataset_id, loading) => {
  return put(`${prefix}/${dataset_id}/re_embedding`, undefined, undefined, loading)
}

/**
 * 导出知识库
 * @param dataset_name 知识库名称
 * @param dataset_id   知识库id
 * @returns
 */
const exportDataset: (
  dataset_name: string,
  dataset_id: string,
  loading?: Ref<boolean>
) => Promise<any> = (dataset_name, dataset_id, loading) => {
  return exportExcel(dataset_name + '.xlsx', `dataset/${dataset_id}/export`, undefined, loading)
}
/**
 *导出Zip知识库
 * @param dataset_name 知识库名称
 * @param dataset_id   知识库id
 * @param loading      加载器
 * @returns
 */
const exportZipDataset: (
  dataset_name: string,
  dataset_id: string,
  loading?: Ref<boolean>
) => Promise<any> = (dataset_name, dataset_id, loading) => {
  return exportFile(dataset_name + '.zip', `dataset/${dataset_id}/export_zip`, undefined, loading)
}

/**
 * 获取当前用户可使用的模型列表
 * @param application_id
 * @param loading
 * @query  { query_text: string, top_number: number, similarity: number }
 * @returns
 */
const getDatasetModel: (
  dataset_id: string,
  loading?: Ref<boolean>
) => Promise<Result<Array<any>>> = (dataset_id, loading) => {
  return get(`${prefix}/${dataset_id}/model`, loading)
}
/**
 * 获取飞书文档列表
 * @param dataset_id
 * @param folder_token
 * @param loading
 * @returns
 */
const getLarkDocumentList: (
  dataset_id: string,
  folder_token: string,
  data: any,
  loading?: Ref<boolean>
) => Promise<Result<Array<any>>> = (dataset_id, folder_token, data, loading) => {
  return post(`${prefix}/lark/${dataset_id}/${folder_token}/doc_list`, data, null, loading)
}

const importLarkDocument: (
  dataset_id: string,
  data: any,
  loading?: Ref<boolean>
) => Promise<Result<Array<any>>> = (dataset_id, data, loading) => {
  return post(`${prefix}/lark/${dataset_id}/import`, data, null, loading)
}
/**
 * 生成关联问题
 * @param dataset_id 知识库id
 * @param data
 * @param loading
 * @returns
 */
const generateRelated: (
  dataset_id: string,
  data: any,
  loading?: Ref<boolean>
) => Promise<Result<Array<any>>> = (dataset_id, data, loading) => {
  return put(`${prefix}/${dataset_id}/generate_related`, data, null, loading)
}

export default {
  getDataset,
  getAllDataset,
  delDataset,
  postDataset,
  getDatasetDetail,
  putDataset,
  listUsableApplication,
  getDatasetHitTest,
  postWebDataset,
  putSyncWebDataset,
  putReEmbeddingDataset,
  postQADataset,
  exportDataset,
  getDatasetModel,
  exportZipDataset,
  postLarkDataset,
  getLarkDocumentList,
  importLarkDocument,
  putLarkDataset,
  generateRelated
}
