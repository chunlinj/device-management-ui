// iconPosition 打包时，需要在路径前加上实际部署项目名，如/cfgTool
// backendUrl configuration tool后端服务器地址, 需要在路径后加上, 如/daac
// publishServer 发布服务端地址, 需要在路径后加上, 如/daac
// openIFS 默认按钮开关
export var config;
// 自执行函数，true本地执行，false Tomcat中执行
(function(local){
  if (local) // 本地执行代码
		config = {
      iconPosition : "/cfgTool/assets/images/",
      backendUrl : "http://localhost:8080",
      publishServer: "http://localhost:8080",
      openIFS : false
    }
    else{ // tomcat执行代码
      config = {
        iconPosition : "/cfgTool/assets/images/",
        backendUrl : "http://localhost:8080/daac",
        publishServer: "http://localhost:8080/daac",
        openIFS : false
      }
    }
})(true);
