module.exports = {

    default: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/test/features/"
        ],
        publishQuite: true,
        dryRun: false,
        require: [
            "src/test/steps/",
            "src/hooks/hooks.js"
        ],
        format: [
            "progress-bar",
            "html:cucumber-report.html",
            "rerun:@rerun.txt"
        ],
        parallel: Number(process.env.npm_config_PARALLEL) || 0,
        retry: Number(process.env.npm_config_RETRY) || 0,
    },
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        publishQuite: true,
        dryRun: false,
        require: [
            "src/test/steps/",
            "src/hooks/hooks.js"
        ],
        format: [
            "progress-bar",
            "html:cucumber-report.html",
            "rerun:@rerun.txt"
        ]

    }
}