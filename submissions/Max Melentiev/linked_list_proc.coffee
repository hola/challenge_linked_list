counter = 0

module.exports = LinkedList =
  init: (list, id) ->
    id ?= counter += 1
    list._prevProp = "_llistPrev#{id}"
    list._nextProp = "_llistNext#{id}"
    list[list._nextProp] = list
    list[list._prevProp] = list

  peek: (list) ->
    item = list[list._prevProp]
    item unless item == list

  shift: (list) ->
    LinkedList.remove list, list[list._prevProp]

  remove: (list, item) ->
    if item[list._nextProp]
      item[list._nextProp][list._prevProp] = item[list._prevProp]
    if item[list._prevProp]
      item[list._prevProp][list._nextProp] = item[list._nextProp]
    item[list._nextProp] = null
    item[list._prevProp] = null
    item

  append: (list, item) ->
    LinkedList.remove list, item
    item[list._nextProp] = list[list._nextProp]
    list[list._nextProp][list._prevProp] = item
    item[list._prevProp] = list
    list[list._nextProp] = item
    return

  isEmpty: (list) ->
    list[list._nextProp] == list
