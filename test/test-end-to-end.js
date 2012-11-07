layerCake = require("../lib/layer-cake")
fs = require("fs")
sourceMap = require("source-map")
expect = require("chai").expect

describe("Layer Cake", function() {
  it("works", function() {
    var root = fs.readFileSync("test/fixtures/foobar.js.map", "ascii")
    var deps = {
      "foo.js": fs.readFileSync("test/fixtures/foo.js.map", "ascii"),
      "bar.js": fs.readFileSync("test/fixtures/bar.js.map", "ascii")
    }
    var result = layerCake.generate("out.js.map", root, deps)
    var cake = new sourceMap.SourceMapConsumer(result)

    expect(cake.originalPositionFor({ line: 1, column: 77 })).to.eql(
      { source: 'foo.coffee', line: 3, column: 6, name: null } 
    )

    expect(cake.originalPositionFor({ line: 1, column: 185 })).to.eql(
      { source: 'bar.coffee', line: 3, column: 6, name: null } 
    )
  })
})
