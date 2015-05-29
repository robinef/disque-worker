# disque-worker

## Introduction

disque-worker is a small nodeJS worker system using the new Disque project (made by `@antirez` the creator of Redis). It's really basic for now but working fine. It's based on node-redis client since Disque is similar to Redis in terms of connectivity and command execution.

## Requirement

You should have [Disque](https://github.com/antirez/disque) server/cluster up and running. Let's assume its running locally on port 7711. (see install documentation on previous link)

## Installation

Simply run
``
npm install
``
to install all external packages.

## Tests

You can run unit tests using mocha :

`` mocha``

Output should be something like :

  	disque-worker
    ✓ should be connected
    ✓ should add a job in queue
    ✓ should retrieve a job in the queue list


  	3 passing (44ms)

## Usage by example

You can start a worker by typing in your shell :

``
nodejs example/worker_example.js
``

Then you can start pushing some new job in the queue and watch the worker executing them by launching the bench script :

``
nodejs example/bench.js
``

## Coming next

* Support unix socket connection
* Support cluster connection
* Add stats module


## Notes

On May 29th 2015 Disque is still in beta mode so you can expect bugs/issues. Feel free to help by joining the [project](https://github.com/antirez/disque)
