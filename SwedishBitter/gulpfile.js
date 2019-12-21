const gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  rename = require("gulp-rename"),
  imagemin = require("gulp-imagemin"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  pngquant = require("imagemin-pngquant"),
  browserSync = require("browser-sync").create(),
  rimraf = require("rimraf"),
  reload = browserSync.reload;

const path = {
  build: {
    //Тут мы укажем куда складывать готовые после сборки файлы
    html: "./build/",
    js: "./build/js/",
    css: "./build/css/",
    img: "./build/img/",
    svg: "./build/img/",
    fonts: "./build/fonts/"
  },
  src: {
    //Пути откуда брать исходники
    html: "./src/*.html", //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    js: "./src/js/main.js", //В стилях и скриптах нам понадобятся только main файлы
    style: "./src/scss/style.scss",
    img: "./src/img/**/*.*", //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    svg: "./src/img/**/*.svg",
    fonts: "./src/fonts/**/*.*"
  },
  watch: {
    //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: "./src/**/*.html",
    jsLibs: "./src/js/libs.min.js",
    js: "./src/js/**/*.js",
    styleLibs: "./src/scss/_libs.scss",
    style: "./src/scss/**/*.scss",
    image: "./src/img/**/*.*",
    fonts: "./src/fonts/**/*.*"
  },
  clean: "./build"
};

const config = {
  server: {
    baseDir: "./build/"
  },
  port: 3000
};

//html
gulp.task("html:build", function(done) {
  gulp
    .src(path.src.html) //Выберем файлы по нужному пути
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
  done();
});

//Скрипты
gulp.task("jsLibs:build", function(done) {
  gulp
    .src([
      "./node_modules/jquery/dist/jquery.min.js",
      "./src/js/libs/jquery-ui.min.js",
      "./src/js/libs/jquery.datepicker.extension.range.min.js",
      "./src/js/libs/datepicker-ru.js"
    ]) //Найдем наши файлы
    .pipe(concat("libs.min.js")) //Объеденим их в 1 файл
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({ stream: true })); //И перезагрузим сервер
  done();
});
gulp.task("js:build", function(done) {
  gulp
    .src(path.src.js) //Найдем наш main файл
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({ stream: true })); //И перезагрузим сервер
  done();
});

//Стили
gulp.task("style:build", function(done) {
  gulp
    .src(path.src.style) //Выберем наш index.scss
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    .pipe(
      sass({
        errorLogToConsole: true,
        outputStyle: "compressed"
      })
    ) //Скомпилируем
    .on("error", console.error.bind(console))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 versions"],
        cascade: false
      })
    ) //Добавим вендорные префиксы
    .pipe(rename({ basename: "style", suffix: ".min" })) //переименуем
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(path.build.css)) //И в build
    .pipe(reload({ stream: true }));

  done();
});
gulp.task("styleLibs:build", function(done) {
  gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "./src/css/libs/jquery-ui.structure.min.css"
    ])
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("./src/scss/"))
    .pipe(reload({ stream: true }));
  done();
});

//Картинки
gulp.task("image:build", function(done) {
  gulp
    .src([path.src.img, "!./src/img/icons/svg/*.*"]) //Выберем наши картинки
    .pipe(
      imagemin({
        //Сожмем их
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
        interlaced: true
      })
    )
    .pipe(gulp.dest(path.build.img)); //И бросим в build

  gulp
    .src("./src/img/icons/svg/*.*")
    .pipe(gulp.dest(path.build.svg)) //И бросим в build
    .pipe(reload({ stream: true }));

  done();
});

//Шрифты
gulp.task("fonts:build", function(done) {
  gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));

  done();
});

//Запуск сервера и отслеживание изменений
gulp.task("dev", function() {
  browserSync.init(config);
  gulp.watch(path.watch.html, gulp.series("html:build"));
  gulp.watch(path.watch.styleLibs, gulp.series("styleLibs:build"));
  gulp.watch(path.watch.style, gulp.series("style:build"));
  gulp.watch(path.watch.jsLibs, gulp.series("jsLibs:build"));
  gulp.watch(path.watch.js, gulp.series("js:build"));
  gulp.watch(path.watch.image, gulp.series("image:build"));
  gulp.watch(path.watch.fonts, gulp.series("fonts:build"));
});

gulp.task("clean:build", function(cb) {
  rimraf(path.clean, cb);
});

gulp.task(
  "default",
  gulp.series(
    "clean:build",
    gulp.parallel(
      "html:build",
      // "styleLibs:build",
      "style:build",
      // "jsLibs:build",
      "js:build",
      "image:build",
      "fonts:build"
    )
  )
);
