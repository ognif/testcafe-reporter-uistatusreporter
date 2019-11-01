'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function () {
    return {

        report: {
            startTime:  null,
            endTime:    null,
            userAgents: null,
            passed:     0,
            total:      0,
            skipped:    0,
            fixtures:   [],
            warnings:   [],
            totalcount: 0
        },

        reportTaskStart: function reportTaskStart (startTime, userAgents, testCount) {
            var _this = this;

            this.report.startTime = startTime;
            this.report.total = testCount;

            this.setIndent(1).useWordWrap(true).write(this.chalk.bold('Running tests in:')).newline();

            userAgents.forEach(function (ua) {
                var stringMessage = 'tcafestatus:' + ua;

                _this.write(stringMessage);
            });
        },

        reportFixtureStart: function reportFixtureStart (name) {
            this.currentFixtureName = name;
            var stringMessage = 'tcafestatus:Starte Testrun ' + name;

            this.write(stringMessage);
        },

        reportTestStart: function reportTestStart (name) {
            var stringMessage = 'tcafestatus:Test ' + name + ' gestartet';

            this.write(stringMessage);
        },

        reportTestDone: function reportTestDone (name, testRunInfo) {
            const errors      = testRunInfo.errs;
            const warnings    = testRunInfo.warnings;
            const hasErrors   = !!errors.length;
            const hasWarnings = !!warnings.length;

            var stringMessage = 'tcafestatus:Test ' + name + ' abgeschlossen ';

            this.write(stringMessage);

            var durationStr = this.moment.duration(testRunInfo.durationMs).format('h[h] mm[m] ss[s]');

            stringMessage = 'tcafestatus: - - Benötigte Zeit ' + durationStr;
            this.write(stringMessage);

            if (hasErrors) {
                stringMessage = 'tcafestatus: - - Test got ' + errors.length + ' errors ';
                this.write(stringMessage);
            }
            if (hasWarnings) {
                stringMessage = 'tcafestatus: - - Test got ' + warnings.lengt + ' errors ';
                this.write(stringMessage);
            }

            this.report.totalcount++;
            stringMessage = 'tcafegprogress:' + this.report.totalcount + ':' + this.report.total;
            this.write(stringMessage);
        },


        reportTaskDone: function reportTaskDone (endTime, passed, warnings, result) {
            this.report.passed = passed;
            this.report.endTime = endTime;
            this.report.warnings = warnings;

            const durationMs  = endTime - this.report.startTime;
            var durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');

            var stringMessage = 'tcafestatus:Testrun abgeschlossen';

            this.write(stringMessage);
            stringMessage = 'tcafestatus: - - ' + passed + ' Tests abgeschlossen';
            this.write(stringMessage);
            stringMessage = 'tcafestatus: - - ' + result.failedCount + ' Fehler insgesamt';
            this.write(stringMessage);
            stringMessage = 'tcafestatus: - -  Zeit gesamt ' + durationStr;
            this.write(stringMessage);
        }
    };
};

module.exports = exports['default'];
