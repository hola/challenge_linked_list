assert = require('assert')

module.exports = (LinkedList) ->
  list = new LinkedList
  A = name: 'A'
  B = name: 'B'
  C = name: 'C'
  D = name: 'D'

  assert.ok(list.isEmpty())
  assert.equal(null, list.peek())

  list.append(A)
  # list -> A
  assert.equal(A, list.peek())

  list.append(B)
  # list -> A -> B
  assert.equal(A, list.peek())

  list.append(C)
  # list -> A -> B -> C
  assert.equal(A, list.peek())

  list.append(D)
  # list -> A -> B -> C -> D
  assert.equal(A, list.peek())

  x = list.shift()
  assert.equal(A, x)
  # list -> B -> C -> D
  assert.equal(B, list.peek())

  x = list.shift()
  assert.equal(B, x)
  # list -> C -> D
  assert.equal(C, list.peek())

  # B is already removed, so removing it again shouldn't hurt.
  list.remove(B)
  # list -> C -> D
  assert.equal(C, list.peek())

  # Put B back on the list
  list.append(B)
  # list -> C -> D -> B
  assert.equal(C, list.peek())

  list.remove(C)
  # list -> D -> B
  assert.equal(D, list.peek())

  list.remove(B)
  # list -> D
  assert.equal(D, list.peek())

  list.remove(D)
  # list
  assert.equal(null, list.peek())


  assert.ok(list.isEmpty())


  list.append(D)
  # list -> D
  assert.equal(D, list.peek())

  list.append(C)
  list.append(B)
  list.append(A)
  # list -> D -> C -> B -> A

  # Append should REMOVE C from the list and append it to the end.
  list.append(C)

  # list -> D -> B -> A -> C
  assert.equal(D, list.shift())
  # list -> B -> A -> C
  assert.equal(B.name, list.peek().name)
  assert.equal(B, list.shift())
  # list -> A -> C
  assert.equal(A, list.peek())
  assert.equal(A, list.shift())
  # list -> C
  assert.equal(C, list.peek())
  assert.equal(C, list.shift())
  # list
  assert.ok(list.isEmpty())

  # extra
  other_list = new LinkedList

  list.append(A)
  other_list.append(A)
  assert.equal(A, list.peek())
  assert.equal(A, other_list.peek())

  list.remove(A)
  assert.equal(null, list.peek())
  assert.equal(A, other_list.peek())
