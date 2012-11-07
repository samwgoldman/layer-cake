sourceMap = require("source-map")

exports.generate = function(file, root, deps) {
  var gen = new sourceMap.SourceMapGenerator({ file: file })
  var _root = new sourceMap.SourceMapConsumer(root)
  var _deps = {}

  for (var dep in deps) {
    _deps[dep] = new sourceMap.SourceMapConsumer(deps[dep])
  }

  _root._generatedMappings.forEach(function(mapping) {
    if (mapping.source) {
      var dep = _deps[mapping.source]
      var info = dep.originalPositionFor({
        line: mapping.originalLine,
        column: mapping.originalColumn
      })

      gen.addMapping({
        generated: { line: mapping.generatedLine, column: mapping.generatedColumn },
        original: { line: info.line, column: info.column },
        source: info.source,
        name: info.name
      })
    }
  })

  return gen.toString()
}
