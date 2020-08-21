var gulp = require('gulp')
var replace = require('gulp-replace')
var concat = require('gulp-concat');
var rename = require("gulp-rename");


var files = ['in/SVG-emojis/001-grinning.svg',
'in/SVG-emojis/002-smiling.svg',
'in/SVG-emojis/003-tongue.svg',
'in/SVG-emojis/004-unamused.svg',
'in/SVG-emojis/005-nerd.svg',
'in/SVG-emojis/006-drooling.svg',
'in/SVG-emojis/007-kiss.svg',
'in/SVG-emojis/008-mouthless.svg',
'in/SVG-emojis/009-joy.svg',
'in/SVG-emojis/010-halo.svg',
'in/SVG-emojis/011-winking.svg',
'in/SVG-emojis/012-smirking.svg',
'in/SVG-emojis/013-sleeping.svg',
'in/SVG-emojis/014-woozy.svg',
'in/SVG-emojis/015-astonished.svg',
'in/SVG-emojis/016-upside down.svg',
'in/SVG-emojis/017-horns.svg',
'in/SVG-emojis/018-vomiting.svg',
'in/SVG-emojis/019-grinning.svg',
'in/SVG-emojis/020-winking.svg',
'in/SVG-emojis/021-kissing.svg',
'in/SVG-emojis/022-rolling.svg',
'in/SVG-emojis/023-no expression.svg',
'in/SVG-emojis/024-flushed.svg',
'in/SVG-emojis/025-emojis.svg',
'in/SVG-emojis/026-angry.svg',
'in/SVG-emojis/027-grimacing.svg',
'in/SVG-emojis/028-sleepy.svg',
'in/SVG-emojis/029-squit.svg',
'in/SVG-emojis/030-hearts.svg',
'in/SVG-emojis/031-worry.svg',
'in/SVG-emojis/032-in love.svg',
'in/SVG-emojis/033-moustache.svg',
'in/SVG-emojis/034-crying.svg',
'in/SVG-emojis/035-sad.svg',
'in/SVG-emojis/036-pirate.svg',
'in/SVG-emojis/037-sad.svg',
'in/SVG-emojis/038-cowardly.svg',
'in/SVG-emojis/039-monocle.svg',
'in/SVG-emojis/040-smile.svg',
'in/SVG-emojis/041-angry.svg',
'in/SVG-emojis/042-muted.svg',
'in/SVG-emojis/043-pensive.svg',
'in/SVG-emojis/044-displeased.svg',
'in/SVG-emojis/045-party.svg',
'in/SVG-emojis/046-neutral.svg',
'in/SVG-emojis/047-stars.svg',
'in/SVG-emojis/048-nausea.svg',
'in/SVG-emojis/049-dead.svg',
'in/SVG-emojis/050-tired.svg',]

gulp.task('filelist', function () {
	gulp.src("in/files.txt")
	  .pipe(replace(/(.*?).svg/g,function(match) {
	  	 let arr = match.split('/');
	  	 return "'"+arr[4]+"/"+arr[5]+"/"+arr[6]+"'," 
	  }))
	  .pipe(rename(function (path) {
      let arr = path.basename.split('-');
      path.basename = "arraylist";
      path.extname = ".txt";
    }))
	  .pipe(gulp.dest('in/component/'));
	gulp.src("in/files.txt")
	  .pipe(replace(/(.*?).svg/g,function(match) {
	  	 let arr = match.split('/');
	  	 let fn = arr[6].split('-');
	  	 let ext = fn[1].split('.');
	  	 return arr[4]+"/"+arr[5]+'/Icon-'+ext[0]+'.vue'; 
	  }))
	  .pipe(rename(function (path) {
      let arr = path.basename.split('-');
      path.basename = "componentList";
      path.extname = ".txt";
    }))
	  .pipe(gulp.dest('in/component/'));
})

gulp.task('repsvgvue', function () {
  gulp.src(files)
    .pipe(replace(/<!--(.*?)-->/, ''))
    .pipe(replace(/<?xml(.*?)?>/, ''))
    .pipe(replace(/<!DOCTYPE(.*?)>/, ''))
    .pipe(replace(/version=(.*?) id=(.*?) xmlns=(.*?) xmlns:xlink=(.*?) x=(.*?) y=(.*?)/, ''))
    .pipe(replace(/<!DOCTYPE(.*?)>/, ''))
    .pipe(replace('xml:space="preserve"', ''))
    .pipe(replace('"0px"', ''))
    .pipe(replace('enable-background', 'data-background'))
    .pipe(replace(/viewBox=(.*?)/, function (m) {
      let arr =  m.split("=");
      return 'data-'+arr[0]+'='+arr[1];    
    }))
    .pipe(replace('svg', 'template'))
    .pipe(rename(function (path) {
      let arr = path.basename.split('-');
      path.dirname += "/result/vue";
      path.basename = "Icon-"+arr[1];
      path.extname = ".vue";
    }))
    .pipe(gulp.dest('out/'))
})
gulp.task("rensvgvue", function () {
  let out=[];
  for(let i=0; i<files.length; i++) {
    let arr = files[i].split('in/');
    let res = 'out/'+arr[1];
    out.push(res);   
  }
  gulp.src(out)
    .pipe(rename(function (path) {
    path.dirname += "/result/vue";
    path.basename = "Icon"+path.basename;
    path.extname = ".vue";
  }))
  .pipe(gulp.dest("./out"))
})
gulp.task('componentlist', function () {
  gulp.src('in/component/componentList.txt')
    .pipe(replace(/(.*?).vue/g, function (match) {
      console.log("enter")
      console.log(match)
      const arr = match.split('/')
      const fname = arr[2].split('.')
      const res = 'import ' + fname[0] + " from 'vue/"+ arr[2] + "'"
      return res
    }))
    .pipe(rename(function (path) {
      path.basename = "component-import";
      path.extname = ".txt";
    }))
    .pipe(gulp.dest('out/component/'))
  gulp.src('in/component/componentList.txt')
    .pipe(replace(/(.*?).vue/g, function (match) {
      console.log(match)
      const arr = match.split('/')
      const fname = arr[2].split('.')
      const res =  fname[0] + ','
      return res
    }))
    .pipe(rename(function (path) {
      path.basename = "component-list";
      path.extname = ".txt";
    }))
    .pipe(gulp.dest('out/component/'))
  gulp.src('in/component/componentList.txt')
    .pipe(replace(/(.*?).vue/g, function (match) {
      console.log(match)
      const arr = match.split('/')
      const fname = arr[2].split('.')
      const res = '<icon-base class="icons__image" icon-name="' + fname[0] + '" width="64" height="64" icon-color="#5434ad"><' + fname[0] + '/></icon-base>"'
      return res
    }))
    .pipe(rename(function (path) {
      path.basename = "component-template";
      path.extname = ".txt";
    }))
    .pipe(gulp.dest('out/component/'))
})
gulp.task("componentconcat", function(){
  gulp.src(['in/component/starthtml.txt',
            'out/component/component-template.txt',
            'in/component/endhtml.txt',
            'in/component/startjs.txt',
            'out/component/component-import.txt',
            'in/component/compstart.txt',
            'out/component/component-list.txt',
            'in/component/compend.txt',
            'in/component/endjs.txt'
          ])
    .pipe(concat('IconList.vue'))
    .pipe(gulp.dest('out/result/'));
})
