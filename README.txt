layer-cake
Have your cake and eat it, too!

layer-cake is a tool for creating source maps from other source maps. You might
want this if your JavaScript pipeline involves multiple source transformations.

For example, if you use CoffeeScriptRedux to compile CoffeeScript into
JavaScript, which then goes through a minifier like Closure Compiler, you can
use this tool to combine both layers of source maps into a single map.

Consider the following pipeline:

+--------------+   +--------------+
| CoffeeScript |   | CoffeeScript |
+------+-------+   +------+-------+
       |                  |
       v                  v
 +------------+     +------------+    +------------+     +------------+
 | JavaScript |     | JavaScript |    | Source Map |     | Source Map |
 +-----+------+     +-----+------+    +-----+------+     +-----+------+
       |                  |                 |                  |
       |  +------------+  |                 |  +------------+  |
       +->| JavaScript |<-+                 +->| Source Map |<-+
          +------------+                       +------------+

Each CoffeScript to JavaScript phase creates a Source Map. The JavaScript
concatenation phase also creates a source map.

The source map created by the JavaScript concatenation points to locations in
the JavaScript from the phase before. We would much rather see locations from
the original CoffeeScript!

Using layer-cake, you can create a single source map that slices through
multiple layers of source maps, so you can see the original source locations
even after multiple transformations have been applied.
