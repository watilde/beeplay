require('espower-loader')({

    cwd: process.cwd(),
    pattern: 'spec/*.js',

    espowerOptions: {
        destructive: false,
        powerAssertVariableName: 'assert',
        lineSeparator: '\n',
        targetMethods: {
            oneArg: [
                'ok'
            ],
            twoArgs: [
                'equal',
                'notEqual',
                'strictEqual',
                'notStrictEqual',
                'deepEqual',
                'notDeepEqual'
            ]
        }
    }
});
