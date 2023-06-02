/**
 * @copyright 2023 supratims
 * 
 * Gulpfile for managing static resources
 */
var gulp = require('gulp');
var clean = require('gulp-clean');
var preprocess = require('gulp-preprocess');
/* terser to minify js in prod */
var terser = require('gulp-terser');
/* Source dir for static source files */
var web_source = './src/';
/* Dest dir for all compiled and minified source files */
var web_dest = './dest/';
var build_env, i = process.argv.indexOf("--build_env");
if (i>-1) {
    // could be prod or dev
    build_env = process.argv[i+1];
}



/* Clean js files */
gulp.task('clean-js', function(){
	return gulp.src([web_dest+'js/*.*'])
		.pipe(clean({force: true}));
});


/* Process scripts without minifying */
gulp.task('scripts', function(){
   var jsDir = web_source+"js/";
   var files = [jsDir+"**/*", '!'+jsDir+'imports/', '!'+jsDir+'imports/**'];
   var stream = gulp.src(files, {base: jsDir})
     .pipe(preprocess());

   if (build_env=='prod'){
     stream = stream.pipe(terser().on('error', console.log));
   }

   return stream.pipe(gulp.dest(web_dest+'js/'))
     .on('error', function(err){
        console.log(err);
         this.emit('end');
     });
});

/* Minify scripts, for production */
gulp.task('scripts-min', function(){
     var jsDir = web_source+"js/";
     var files = [jsDir+"**/*", '!'+jsDir+'imports/', '!'+jsDir+'imports/**'];
     return gulp.src(files, {base: web_source+"js/"})
         .pipe(terser().on('error', console.log))
         .pipe(gulp.dest(web_dest+'js/'))
         .on('error', function(err){
            console.log(err.message);
        });
});




/* Clean generated css and js files */
gulp.task('clean', gulp.parallel('clean-js'));

/* Default task */
gulp.task('default', gulp.series('clean',  'scripts'));
