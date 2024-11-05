const gole = require('gulp');

// require('gulp-sass') = Integra o SASS com o GULP
// require('sass') = É o pacote que vai compilar o SASS
const scss = require('gulp-sass')(require('sass')); // Compila o Sass

// mostra o local do código onde se está trabalhando sem o 
// sourcemaps o navegador vai mostrar o main.css em do main.scss
const localizaCod = require('gulp-sourcemaps');

//Alinha os código em uma linha depois da outra
const sinteCod = require('gulp-uglify');


const imgMin = require('gulp-imagemin'); 


function compilaSass()
{
    return gole.src('./source/styles/main.scss')
    .pipe(localizaCod.init())
    .pipe(scss({outputStyle: 'compressed'})) //faz referencia a variavel 
    .pipe(localizaCod.write('./maps'))
    .pipe(gole.dest('./build/styles/'));
}

function comprimeJs()
{
    return gole.src('./source/scripts/*.js')
    .pipe(sinteCod())
    .pipe(gole.dest('./build/scripts'));
}

function comprimeImg()
{
    return gole.src('./source/images/*')
    .pipe(imgMin())
    .pipe(gole.dest('./build/images'))
}


exports.default = function()
{
    gole.watch('./source/styles/*.scss',{ignoreInitial:false},gole.series(compilaSass));
    gole.watch('./source/scripts/*.js',{ignoreInitial:false},gole.series(comprimeJs));
    gole.watch('./source/images/*',{ignoreInitial:false},gole.series(comprimeImg));
}
// exports.scss = compilaSass;
// exports.javascript=comprimeJs; 
// exports.images = comprimeImg;