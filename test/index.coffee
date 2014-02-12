{series} = require "async"

tests = (require "./#{t}" for t in ["assert", "process", "path", "events", "util"])
series tests, (error) ->
	phantom.exit(error?)

