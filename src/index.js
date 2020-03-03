'use strict';
const mongoose = require('mongoose');
const Logs = require(__basedir + '/models/log');
///Users/ingofoerster/Downloads/development/clipcafe2

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  return {
    report: {
      startTime: null,
      endTime: null,
      userAgents: null,
      passed: 0,
      total: 0,
      skipped: 0,
      fixtures: [],
      warnings: [],
      totalcount: 0
    },
    reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
      var _this = this;

      this.report.startTime = startTime;
      this.report.total = testCount;
      this.setIndent(1).useWordWrap(true).write(this.chalk.bold('Running tests in:')).newline();
      userAgents.forEach(function (ua) {
        var stringMessage = 'tcafestatus:' + ua;

        var newLog = new Logs({
          message: stringMessage,
          type: 'error',
          location: 'bc'
        });

        newLog.save();

        //_this.write(stringMessage);
      });
    },
    reportFixtureStart: function reportFixtureStart(name) {
      this.currentFixtureName = name;
      var stringMessage = 'tcafestatus:Starte Testrun ' + name;
      var newLog = new Logs({
        message: stringMessage,
        type: 'error',
        location: 'bc'
      });

      newLog.save();
      //this.write(stringMessage);
    },
    reportTestStart: function reportTestStart(name) {
      var stringMessage = 'tcafestatus:Test ' + name + ' gestartet';
      var newLog = new Logs({
        message: stringMessage,
        type: 'error',
        location: 'bc'
      });

      newLog.save();
      //this.write(stringMessage);
    },
    reportTestDone: function reportTestDone(name, testRunInfo) {
      const errors = testRunInfo.errs;
      const warnings = testRunInfo.warnings;
      const hasErrors = !!errors.length;
      const hasWarnings = !!warnings.length;
      var stringMessage = 'tcafestatus:Test ' + name + ' abgeschlossen ';

      var newLog = new Logs({
        message: stringMessage,
        type: 'error',
        location: 'bc'
      });

      newLog.save();
      //this.write(stringMessage);
      var durationStr = this.moment.duration(testRunInfo.durationMs).format('h[h] mm[m] ss[s]');
      stringMessage = 'tcafestatus: - - Benötigte Zeit ' + durationStr;
      newLog = new Logs({
        message: stringMessage,
        type: 'error',
        location: 'bc'
      });

      newLog.save();
      //this.write(stringMessage);

      if (hasErrors) {
        stringMessage = 'tcafestatus: - - Test got ' + errors.length + ' errors ';
        newLog = new Logs({
          message: stringMessage,
          type: 'error',
          location: 'bc'
        });

        newLog.save();
        //this.write(stringMessage);
      }

      if (hasWarnings) {
        stringMessage = 'tcafestatus: - - Test got ' + warnings.lengt + ' errors ';
        newLog = new Logs({
          message: stringMessage,
          type: 'error',
          location: 'bc'
        });

        newLog.save();
        //this.write(stringMessage);
      }

      this.report.totalcount++;
      stringMessage = 'tcafegprogress:' + this.report.totalcount + ':' + this.report.total;
      newLog = new Logs({
        message: stringMessage,
        type: 'error',
        location: 'bc'
      });

      newLog.save();
      //this.write(stringMessage);
    },
    reportTaskDone: function reportTaskDone(endTime, passed, warnings, result) {
      this.report.passed = passed;
      this.report.endTime = endTime;
      this.report.warnings = warnings;
      const durationMs = endTime - this.report.startTime;
      var durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');
      var stringMessage = 'tcafestatus:Testrun abgeschlossen';
      var newLog = new Logs({
        message: stringMessage,
        type: 'error',
        location: 'bc'
      });

      newLog.save();
      //this.write(stringMessage);
      stringMessage = 'tcafestatus: - - ' + passed + ' Tests abgeschlossen';
      newLog = new Logs({
        message: stringMessage,
        type: 'error',
        location: 'bc'
      });

      newLog.save();
      //this.write(stringMessage);
      stringMessage = 'tcafestatus: - - ' + result.failedCount + ' Fehler insgesamt';
       newLog = new Logs({
         message: stringMessage,
         type: 'error',
         location: 'bc'
      });

      newLog.save();
      //this.write(stringMessage);
      stringMessage = 'tcafestatus: - -  Zeit gesamt ' + durationStr;
       newLog = new Logs({
         message: stringMessage,
         type: 'error',
         location: 'bc'
      });

      newLog.save();
      //this.write(stringMessage);
    }
  };
};

module.exports = exports['default'];