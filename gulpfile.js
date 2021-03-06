var gulp = require("gulp");
var path = require("path");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var changed = require("gulp-changed");
var autoprefixer = require("autoprefixer");
var clear = require("gulp-clean");
var del = require("del");
var ts = require("gulp-typescript");
var tsCloud = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var tsCloudProject = tsCloud.createProject("tsconfig.json");
var sourcemaps = require("gulp-sourcemaps");
var projectConfig = require("./package.json");

//项目路径
var option = {
  base: "miniprogram",
  allowEmpty: true
};
var miniprogramDist = __dirname + "/dist/miniprogram";
var cloudfunctionsDist = __dirname + "/dist/cloudfunctions";
var copyPath = ["miniprogram/**/!(_)*.*", "!miniprogram/**/*.less", "!miniprogram/**/*.ts", './project.config.json'];
var copyJsonPath = ['cloudfunctions/**/*.json'];
var lessPath = ["miniprogram/**/*.less", "miniprogram/app.less"];
var watchLessPath = ["miniprogram/**/*.less", "miniprogram/app.less"];
var tsMiniprogramPath = ["miniprogram/**/*.ts", "miniprogram/app.ts"];
var tsCloudfunctionsPath = ["cloudfunctions/**/*.ts", "!cloudfunctions/**/node_modules/**/*.*"];

//项目路径
var cloudfunctionsOption = {
  base: "cloudfunctions",
  allowEmpty: true
};

//清空目录
gulp.task("clear", () => {
  return gulp.src(miniprogramDist, { allowEmpty: true }).pipe(clear());
});

//复制不包含less和图片的文件
gulp.task("copy", () => {
  return gulp.src(copyPath, option).pipe(gulp.dest(miniprogramDist));
});

gulp.task("copyJson", () => {
  return gulp.src(copyJsonPath, cloudfunctionsOption).pipe(gulp.dest(cloudfunctionsDist));
});
//复制不包含less和图片的文件(只改动有变动的文件）
gulp.task("copyChange", () => {
  return gulp
    .src(copyPath, option)
    .pipe(changed(miniprogramDist))
    .pipe(gulp.dest(miniprogramDist));
});

// 增加dependencies
var dependencies = projectConfig && projectConfig.dependencies; // dependencies配置
var nodeModulesCopyPath = ["cloudfunctions/login/node_modules"];
for (let d in dependencies) {
  nodeModulesCopyPath.push("node_modules/" + d + "/**/*");
}


//复制依赖的node_modules文件
gulp.task("copyNodeModules", () => {
  return gulp
    .src(nodeModulesCopyPath, cloudfunctionsOption)
    .pipe(gulp.dest(cloudfunctionsDist));
});
//复制依赖的node_modules文件(只改动有变动的文件）
gulp.task("copyNodeModulesChange", () => {
  return gulp
    .src(nodeModulesCopyPath, cloudfunctionsOption)
    .pipe(changed(cloudfunctionsDist))
    .pipe(gulp.dest(cloudfunctionsDist));
});

//编译less
gulp.task("less", () => {
  return gulp
    .src(lessPath, option)
    .pipe(
      less().on("error", function(e) {
        console.error(e.message);
        this.emit("end");
      })
    )
    .pipe(postcss([autoprefixer]))
    .pipe(
      rename(function(path) {
        path.extname = ".wxss";
      })
    )
    .pipe(gulp.dest(miniprogramDist));
});
//编译less(只改动有变动的文件）
gulp.task("lessChange", () => {
  return gulp
    .src(lessPath, option)
    .pipe(changed(miniprogramDist))
    .pipe(
      less().on("error", function(e) {
        console.error(e.message);
        this.emit("end");
      })
    )
    .pipe(postcss([autoprefixer]))
    .pipe(
      rename(function(path) {
        path.extname = ".wxss";
      })
    )
    .pipe(gulp.dest(miniprogramDist));
});

// 编译
gulp.task("tsMinprogramCompile", function() {
  return gulp
    .src(tsMiniprogramPath, option)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest(miniprogramDist));
});

gulp.task("tsCloudfunctionsCompile", function() {
  return gulp
    .src(tsCloudfunctionsPath, cloudfunctionsOption)
    .pipe(sourcemaps.init())
    .pipe(tsCloudProject())
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest(cloudfunctionsDist));
});

//监听
gulp.task("watch", () => {
  gulp.watch(tsMiniprogramPath, gulp.series("tsMinprogramCompile"));
  gulp.watch(tsCloudfunctionsPath, gulp.series("tsCloudfunctionsCompile"));
  var watcher = gulp.watch(copyPath, gulp.series("copyChange"));
  gulp.watch(nodeModulesCopyPath, gulp.series("copyNodeModulesChange"));
  gulp.watch(watchLessPath, gulp.series("less")); //Change
  gulp.watch(copyJsonPath, gulp.series("copyJson")); //Change
  watcher.on("change", function(event) {
    if (event.type === "deleted") {
      var filepath = event.path;
      var filePathFromSrc = path.relative(path.resolve("src"), filepath);
      // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
      var destFilePath = path.resolve("dist", filePathFromSrc);
      // console.log({filepath, filePathFromSrc, destFilePath})
      del.sync(destFilePath);
    }
  });
});

//开发并监听
gulp.task(
  "default",
  gulp.series(
    // sync
    gulp.parallel(
      "copy",
      "copyJson",
      "copyNodeModules",
      "less",
      "tsMinprogramCompile",
      "tsCloudfunctionsCompile"
    ),
    "watch"
  )
);

//上线
gulp.task(
  "build",
  gulp.series(
    // sync
    "clear",
    gulp.parallel(
      // async
      "copy",
      "copyNodeModules",
      "less",
      "tsMinprogramCompile",
      "tsCloudfunctionsCompile"
    )
  )
);
