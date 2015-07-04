assert = require('assert')
L = require('../linked_list_proc')

list = name: 'list'
A = name: 'A'
B = name: 'B'
C = name: 'C'
D = name: 'D'


L.init(list)
L.init(A)
L.init(B)
L.init(C)
L.init(D)

assert.ok(L.isEmpty(list))
assert.equal(null, L.peek(list))

L.append(list, A)
# list -> A
assert.equal(A, L.peek(list))

L.append(list, B)
# list -> A -> B
assert.equal(A, L.peek(list))

L.append(list, C)
# list -> A -> B -> C
assert.equal(A, L.peek(list))

L.append(list, D)
# list -> A -> B -> C -> D
assert.equal(A, L.peek(list))

x = L.shift(list)
assert.equal(A, x)
# list -> B -> C -> D
assert.equal(B, L.peek(list))

x = L.shift(list)
assert.equal(B, x)
# list -> C -> D
assert.equal(C, L.peek(list))

# B is already removed, so removing it again shouldn't hurt.
L.remove(list, B)
# list -> C -> D
assert.equal(C, L.peek(list))

# Put B back on the list
L.append(list, B)
# list -> C -> D -> B
assert.equal(C, L.peek(list))

L.remove(list, C)
# list -> D -> B
assert.equal(D, L.peek(list))

L.remove(list, B)
# list -> D
assert.equal(D, L.peek(list))

L.remove(list, D)
# list
assert.equal(null, L.peek(list))


assert.ok(L.isEmpty(list))


L.append(list, D)
# list -> D
assert.equal(D, L.peek(list))

L.append(list, C)
L.append(list, B)
L.append(list, A)
# list -> D -> C -> B -> A

# Append should REMOVE C from the list and append it to the end.
L.append(list, C)

# list -> D -> B -> A -> C
assert.equal(D, L.shift(list))
# list -> B -> A -> C
assert.equal(B, L.peek(list))
assert.equal(B, L.shift(list))
# list -> A -> C
assert.equal(A, L.peek(list))
assert.equal(A, L.shift(list))
# list -> C
assert.equal(C, L.peek(list))
assert.equal(C, L.shift(list))
# list
assert.ok(L.isEmpty(list))

# extra
other_list = name: 'other'
L.init other_list

L.append(list, A)
L.append(other_list, A)
assert.equal(A, L.peek(list))
assert.equal(A, L.peek(other_list))

L.remove(list, A)
assert.equal(null, L.peek(list))
assert.equal(A, L.peek(other_list))
