var gulp = require("gulp");

// Your First Task

gulp.task('mohmad' , function(){

	console.log('Hello GulpJs Iam Mohmad Gamal And I Love My World')
});


//////////////////////////////////////////////////////////////////////////////////////////

// Copy Files From Source To Destination

gulp.task('copyfile' , function(){

	return gulp.src('Project/*.*') // 'Project/main.css' 0r 'Project/*.css' or 'Project/*.*' or ['Project/main.css' , 'Project/main.css' , ...]
				.pipe(gulp.dest('dist/copy')) // 'dist' or 'dist/copy' this Will Create Foolder Copy If Not Found

});

//////////////////////////////////////////////////////////////////////////////////////////

// Concatenate CSS And JS Files In One File ==> https://www.npmjs.com/package/concat

var concat = require('gulp-concat');

gulp.task('css' , function(){

	return gulp.src('Project/*.css')
				.pipe(concat('allStyle.css'))
				.pipe(gulp.dest('dist'))

});

gulp.task('js' , function(){

	return gulp.src('Project/js/*.js')
				.pipe(concat('main.js'))
				.pipe(uglify()) // This Will Make Minifing For JS Files 
				.pipe(gulp.dest('dist/js'))
				.pipe(notify('JS Task Is Done'))
				.pipe(livereload());
});

//////////////////////////////////////////////////////////////////////////////////////////

// Auto Prefixer For CSS3 Properties ==> https://www.npmjs.com/package/autoprefixer

var prefix = require('gulp-autoprefixer');

gulp.task('prefix' , function(){

	return gulp.src('Project/*.css')
				.pipe(prefix('last 2 versions'))
				.pipe(concat('allStyle.css'))
				.pipe(gulp.dest('dist'))
});


//////////////////////////////////////////////////////////////////////////////////////////

// Manage And Compile Sass Files  ==>  https://www.npmjs.com/package/gulp-sass

var sass = require('gulp-sass');

gulp.task('sass' , function(){

	return	gulp.src('Project/sass/main.scss')
			    .pipe(sourcemaps.init()) // This For Begin 

				.pipe(sass({outputStyle:'compressed'})) // sass({outputStyle:'compressed'}) This Will Do compressed For File Sass or sass() This Will Not Do compressed For File Sass
				.pipe(prefix('last 2 versions'))
				.pipe(concat('testSass.css'))

			    .pipe(sourcemaps.write('.')) // This After Doing Tasks And Will Adding File Of Map With File CSS
				.pipe(gulp.dest('dist/compiled_Sass'))
				.pipe(notify('Sass Task Is Done'))
				.pipe(livereload());

});


//////////////////////////////////////////////////////////////////////////////////////////

// Compile Pugjs Files With Gulp  ==>  https://www.npmjs.com/package/gulp-pug

var pug = require('gulp-pug');

gulp.task('html' , function(){
	

	return gulp.src('Project/pug/index.pug')
			   .pipe(pug({pretty: true})) // pug({pretty: true}) This Will Do Code Pretty For HTML File  Or pug() This Will Not Do Code Pretty For HTML File
			   .pipe(gulp.dest('dist/AllPugFiles'))
			   .pipe(notify('HTML Task Is Done'))
			   .pipe(livereload());
});


//////////////////////////////////////////////////////////////////////////////////////////

// LocalHost In Gulp  ==>  https://www.npmjs.com/package/gulp-connect


var pug = require('gulp-pug');

gulp.task('html1' , function(){
	// require('./server.js')
	return gulp.src('Project/pug/index.pug')
			   .pipe(pug({pretty: true})) // pug({pretty: true}) This Will Do Code Pretty For HTML File  Or pug() This Will Not Do Code Pretty For HTML File
			   .pipe(gulp.dest('dist/AllPugFiles'))
});




//////////////////////////////////////////////////////////////////////////////////////////

// Watch In Gulp  ==>  https://www.npmjs.com/package/gulp-connect

var watch = require('gulp-watch');

gulp.task('watch' , function(){

	livereload.listen();

	require('./server.js')
	

	// gulp.watch(['Project/**/*.scss' , '!Project/**/_header.scss'] , gulp.parallel('sass')) This Will Take All File Without ==> [ _header.scss ]
	gulp.watch('Project/**/*.scss' , gulp.parallel('sass')) // gulp.parallel('sass') or gulp.series('sass')
	gulp.watch('Project/pug/index.pug' , gulp.parallel('html'))
	gulp.watch('Project/js/*.js' , gulp.series('js'))
	gulp.watch('dist/**/*.*' , gulp.series('compress'))
	// gulp.watch('dist/**/*.*' , gulp.parallel('deploy'))
});



//////////////////////////////////////////////////////////////////////////////////////////

// Live Reload In Gulp  ==>  https://www.npmjs.com/package/gulp-livereload

var livereload = require('gulp-livereload');


//////////////////////////////////////////////////////////////////////////////////////////

// Add Source Maps To Files  ==>  https://www.npmjs.com/package/gulp-sourcemaps

var sourcemaps = require('gulp-sourcemaps');



//////////////////////////////////////////////////////////////////////////////////////////

// Minifing JS Files With Uglify  ==>  https://www.npmjs.com/package/gulp-uglify

var uglify = require('gulp-uglify');


//////////////////////////////////////////////////////////////////////////////////////////

// Show Notification With Notify  ==>  https://www.npmjs.com/package/gulp-notify

var notify = require("gulp-notify");


//////////////////////////////////////////////////////////////////////////////////////////

// Compress Files With Gulp Zip  ==>  https://www.npmjs.com/package/gulp-zip

var zip = require('gulp-zip');

// Compress Files

gulp.task('compress' , function(){
	return gulp.src('dist/**/*.*')
				.pipe(zip('Website.zip'))
				.pipe(gulp.dest('.'))
				.pipe(notify('Files Is Compressed'))
});


//////////////////////////////////////////////////////////////////////////////////////////

// Upload Files With Vinyl Ftp  ==>  https://www.npmjs.com/package/vinyl-ftp [ sudo npm i vinyl-ftp --save-dev ]

var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
 
gulp.task('deploy', function () {
 
    var conn = ftp.create( {
        host:     'mywebsite.tld',
        user:     '',
        password: '',
        parallel: 10
    } );
 
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
 
    return gulp.src( ['dist/**/*.*'], { base: '.', buffer: false } )
        .pipe( conn.newer( '/public_html' ) ) // only upload newer files
        .pipe( conn.dest( '/public_html' ) )
 		.pipe(livereload());
} );



//////////////////////////////////////////////////////////////////////////////////////////

// Default Task 

gulp.task('default' , gulp.series('watch'));



//////////////////////////////////////////////////////////////////////////////////////////

// Important Plugin

/*

1-  https://www.npmjs.com/package/gulp-babel

2-  https://www.npmjs.com/package/gulp-replace

3-  https://www.npmjs.com/package/gulp-load-plugins

4-  https://www.npmjs.com/package/gulp-rename

////////////////////////////////////////////////////////////////////////////////////

Install Specific Gulp Version

mkdir Test Folder

cd test 

sudo npm i gulp@3.9.1 

gulp -v

==> gulp 3.9.1

*/