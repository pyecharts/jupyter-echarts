var gulp = require('gulp');

// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory
require('require-dir')('build/tasks');

const TASKS = [
  "kaizhouqu",
  "chongming",
  "taiwan",
  "diaoyudao",
  "echarts-maps",
  "cities",
  "countries",
  "configuration",
  "preview",
  "main"
];

gulp.task("default", TASKS);
