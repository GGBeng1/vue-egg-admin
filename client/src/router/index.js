import Vue from "vue";
import Router from "vue-router";
import Login from "@/view/Login/index";
import NoPage from "@/view/404/404";
import store from "../store/index";
import { Message } from "element-ui";

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      name: "NoPage",
      component: NoPage
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "home",
      beforeEnter: (to, from, next) => {
        let token =
          store.state.userMsg.token ||
          JSON.parse(window.localStorage.getItem("token"))
            ? JSON.parse(window.localStorage.getItem("token"))
            : "";
        if (token) {
          next();
        } else {
          next("/");
          Message({
            message: "请登录后访问",
            type: "warning",
            showClose: true
          });
        }
      },
      component: () =>
        import(/* webpackChunkName: "home" */ "@/view/homePage/index"),
      children: [
        {
          path: "table",
          name: "表格",
          meta: {
            icon: "el-icon-s-order"
          },
          component: () =>
            import(
              /* webpackChunkName: "table" */
              "@/view/homePage/components/main"
            ),
          children: [
            {
              path: "tableExport",
              name: "导出",
              component: () =>
                import(
                  /* webpackChunkName: "tableExport" */
                  "@/view/table/tableExport"
                )
            },
            {
              path: "tableUpload",
              name: "上传",
              component: () =>
                import(
                  /* webpackChunkName: "tableUpload" */
                  "@/view/table/tableUpload"
                )
            }
          ]
        },
        {
          path: "chart",
          name: "图表",
          meta: {
            icon: "el-icon-s-data"
          },
          component: () =>
            import(
              /* webpackChunkName: "chart" */
              "@/view/homePage/components/main"
            ),
          children: [
            {
              path: "lineChart",
              name: "线性图表",
              component: () =>
                import(
                  /* webpackChunkName: "lineChart" */
                  "@/view/chart/lineChart"
                )
            },
            {
              path: "areaChart",
              name: "面积图表",
              component: () =>
                import(
                  /* webpackChunkName: "areaChart" */
                  "@/view/chart/areaChart"
                )
            }
          ]
        }
      ]
    }
  ]
});
