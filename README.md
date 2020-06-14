# wstress

[![Version](https://img.shields.io/npm/v/wstress.svg)](https://npmjs.org/package/wstress)
[![Build Status](https://img.shields.io/travis/pikamachu/pika-web-stress-test/master.svg)](https://travis-ci.org/pikamachu/pika-web-stress-test)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7a5d465f487e4f55a8e50e8201cc69b1)](https://www.codacy.com/project/antonio.marin.jimenez/pika-web-stress-test/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pikamachu/pika-web-stress-test&amp;utm_campaign=Badge_Grade_Dashboard)
[![codecov](https://codecov.io/gh/pikamachu/pika-web-stress-test/branch/master/graph/badge.svg)](https://codecov.io/gh/pikamachu/pika-web-stress-test)

<a href='https://ko-fi.com/Q5Q21TCUG' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Introduction

Web stress script for web testing with snapshot comparison.

## Installing / Getting started 

To install the package execute:
```
npm install -g wstress
```

After installation, tou will have access to the wstress binary in your command line.
You can check help with this command:
```
wstress --help
```

## Developing 
 
### Built With
* [Oclif](https://github.com/oclif/oclif)

### Prerequisites
The following software must be installed
* [Node >= v8](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads) - optional

### Folder structure
* root: Contains the README.md, the main configuration to execute the project such as package.json or any other configuration files.
* bin: Contains the application run script.
* src: Contains the source code for application script.
* node_modules: Contains third party JS libraries used in this project

### Setting up Dev

Download the code
```
git clone https://github.com/pikamachu/pika-web-stress-test.git
cd pika-web-stress-test
```

Install dependencies
```
npm install
```

Run application help for usage.
```
npm start --help
```

Run application tests.
```
npm test
```

### Pika commands

All previous command can be executed using pika script

```shell
Usage: pika [command]

where [command] is one of:
   run - execute application. Use --help argument to see command help.
   test - execute application tests.
   format - auto format project code using prettier.
   publish - do login and publish package.
```
