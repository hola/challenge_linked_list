# Hola Spring JS Competition Results

In spring 2015, we held a [programming contest](http://hola.org/challenge_js). Thanks to all who participated!

Just to remind you, here are its rules:

> **The challenge: generalize Node.js's linklist**
> NodeJS has a very high performance, low-memory overhead implementation of a linked list: https://github.com/joyent/node/blob/master/lib/_linklist.js.
> This implementation is specific (idle items only), and does not allow list parent to hold two or more different lists in the parent list object.
> Your challenge is to make it generic, while not reducing performance, and include tests to show that performance hasn't been degraded.
> The fastest, most efficient, most generic implementation wins the prize!

Now that the contest is over, we're publishing all the solutions we received, and announcing the winners. But first, here is what we were looking for in a good solution.

## First challenge: understand the challenge

The problem statement above is somewhat vague, and that's intentional. We all know how often it takes some effort to understand the requirements, which are rarely as precisely specified in real life as they are in typical student assignments.

The first question one might have is: what are those “idle item” mentioned in the problem statement? If one explores the GitHub link above, one can see that the original linked list implementation is part of the Node.js source code, and is used internally to track timer callbacks (specifically, “idle” ones). Due to the specifics of that particular algorithm, an item can only be a member of at most one list at any given moment. What the challenge asks for is a general implementation, where a single item can simultaneously participate in many listss, and a single list parent can hold simultaneously many different lists.

Because understanding the requirements is so important, we gave participants **128 points** for getting it right.

## The list is still a list

Programmers usually choose to use a linked list for a reason — such as, for example, quick insertion and removal. Some participants chose to replace the linked list with an array. This definitely creates severe performance problems, and can hardly count as “generalizing the linked list implementation”.

Participants who kept the list a list, got **64 points**. Whenever a participant submitted an array solution together with a non-array solution, we assumed the former was included for comparison, and excluded that from the scoring.

## O(1) deletion

An obvious solution to the list generalization problem is to introduce intermediate objects “nodes” containing the `prev`, `next`, and `value` references. In addition to increased memory use, this approach suffers from a serious performance problem. Because one cannot easily work out the reference to the node from the reference to the item, removing an item given only a reference to it (but not a reference to the list node) becomes an O(N) problem. And the problem “for each item in list A, if some condition is met, remove the item from list B” becomes O(N²) instead of O(N).

An important advantage of a linked list is O(1) deletion time, given a reference to an item. Any solution that kept the O(1) deletion time of the original code, received **32 points**.

## Generated source

The above leaves us with one approach: instead of `_idlePrev`/`_idleNext`, use different pairs of property names for different lists. That way, lists don't conflict with each other, and an item can be simultaneously a member of more than one list. Any solution that has so far collected 224 points, does something like this.

If you use the `[]` operator to access the prev/next properties, there will be a performance degradation compared to the original code that uses `.` member access. This is because V8 can dramatically optimize code where properties with known names are added to objects in the same order. Indirect property access makes such optimizations impossible, causing slow member name lookups on every access.

The way to work around that (the only way we know) is to generate a customized version of the source code for the list implementation, with `.` member access to particular property names, and compile that code. This way, each version of the code is like having a hand-coded version of the original `_linklist.js`, but with different, non-clashing property names.

Participants whose solutions generate and compile code on demand, received **16 points**.

## Benchmark

The challenge rules ask for performance tests. Those who included them, received **8 points**.

## It really is fast

We ran all supplied performance tests. Whenever the test results showed that the submitted solution is not slower than the original code, the author got **4 points**.

## Fast reuse of generated code

In many cases, there is no need to generate and compile a separate version of the code for every list. For many lists in a certain class, we might know that they never overlap. (Such as lists of files belonging to structures representing directories.)

Solutions that avoid the expensive compilation every time a list is created, received **2 points**.

## Portable

Some solutions made clever use of special features of particular interpreters, such as Node.js. Still, there's more value in a solution that demands little of its environment, and can be used both in Node.js and in a variety of web browsers.

Solutions that can run in Node.js and popular browsers unchanged or after trivial modifications, received **1 point**.

## Final standings

Having explained the scoring method, without further ado, we present the final scores of all participants. The first place was a close call!

Because of the particular properties of the scoring system, it should be trivial to work out exactly why each score was awarded.

Place | Name                                  | Score
-----:|---------------------------------------|-----:
    1 | Sergey Shpak (solution #1)            | 255
    2 | Ori Shalev                            | 254
    3 | Alexander Lyakshev                    | 253
    4 | Vasiliy Kostin (“templated” solution) | 252
    5 | Almaz Mubinov                         | 249
    5 | Boris Serduk (prebuilt-getters)       | 249
    7 | Dmitry Karaush and Ruslan Koptev      | 237
    8 | Boris Serduk (symbol-based)           | 233
    8 | Max Melentiev (linked_list)           | 233
    8 | Max Melentiev (linked_list_proc)      | 233
    8 | Sergii Stryzhevskyi (object)          | 233
    8 | Vasiliy Kostin (basic solution)       | 233
   13 | Alexander Baygeldin                   | 205
   13 | Andrey Babkin                         | 205
   13 | Borislav Peev                         | 205
   13 | Boris Serduk (wrapped-items)          | 205
   13 | Sergey Shpak (solution #2)            | 205
   18 | Max Melentiev (linked_list_harmony)   | 200
   18 | Sergii Stryzhevskyi (map)             | 200
   18 | Sergii Stryzhevskyi (weakmap)         | 200
   21 | Kobi                                  | 193
   22 | Ivan Babak                            | 137
   22 | Mateusz Krzeszowiak                   | 137
   24 | Faur George                           | 128
   25 | Avraham Essoudry                      | 109
   25 | Priel Hakak                           | 109
   27 | Alex                                  | 105
   27 | Mark Ablovacky                        | 105
   27 | Tehila                                | 105
   30 | Ilya Sonin                            |  97
   31 | Alexey Efremov                        |  77

## Prizes

The three leaders of the competition receive **1500, 1000, and 500 USD**. Congratulations!

Also, we decided to award the **350 USD special prize** to Dmitry Karaush and Ruslan Koptev, who are 12 and 15 years old. They took the seventh place despite their young age. Hola wishes them good luck and a brilliant career!

## The ridiculous nomination

A couple of “submissions” could not compete for obvious reasons, but deserve a mention anyway. We keep their authors anonymous.

One person, instead of writing code, decided to prove us wrong in theory (the original spelling is kept):

```
My name is REDACTED.
I'm certified software engeneer from Israel. Have 15 years expirience in
programing and development.
I got your  challenge http://hola.org/challenge_js. Very interesting. Let me
show  your task in terms of  computing science.

I'm really sorry about correction in your task description, but term "parent"
refers for objects inhereted its properties by child.
Linked list is a flat sequence with _no inheritence_, so lets name it in
linked-list terms :/head, tail, node, prevoius and next/.

Looking into your task  lets analize wanted alghoritm, becaus  benchmarks will
not give the real  results and only behavior in specified conditions.
Each alghoritm must be /asymptotic/ analysed [1]
<%20https://en.wikipedia.org/wiki/Asymptotology> to know real performance.

We say performance of any algoritm refers to its /complexity/ (worth performance)
and defined as "O(/m/)", where /m/ is growing complicity in some conditions (
amount of nodes , memory etc ).

In _generic linked list_ we have _known complexity_ and it is [2]
<http://en.wikipedia.org/wiki/Linked_list>:

Insert/delete node at head              O(1)
Insert/delete node at tail                  O(n) - where n - number of nodes. Or
O(1) if you store pointer to the tail (two pointers ex. last position and more
variations possible)
Insert/delete node at index             O(n)
Searching(without sorting)              O(n)
The memmory overhead - size of two pointers.


If you want more than one node in link the most generic way is /nested linked-list/
It means each node_will have pointer to head of own linked-list_
The complexity in this case will be :

Insert/delete node at index             O(n+m) where n and m is a number of
nodes in list
Searching(without sorting)              O(n*m) *Warning!* - slow search
The memmory overhead - the size of three pointers.

So, you may ask : "And is this only way and we can't improve something ?".
Shure we can! But if we improve performance of one operation, we will decrese
another resource.
As we can see the bottle neck in your task is a fast element locating
(searching) in case of random access.

Here is some examples of solutions:
1. Indexing or sorted Linked List        - *Advantages* - faster search.
*Disadvantage* - memory consumation or disorder list. Slow insert
2. Nested tree [3] <http://en.wikipedia.org/wiki/Nested_set_model>
                 - *Advantages* : fast search, seriliazable (cached) .
*Disadvantage* - slow insert,  complexity O(n*m)
3. Array of nodes with indexes          -   Good for known number of nodes .
*Disadvantage* - slow relocating

So there is no task for "challange coding" in your conditions. Just learning and
using _well known and tested alghoritms_ according to your needs.
The competition may be won by some "benchmark" but anyway it will not be
"generic linked-list", and , for shure,  fail another benchmark. There is no
magic in science )).

If you interesting in future algoritm programming consalting or development
process managment please contact me  054-REDACTED.

Best Regrads
REDACTED

1. https://en.wikipedia.org/wiki/Asymptotology
2. http://en.wikipedia.org/wiki/Linked_list
3. http://en.wikipedia.org/wiki/Nested_set_model
```

This should deserve an award, *in theory*.

Another one submitted the following C++ code for our JS challenge:

```C++
#include <iostream>
#include <stdlib.h>
#include <assert.h>
#include <cstring>

using namespace std;

char *find(char *s, char a, char b) 
{
    char *res = NULL;
    int i = 0;
    do
    {
        if (s[i] == a || s[i] == b) 
        {
            res = &s[i];
        }
    } while (s[i++] != '\0' && res == NULL);
 
    return res;
}

int main() 
{
    {
        char *s = "test string";
        char *r = find(s, 'e', 's');
        assert(strcmp(r, "est string") == 0);
    }
    
    {
        char *s = "test string";
        char *r = find(s, 'r', 's');
        assert(strcmp(r, "st string") == 0);
    }

    {
        char *s = "test string";
        char *r = find(s, 'e', 's');
        assert(strcmp(r, "est string") == 0);
    }

    {
        char *s = "test string";
        char *r = find(s, 'p', 'q');
        assert(r == NULL);
    }
    
    {
        char s[1] = {'\0'};
        char *r = find(s, 'r', 's');
        assert(r == NULL);
    }

    {
        char s[1] = {'\0'};
        char *r = find(s, 'r', '\0');
        assert(strcmp(r, "\0") == 0);
        assert(*r == '\0');
    }

    {
        char s[1] = {'\0'};
        char *r = find(s, '\0', 't');
        assert(strcmp(r, "\0") == 0);
        assert(*r == '\0');
    }
}
```

We weren't sure whether to be more baffled by the choice of language, or by what the code does.

## Stay tuned

More programming challenges to follow!
