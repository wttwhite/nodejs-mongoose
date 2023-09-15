import VueRouter from 'vue-router'
import typesPage from '@/views/types-page'
import timePage from '@/views/time-page'
const routes = [
  {
    path: '/',
    redirect: '/commonTable',
  },
  {
    path: '/typesPage',
    name: 'typesPage',
    meta: {
      name: '类型',
      menu: true,
    },
    component: typesPage,
  },
  {
    path: '/timePage',
    name: 'timePage',
    meta: {
      name: '时间记录',
      menu: true,
    },
    component: timePage,
  },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch((err) => err)
}

VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch((err) => err)
}

export default routes
