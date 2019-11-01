# testcafe-reporter-uistatusreporter
[![Build Status](https://travis-ci.org/ognif/testcafe-reporter-uistatusreporter.svg)](https://travis-ci.org/ognif/testcafe-reporter-uistatusreporter)

This is the **uistatusreporter** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/ognif/testcafe-reporter-uistatusreporter/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-uistatusreporter
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter uistatusreporter
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('uistatusreporter') // <-
    .run();
```

## Author
Ingo (http://ifoerster.com)
