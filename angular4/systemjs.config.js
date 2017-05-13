System.config({
    paths: {
        'npm:': 'node_modules/'
    },
    map: {
        'service': 'service/',
        'directive': 'directive/',  
        'demo': 'src/directive/',
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        'rxjs': 'npm:rxjs',
    },
    packages: {
        service :{
            defaultExtension: 'js'
        },
        directive :{
            defaultExtension: 'js'
        },
        demo: {
            defaultExtension: 'js',
        },
        rxjs: {
            defaultExtension: 'js'
        }
    }
});

