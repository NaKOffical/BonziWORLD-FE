var gulp = require('gulp');

// Run this to compress all the things!
gulp.task('production', ['css', 'fonts', 'ko', 'ng', 'winjs', 'js', 'react', 'landing', 'images']);
