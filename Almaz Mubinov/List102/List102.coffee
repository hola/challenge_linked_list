###
    class List102
    30/06/2015
    Almaz Mubinov, almaz@mubinov.com
###
class List102

    constructor: ()->
        next_key = "'"+@generateKey()+"'"
        prev_key = "'"+@generateKey()+"'"

        # replacing code of functions in runtime =)
        for _func of @
            if typeof @[_func] == 'function' and _func != 'generateKey'
                source = @[_func]+""
                new_code = source
                    .replace(/next_key/g, next_key)
                    .replace(/prev_key/g, prev_key)

                if new_code!=source
                    eval('this.'+_func+'='+new_code)

    # generate random property key
    generateKey: ()->
        if not global._list_102_keys?
            global._list_102_keys = []

        loop
            key = Math.random().toString(36)
            return key if global._list_102_keys.indexOf(key)==-1

    init: (list)->
        list[next_key] = list
        list[prev_key] = list

    # show the most idle item
    peek: (list)->
        return if list[prev_key] == list then null else list[prev_key]

    # remove the most idle item from the list
    shift: (list)->
        first = list[prev_key]
        @remove(first)
        return first


    # remove a item from its list
    remove: (item)->
        if item[next_key]
            item[next_key][prev_key] = item[prev_key]

        if item[prev_key]
            item[prev_key][next_key] = item[next_key]

        item[next_key] = null
        item[prev_key] = null


    # remove a item from its list and place at the end.
    append: (list, item)->
        @remove(item)
        item[next_key] = list[next_key]
        list[next_key][prev_key] = item
        item[prev_key] = list
        list[next_key] = item


    isEmpty: (list)->
        return list[next_key] == list

module.exports = List102