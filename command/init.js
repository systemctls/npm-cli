'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
 	co(function *() {
  	let tplName = yield prompt('需要构建模版名称: ')
  	let projectName = yield prompt('生成的项目名称: ')
  	let gitUrl
  	let branch

		if (!config.tpl[tplName]) {
    	console.log(chalk.red('\n × 模版不存在!'))
    	process.exit()
    }
		gitUrl = config.tpl[tplName].url
		branch = config.tpl[tplName].branch

    let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`

	  console.log(chalk.white('\n 正在构建...'))

	  exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.white('\n √ 初始化完成,请运行下面命令!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
	  })
  })
}