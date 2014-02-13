{series} = require "async"

tests = (require "./#{t}" for t in ["assert", "util", "console", "process", "path", "events"])
series tests, (error) ->
	phantom.exit(error?)

