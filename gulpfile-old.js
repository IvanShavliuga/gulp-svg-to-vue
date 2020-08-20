var gulp = require('gulp')
var replace = require('gulp-replace')
var concat = require('gulp-concat');

var files = ['in/SVG-social/500px.svg',
  'in/SVG-social/aim.svg',
  'in/SVG-social/amazon.svg',
  'in/SVG-social/android.svg',
  'in/SVG-social/apple.svg',
  'in/SVG-social/app-store.svg',
  'in/SVG-social/behance.svg',
  'in/SVG-social/bitbucket.svg',
  'in/SVG-social/blogger.svg',
  'in/SVG-social/bootstrap.svg',
  'in/SVG-social/chrome.svg',
  'in/SVG-social/codepen.svg',
  'in/SVG-social/css3.svg',
  'in/SVG-social/delicious.svg',
  'in/SVG-social/deviantart-1.svg',
  'in/SVG-social/deviantart-2.svg',
  'in/SVG-social/digg.svg',
  'in/SVG-social/dribbble.svg',
  'in/SVG-social/dropbox.svg',
  'in/SVG-social/drupal.svg',
  'in/SVG-social/ebay.svg',
  'in/SVG-social/etsy.svg',
  'in/SVG-social/evernote.svg',
  'in/SVG-social/facebook.svg',
  'in/SVG-social/firefox.svg',
  'in/SVG-social/flattr.svg',
  'in/SVG-social/flickr.svg',
  'in/SVG-social/forrst.svg',
  'in/SVG-social/foursquare.svg',
  'in/SVG-social/git.svg',
  'in/SVG-social/github.svg',
  'in/SVG-social/google-drive.svg',
  'in/SVG-social/google-plus.svg',
  'in/SVG-social/grooveshark.svg',
  'in/SVG-social/habbo.svg',
  'in/SVG-social/hacker-news.svg',
  'in/SVG-social/html5.svg',
  'in/SVG-social/ie.svg',
  'in/SVG-social/instagram.svg',
  'in/SVG-social/joomla.svg',
  'in/SVG-social/jsfiddle.svg',
  'in/SVG-social/lanyrd.svg',
  'in/SVG-social/lastfm.svg',
  'in/SVG-social/like.svg',
  'in/SVG-social/linkedin.svg',
  'in/SVG-social/linux.svg',
  'in/SVG-social/love.svg',
  'in/SVG-social/magento.svg',
  'in/SVG-social/myspace.svg',
  'in/SVG-social/odnolassniki.svg',
  'in/SVG-social/openid.svg',
  'in/SVG-social/opera.svg',
  'in/SVG-social/paypal-1.svg',
  'in/SVG-social/paypal-2.svg',
  'in/SVG-social/picasa.svg',
  'in/SVG-social/pied-piper.svg',
  'in/SVG-social/pinterest.svg',
  'in/SVG-social/pixeden.svg',
  'in/SVG-social/qq.svg',
  'in/SVG-social/qzone.svg',
  'in/SVG-social/rdio.svg',
  'in/SVG-social/reddit.svg',
  'in/SVG-social/renren.svg',
  'in/SVG-social/rss.svg',
  'in/SVG-social/safari-1.svg',
  'in/SVG-social/safari-2.svg',
  'in/SVG-social/sass.svg',
  'in/SVG-social/share.svg',
  'in/SVG-social/skype.svg',
  'in/SVG-social/slideshare.svg',
  'in/SVG-social/soundcloud.svg',
  'in/SVG-social/spotify.svg',
  'in/SVG-social/stack-exchange.svg',
  'in/SVG-social/stack-overflow.svg',
  'in/SVG-social/steam.svg',
  'in/SVG-social/stumbleupon.svg',
  'in/SVG-social/tencent-weibo.svg',
  'in/SVG-social/trello.svg',
  'in/SVG-social/tripadvisor.svg',
  'in/SVG-social/tumblr.svg',
  'in/SVG-social/twitch.svg',
  'in/SVG-social/twitter.svg',
  'in/SVG-social/ubuntu.svg',
  'in/SVG-social/viadeo.svg',
  'in/SVG-social/vimeo.svg',
  'in/SVG-social/vine.svg',
  'in/SVG-social/vk.svg',
  'in/SVG-social/wechat.svg',
  'in/SVG-social/weibo.svg',
  'in/SVG-social/wikipedia.svg',
  'in/SVG-social/windows.svg',
  'in/SVG-social/wordpress-1.svg',
  'in/SVG-social/wordpress-2.svg',
  'in/SVG-social/xing.svg',
  'in/SVG-social/yahoo-1.svg',
  'in/SVG-social/yahoo-2.svg',
  'in/SVG-social/yelp.svg',
  'in/SVG-social/youtube-1.svg',
  'in/SVG-social/youtube-2.svg',
  'in/SVG-social/zerply.svg']

gulp.task('hello', function () {
  console.log('hello')
})
gulp.task('repsvgvue', function () {
  gulp.src(files)
    .pipe(replace(/<!--(.*?)-->/, '<!--success replace-->'))
    .pipe(replace(/<?xml(.*?)?>/, '<!--vue component-->'))
    .pipe(replace(/<!DOCTYPE(.*?)>/, '<!--icons-->'))
    .pipe(replace(/version=(.*?) id=(.*?) xmlns=(.*?) xmlns:xlink=(.*?) x=(.*?) y=(.*?)/, ''))
    .pipe(replace(/<!DOCTYPE(.*?)>/, '<!--icons-->'))
    .pipe(replace('xml:space="preserve"', ''))
    .pipe(replace('"0px"', ''))
    .pipe(replace('viewBox="0 0 64 64" enable-background="new 0 0 64 64"', ''))
    .pipe(replace('svg', 'template'))
    .pipe(gulp.dest('out/SVG-social/'))
})
gulp.task('componentlist', function () {
  gulp.src('in/component/SocialIconsList.txt')
    .pipe(replace(/(.*?).vue/g, function (match) {
      console.log("enter")
      console.log(match)
      const arr = match.split('/')
      const fname = arr[1].split('.')
      const res = 'import Social' + fname[0] + " from '" + arr[1] + "'"
      return res
    }))
    .pipe(gulp.dest('out/component/'))
  gulp.src('in/component/IconName.txt')
    .pipe(replace(/(.*?).vue/g, function (match) {
      console.log(match)
      const arr = match.split('/')
      const fname = arr[1].split('.')
      const res = 'Social' + fname[0]
      return res
    }))
    .pipe(gulp.dest('out/component/'))
  gulp.src('in/component/IconName.txt')
    .pipe(replace(/(.*?).vue/g, function (match) {
      console.log(match)
      const arr = match.split('/')
      const fname = arr[1].split('.')
      const res = '<icon-base class="icons__image" icon-name="' + fname[0] + '" width="64" height="64" icon-color="#5434ad"><social' + fname[0] + '/></icon-base>"'
      return res
    }))
    .pipe(gulp.dest('out/component/comp/'))
})
gulp.task("componentconcat", function(){
  gulp.src(['in/component/starthtml.txt',
            'out/component/comp/IconName.txt',
            'in/component/endhtml.txt',
            'in/component/startjs.txt',
            'out/component/SocialIconsList.txt',
            'in/component/compstart.txt',
            'out/component/IconName.txt',
            'in/component/compend.txt',
            'in/component/endjs.txt'
          ])
    .pipe(concat('IconList.vue'))
    .pipe(gulp.dest('out/result/'));
})
gulp.task("svgtovue",function() {
  gulp.task("repsvgvue")
  gulp.task("componentlist")
  gulp.task("componentconcat")
});
