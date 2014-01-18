module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-exec");

    var packageJson = grunt.file.readJSON("package.json");

    grunt.initConfig({
        global:
        {
            minify: 'optimize=none'
        },
        pkg: packageJson,
        ts: {
            options: {
                target: 'es5',
                module: 'amd',
                sourcemap: true,
                declarations: false,
                nolib: false,
                removeComments: true
            },
            dev: {
                src: ['./src/**/*.ts']
            },
            examples: {
                src: ['./src/**/*.ts', './examples/**/*.ts']
            },
            examplesdist: {
                options: {
                    sourcemap: false
                },
                src: ['./src/**/*.ts', './examples/**/*.ts']
            }
        },

        exec: {
            // concatenate and compress with r.js
            tests: {
                cmd: 'node ./tools/r.js -o baseUrl=examples/tests/ mainConfigFile=examples/tests/tests.js name=tests <%= global.minify %> out=examples/tests/build/tests.js'
            },
            natureofcode: {
                cmd: 'node ./tools/r.js -o baseUrl=examples/natureofcode/ mainConfigFile=examples/natureofcode/natureofcode.js name=natureofcode <%= global.minify %> out=examples/natureofcode/build/natureofcode.js'
            }
        }

    });

    // build processing-ts core
    grunt.registerTask("default", [
        "ts:dev"
    ]);

    // build all examples with sourcemaps
    grunt.registerTask('examples', '', function() {
        grunt.task.run(
            'ts:examples'
        );
    });

    // builds examples/tests/tests.ts and references into a single file.
    grunt.registerTask('tests', '', function() {

        // grunt examples-build --minify
        var minify = grunt.option('minify');
        if (minify) grunt.config.set('global.minify', '');

        grunt.task.run(
            'ts:examplesdist',
            'exec:tests'
        );
    });

    // builds examples/natureofcode/natureofcode.ts and references into a single file.
    grunt.registerTask('natureofcode', '', function() {

        // grunt examples-build --minify
        var minify = grunt.option('minify');
        if (minify) grunt.config.set('global.minify', '');

        grunt.task.run(
            'ts:examplesdist',
            'exec:natureofcode'
        );
    });
};