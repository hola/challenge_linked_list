module.exports =
class LinkedList
  @_counter: 0

  constructor: ->
    @map = new WeakMap

  push: (item) ->
    if @end
      @map.set item, [@end, null]
      @map.get(@end)[1] = item
      @end = item
    else
      @map.set item, Array(2)
      @begin = @end = item

  unshift: (item) ->
    if @begin
      @map.set item, [null, @begin]
      @map.get(@begin)[0] = item
      @begin = item
    else
      map.set item, Array(2)
      @begin = @end = item

  pop: ->
    @remove(@end)

  shift: ->
    @remove(@begin)

  remove: (item) ->
    links = @map.get(item)
    return item unless links
    @map.delete(item)
    prev = links[0]
    next = links[1]
    @begin = next if item == @begin
    @end = prev if item == @end
    @map.get(next)[0] = prev if next
    @map.get(prev)[1] = next if prev
    item

  # Compatibility:
  peek: -> @begin
  isEmpty: -> !@begin
  append: (item) ->
    @push @remove(item)
