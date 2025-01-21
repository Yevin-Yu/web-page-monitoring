import request from "@/utils/request";
interface keyCodeName {
  id?: number;
  name?: string;
  is_active?: boolean;
}

interface HisInter {
  code: string;
  page_index?: number;
  page_size?: number;
  visitor_id?: string;
}

// 新增
export function applyKeyCode(data: keyCodeName) {
  return request({
    url: "/keycode/create",
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}

// 获取keyCode
export function getKeyCode() {
  return request({
    url: "/keycode/list",
    headers: {
      isToken: true,
    },
    method: "get",
  });
}

// 修改keyCode
export function editKeyCode(data: keyCodeName) {
  return request({
    url: "/keycode/update",
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}

// 删除keyCode
export function deleteKeyCode(data: keyCodeName) {
  return request({
    url: "/keycode/delete",
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}

// 获取浏览列表
export function getHistory(data: HisInter) {
  return request({
    url: "/page-view/list",
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}

// 删除浏览记录
export function deleteHistory(data: HisInter) {
  return request({
    url: "/page-view/delete",
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}