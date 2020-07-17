/* --------------------------------------------------------------------------------------------
 * SonarLint for VisualStudio Code
 * Copyright (C) 2017-2020 SonarSource SA
 * sonarlint@sonarsource.com
 * Licensed under the LGPLv3 License. See LICENSE.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
const gulp = require('gulp');
const del = require('del');
const vsce = require('vsce');

gulp.task('clean', () => del('dist', 'hello-world.vsix'));

gulp.task('createVSIX', () => vsce.createVSIX({packagePath: 'hello-world.vsix'}));

gulp.task('package', gulp.series('clean', 'createVSIX'));
