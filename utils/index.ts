import { nanoid } from 'nanoid'
import type { MessageListItem ,StoreObj} from '~/types';

/**
 * 检查存储空间 和 已使用空间
 * @returns {useage:已使用,maxSpace:最大空间,percent:已使用百分比,isFull:是否已满}
 */
export const checkStore = () => {
  let useage = 0;
  const maxSpace = 4.5 * 1024 * 1024;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const value = localStorage.getItem(key);
      useage += key.length + value!.length; // 计算键和值的总长度
    }
  }
  return {
    useage,// 已使用
    maxSpace,// 最大空间
    percent: +((useage / maxSpace) * 100).toFixed(2), // 已使用百分比
    isFull: useage >= maxSpace, // 是否已满 留0.5M空间
  }
};

/**
 * 获取nanoid
 * @returns nanoid
 */
export const getNanoid = () => nanoid()

/**
 * 存储数据
 * @param key 
 * @param value 
 */

const STORAGE_KEY = 'skunk';
export const setStorage = (currentKey:string,value: MessageListItem[]) => {
  const obj = getStorage()
  obj[currentKey] = value
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
}

/**
 * 获取数据
 * @param key 
 * @returns Array<MessageListItem>
 */
export const getStorage = ():StoreObj => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
}

/**
 * 删除数据
 * @param key
 */
export const removeStorage = (currentKey:string,endIndex: number = 0, all: boolean = false) => {
  const obj = getStorage()
  if (all) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  if (endIndex <= 0) {
    delete obj[currentKey]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
  }else{
    obj[currentKey].splice(0, endIndex)
    setStorage(currentKey,obj[currentKey])
  }
}

export const copyToClipboard = (text: string) => {
  return new Promise((resolve) => {
    // 检查是否支持 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // 使用 Clipboard API
      navigator.clipboard.writeText(text).then(function () {
        ElMessage.success('复制成功');
      }).catch(function (err) {
        ElMessage.error(`复制失败,${err}`);
      }).finally(() => {
        resolve(true)
      })
    } else {
      // 使用旧的 execCommand 方法作为回退
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';  // 防止页面滚动
      document.body.appendChild(textarea);
      textarea.select();
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? '复制成功' : '复制失败';
        ElMessage.success(msg);
      } catch (err) {
        ElMessage.error(`复制失败!,${err}`);
      } finally {
        document.body.removeChild(textarea);
        resolve(true)
      }
    }
  })
}

/**
 * 获取年月日时分秒
 * @param time 
 * @returns 
 */
export const getDateTime = (time: number|string=Date.now()) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return {
    fulltime:`${year}-${month}-${day} ${hour}:${minute}:${second}`,
    datetime:`${year}-${month}-${day}`,
    year,
    month,
    day,
    hour,
    minute,
    second
  }
}

export const getTimeFromNow=(time:string|number)=>{
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) {
      return `${years}年前`; // 1年前
    } else if (months > 0) {
      return `${months}月前`; // 1月前  11月前
    } else if(days<1){
      return `今天`
    }else if(days<2){
      return `昨天`
    }else if (days < 7) {
      return `${days}天前`; // 1天前
    } else if (days >= 7) {
      return `7天前`; // 1天前  11天前
    } else{
      return getDateTime(time).datetime
    }
}

const DIALOGKEY='shunk-dialog-key'
/**
 * 缓存当前对话key
 * @param key 
 */
export const setDialogKey=(value:string=getDateTime().fulltime)=>{
    localStorage.setItem(DIALOGKEY,value)
}

/**
 * 获取当前对话key
 * @returns 
 */
export const getDialogKey=()=>{
    return localStorage.getItem(DIALOGKEY) || getDateTime().fulltime
}
/**
 * 删除当前对话key
 */   
export const removeDialogKey=()=>{
    localStorage.removeItem(DIALOGKEY)
}
