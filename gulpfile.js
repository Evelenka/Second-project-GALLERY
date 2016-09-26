var gulp = require("gulp"); 
var concat = require("gulp-concat");
var browserSync = require("browser-sync");
var sass = require("gulp-ruby-sass");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");

var Files = {
    html : "./index.html",
    css_dest : "./css", 
    scss : "./scss/style.scss"
    
};

gulp.task("css", function(){
    
    return gulp.src(Files.css)
            .pipe(concat("main.css"))
            .pipe(gulp.dest(Files.css_dest))
            .pipe(browserSync.reload({stream: true}));
});

gulp.task("sass", function(){
    
    return sass(Files.scss, {
        style: "expanded",
        sourcemap: true
    })
        .on("error", sass.logError)
        .pipe(sourcemaps.write())
        .pipe(rename("main.css"))
        .pipe(gulp.dest(Files.css_dest))
        .pipe(browserSync.reload({stream: true}));
});

//gulp.task("js", function(){
//    
//    return gulp.src(Files.js)
//            .pipe(concat("main.js"))
//            .pipe(gulp.dest(Files.js_dest))
//            .pipe(browserSync.reload({stream: true}));
//});

gulp.task("default", ["sass"], function(){

        browserSync.init ({
            server: {
                baseDir: "./"
            }
        }); 
        
        gulp.watch("./scss/**/*.scss", ["sass"]);
        //gulp.watch("./js/**/*.js", ["js"]);
        gulp.watch(Files.html, browserSync.reload);
    
});
