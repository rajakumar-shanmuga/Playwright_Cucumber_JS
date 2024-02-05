const {transports,format} = require('winston');

function options(scenarioName){
    return {
        transports:[

            new transports.File({
                filename: `test-results/log/${scenarioName}/log.log`,
                level: 'info',
                format: format.combine(
                    format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                    format.align(),
                    format.printf(info=>`${info.level}: ${info.timestamp}: ${info.message}`)

                )

            }),
        ]
    }
};

module.exports = {options};