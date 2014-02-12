module.exports = (done) ->
	assert = require "../modules/assert"
	path = require "../modules/path"
	fs = require "fs"
	cwd = fs.absolute ""
	assert.equal "#{cwd}/some/relative/path", path.resolve "some/relative/path"
	
	done()



