export class Common {

    constructor() {
        this.accessToken = "zoeO5HDMpNWxzPH029BPdLVyu73He1dv"
        this.activityId = "460"
    }

  /**
   * [getIdByUrl 获取跟踪数据]
   * 通过url编译码 获取跟踪数据 （params_id, activity_id ..）
   * @param  {[string]} url [编译码]
   * @param  {[string]} key [标记]
   * @return {[object]}     [description]
   */
    getTraceData(url, key) {
        if(!url) return
        key = key || 'trace_data='
        let orgUrl = decodeURIComponent(url)
        console.log(orgUrl)
        let traceData = orgUrl.substring(orgUrl.indexOf(key)+key.length)
        console.log(traceData)
        traceData = JSON.parse(traceData)
        return traceData
    }
}

export let common = new Common()