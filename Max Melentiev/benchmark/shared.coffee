Benchmark = require('benchmark')
OriginalList = require('../_linklist')
assert = require('assert')

module.exports = (LinkedList, LinkedListProc) ->
  original = null
  tested = null
  tested_proc = null

  do reset = ->
    original = name: 'original'
    OriginalList.init(original)
    tested = new LinkedList
    tested_proc = name: 'proc'
    LinkedListProc.init(tested_proc)

  suite_options =
    onCycle: (event) ->
      reset()
      console.log(String(event.target))
    onComplete: ->
      console.log("Fastest is #{@filter('fastest').pluck('name')}")

  new Benchmark.Suite(suite_options)
    .add 'tested#push', ->
      tested.push name: 'new'
    .add 'tested#append', ->
      tested.append name: 'new'
    .add 'tested_proc#append', ->
      LinkedListProc.append tested_proc, name: 'new'
    .add 'original#append', ->
      OriginalList.append original, name: 'new'
    .run()

  # new Benchmark.Suite(suite_options)
  #   .add 'tested#push & #begin', ->
  #     tested.push name: 'new'
  #     assert.ok(tested.begin.name == 'new')
  #   .add 'tested#push & #peek', ->
  #     tested.push name: 'new'
  #     assert.ok(tested.peek().name == 'new')
  #   .add 'tested#append & #peek', ->
  #     tested.append name: 'new'
  #     assert.ok(tested.peek().name == 'new')
  #   .add 'tested_proc#append & #peek', ->
  #     LinkedListProc.append tested_proc, name: 'new'
  #     assert.ok(LinkedListProc.peek(tested_proc).name == 'new')
  #   .add 'original#append & #peek', ->
  #     OriginalList.append original, name: 'new'
  #     assert.ok(OriginalList.peek(original).name == 'new')
  #   .run()

  # new Benchmark.Suite(suite_options)
  #   .add 'tested#push | #shift & #isEmpty randomly', ->
  #     if Math.random() < 0.05
  #       tested.shift() unless tested.isEmpty()
  #     else
  #       tested.push name: 'new'
  #   .add 'tested#append | #shift & #isEmpty randomly', ->
  #     if Math.random() < 0.05
  #       tested.shift() unless tested.isEmpty()
  #     else
  #       tested.append name: 'new'
  #   .add 'tested_proc#append | #shift & #isEmpty randomly', ->
  #     if Math.random() < 0.05
  #       LinkedListProc.shift(tested_proc) unless LinkedListProc.isEmpty(tested_proc)
  #     else
  #       LinkedListProc.append tested_proc, name: 'new'
  #   .add 'original#append | #shift & #isEmpty randomly', ->
  #     if Math.random() < 0.05
  #       OriginalList.shift(original) unless OriginalList.isEmpty(original)
  #     else
  #       OriginalList.append original, name: 'new'
  #   .run()
