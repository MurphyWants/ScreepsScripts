Work in progress scripts for the game screeps Most of this was thrown together to make it work. Some of it needs to be cleaned up, most of it needs to be reorganized. Example: I don't need 17 creeps spawned, yet I have 17 creeps spawned. I'll fix that later.

# Creep Roles

## TODO

- Rewrite routines to be more modular and less inline

  - Ex: Get sources routine should be a function and not the same block of code over and over

- Fix num to build to be more realistic

- Fix parts to be more efficient and make bigger creeps

  - Also each creep has the same parts to build right now, need to figure out a good setup per each role
  - Harvester-controller should have more MOVE than CARRY or WORK
  - Harvester-general should have more CARRY and WORK than MOVE

- Figure out an offensive and defensive strategy

Roles are in order that I defined them in creepRoles.js. Pardon if it seems like it is disorganized, will reorganize later.

## builder

Description: Builder role for building structures

- Routines

  - Fill Energy From Source
  - Build Structures

    - If there is nothing to build, go wait by the wait flag

      - Reason: Instead of waiting in the mess, go wait elsewhere to make it cleaner

- Num to build - level:number

  - 0:0
  - 1:2
  - 2:3
  - default:3

- Parts to build - level:[parts]

  - 3:[WORK, CARRY, CARRY, MOVE, MOVE]
  - 4:[WORK, WORK, CARRY, CARRY, MOVE, MOVE]
  - Default:[WORK, CARRY, MOVE]

## harvest-controller

Description: A harvest role designed to get feed and upgrade the controller. As opposed to harvest-home, this actually serves a purpose.

- TODO

  - Make the creep faster and to get to and from the controller really quick. I think being quicker to fill the controller will be better than more at once.

    - Reason: So the controller won't degrade

- Routines

  - Get energy from source
  - Bring energy to controller

- Num to build - level:number

  - 0:0
  - 1:3
  - 2:5
  - default:5

- Parts to build - level:[parts]

  - 3:[WORK, CARRY, CARRY, MOVE, MOVE]
  - 4:[WORK, WORK, CARRY, CARRY, MOVE, MOVE]
  - Default:[WORK, CARRY, MOVE]

## repairer

Description: Role to repair structures that degrade

- Routines

  - Get energy from source
  - Check if there exist a structure with 3/4 heath

    - True: Go fix it
    - False: Help build

      - IF nothing to build, go to wait flag

- Num to build - level:number

  - 0:0
  - 1:1
  - 2:2
  - default:2

- Parts to build - level:[parts]

  - 3:[WORK, CARRY, CARRY, MOVE, MOVE]
  - 4:[WORK, WORK, CARRY, CARRY, MOVE, MOVE]
  - Default:[WORK, CARRY, MOVE]

## harvest-general

Description: Harvest role that gets energy and places it where needed: Spawn, structures etc.

- Routines:

  - Get energy from source
  - Check if theres something that needs energy

    - True: Fill it
    - False: Help build

      - If nothing to build, go to wait flag

- Num to build - level:number

  - 0:0
  - 1:2
  - 2:4
  - default:6

- Parts to build - level:[parts]

  - 3:[WORK, CARRY, CARRY, MOVE, MOVE]
  - 4:[WORK, WORK, CARRY, CARRY, MOVE, MOVE]
  - Default:[WORK, CARRY, MOVE]

# Room Definitions

"room-name" : ["WaitFlag", "SpawnName", "RoomLevel"]

- Room-name : Name of the room
- WaitFlag : I define a flag somewhere in the room so that creeps that don't have anything to do can go wait there
- SpawName : Name of the spawn, used for regeneration
- RoomLevel : I define a level for each room so that different level creeps can be spawned and different parts per creep

# Level Definitions

## What is defined

- Level 0

  - Creep Builds - Total: 0

  - Creep Parts

    - Default: [WORK, CARRY, MOVE]

- Level 1

  - Creep Builds - Total: 8

    - Builder: 2
    - Harvest-Controller: 3
    - Repairer: 1
    - Harvest-General: 2

  - Creep Parts

    - Default: [WORK, CARRY, MOVE]

- Level 2

  - Creep Builds - Total: 14

    - Builder: 3
    - Harvest-Controller: 5
    - Repairer: 2
    - Harvest-General: 4

  - Creep Parts

    - Default: [WORK, CARRY, MOVE]

- Level 3

  - Creep Builds - Total: 16

    - Builder: 3
    - harvest-controller: 5
    - Repairer: 2
    - Harvest-General: 6

  - Creep Parts

    - Default: [WORK, CARRY, CARRY, MOVE, MOVE]

- Level 4

  - Creep Builds - Total: 16

    - Builder: 3
    - harvest-controller: 5
    - Repairer: 2
    - Harvest-General: 6

  - Creep Parts

    - Default: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]

## What should be defined
What I want to do later, after thinking this out
### Note: Try to keep creep count max 10

- Level 0

  - Beginings: 2 Creeps
  - Need to get rid of Harvester-Home and put in Harvester-General

    - Total 2 creeps
    - [WORK, CARRY, MOVE]

- Level 1

  - Add 2 builders, 1 repair unit, 1 harvest-controller
  - Total 6 creeps
  - [WORK, CARRY, MOVE]

- Level 2
  - Needed:
    - Controller Level 2
    - Built Max Extensions
  - 2 Builders, 3 Repair, 2 harvest-controller, 3 harvest-general
  - Total 10 Creeps
  - [WORK, CARRY, MOVE]

- Level 3
  - Controller Level 2
  - Same number of creeps
  - Spawner: 300 energy + 5 Extensions: 50 Each = 550 Energy Total
  - Creep Parts
    - Builder / Repairer / harvest-general: [WORK, WORK, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY] //550 Energy
    - harvest-controller: [WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE , CARRY, CARRY] //550 Energy

- Level 4
  - Needed
    - Controller Level 3
    - Max Extensions Built

# Functions and other scripts used

# General/Other TODO

Things I would like to get to, but might not

- Generate road builds between points

  - Ex: Spawn->Source, Source->Controller

- Generate structures: Extenders, towers
