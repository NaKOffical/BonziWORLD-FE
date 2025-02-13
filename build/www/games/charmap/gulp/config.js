var dest = "./build";
var src = './src';
var reactify = require('reactify');

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  sass: {
    src: src + "/sass/*.{sass,scss}",
    dest: dest,
    settings: {
      // Required if you want to use SASS syntax
      // See https://github.com/dlmanning/gulp-sass/issues/81
      sourceComments: 'map',
      imagePath: '/images' // Used by the image-url helper
    }
  },
  css: {
    src: "./css/**",
    dest: dest + "/css"
  },
  fonts: {
    src: "./fonts/**",
    dest: dest + "/fonts"
  },
  markup: {
    src: src + "/htdocs/**",
    dest: dest
  },
  react: {
    src: "./react/*.html",
    dest: dest + "/react"
  },
  ko: {
    src: "./ko/**",
    dest: dest + "/ko"
  },
  ng: {
    src: "./ng/**",
    dest: dest + "/ng"
  },
  winjs: {
    src: "./winjs/*",
    dest: dest + "/winjs",
  },
  js: {
    src: "./js/**/*.js",
    dest: dest + "/js",
  },
  images: {
    src: "./images/**",
    dest: dest + "/images"
  },
  landing: {
    src: "./index.html",
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: './react/reactApp.js',
      transform: [reactify],
      dest: dest + '/react',
      outputName: 'reactApp.js'
      // list of modules to make require-able externally
      //require: ['jquery', 'underscore']
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
