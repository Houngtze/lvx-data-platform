import moment from "moment"

export const formatDate = (date, form = "YYYY-MM-DD") => {
  return moment(date).format(form)
}
export const beforeFormatDate = (date, form = "YYYY-MM-DD") => {
  return moment(new Date()).add(-1, 'days').format(form)
}
export const getLinkParam = (name, link = "") => { 
  let arr = (window.location.search || link).replace(/^\?/,'').split("&");
  let params = {};
  for(let i=0; i<arr.length; i++){
      let data = arr[i].split("=");
      if(data.length == 2){
          params[data[0]] = data[1];
      }
  }
  return name ? params[name] : params;
}

export default {
  formatDate,
  getLinkParam
}