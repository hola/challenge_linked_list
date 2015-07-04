module.exports =
class LinkedList
  @_counter: 0

  constructor: (id) ->
    id ?= LinkedList._counter += 1
    @_prevProp = "_llistPrev#{id}"
    @_nextProp = "_llistNext#{id}"
    # @ownedProp = "_llistOwned#{id}"

  push: (item) ->
    # item[@ownedProp] = true
    target = @end
    if target
      target[@_nextProp] = item
      item[@_prevProp] = target
      @end = item
    else
      @begin = @end = item

  unshift: (item) ->
    # item[@ownedProp] = true
    if @begin
      @begin[@_prevProp] = item
      item[@_nextProp] = @begin
      @begin = item
    else
      @begin = @end = item

  pop: ->
    @remove(@end)

  shift: ->
    @remove(@begin)

  remove: (item) ->
    # owned_prop = @ownedProp
    if item#?[owned_prop]
      prev = item[@_prevProp]
      next = item[@_nextProp]
      # item[owned_prop] = null
      @begin = next if item == @begin
      @end = prev if item == @end
      return item unless prev || next
      next?[@_prevProp] = prev
      prev?[@_nextProp] = next
      item[@_prevProp] = item[@_nextProp] = null
      item
    # else
    #   item

  # Compatibility:
  peek: -> @begin
  isEmpty: -> !@begin
  append: (item) ->
    @push @remove(item)
