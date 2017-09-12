Work in progress scripts for the game screeps Most of this was thrown together to make it work.

## TODO
- Write better tower functions
- Right now it just repairs

- Figure out an offensive and defensive strategy

- Flag definitions

Roles are in order that I defined them in creepRoles.js. Pardon if it seems like it is disorganized, will reorganize later.

## Work In progress
#### Todo list things that have been started and waiting to see how it finished
- Fix num to build to be more realistic

- Fix parts to be more efficient and make bigger creeps

# Creep Roles


## builder

Description: Builder role for building structures

- Routines

  - Harvest Energy From Source
  - Build Structures
  - If there is nothing to build, find something to repair
  - If there is nothing to repair, help upgrade the controller

- Num to build - level:number

  - 0:0
  - 1:2
  - 2:2
  - default:2

- Parts to build - level:[parts]
  - 1 and 2: [WORK, CARRY, MOVE] : 200 Energy
  - 3: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] : 550 Energy
  - Default:[WORK, CARRY, MOVE]

## harvest-controller

Description: A harvest role designed to get feed and upgrade the controller.

- Routines

  - Harvest energy from source
  - Upgrad the controller

- Num to build - level:number

  - 0:0
  - 1:2
  - default:2

- Parts to build - level:[parts]
  - 1 and 2: [WORK, CARRY, MOVE] : 200 Energy
  - 3 and 4: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE] : 800 Energy
  - Default:[WORK, CARRY, MOVE]

## repairer

Description: Role to repair structures that degrade

- Routines

  - Harvest energy from source
  - Repair structures
  - If there is nothing to repair, help build structures
  - If there is nothing to build, help upgrade the controller

- Num to build - level:number

  - 0:0
  - 1:1
  - 2:2
  - default:2

- Parts to build - level:[parts]

  - 1 or 2: [WORK, CARRY, MOVE] : 200 Energy
  - 3:[WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] : 550 Energy
  - Default:[WORK, CARRY, MOVE]

## harvest-general

Description: Harvest role that gets energy and places it where needed: Spawn, structures etc.

- Routines:

  - Harvest energy from source
  - Transfer energy to structures that need it (spawners, extensions, towers etc)

- Num to build - level:number

  - 0:2
  - 1:3
  - 2:3
  - 3:4
  - default:4

- Parts to build - level:[parts]

  - 1 or 2: [WORK, CARRY, MOVE] : 200 Energy
  - 3: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] : 550 Energy
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

  - Creep Builds - Total: 2
    - Harvest-General: 2

  - Creep Parts
    - Default: [WORK, CARRY, MOVE]

- Level 1

  - Creep Builds - Total: 8
    - Builder: 2
    - Harvest-Controller: 2
    - Repairer: 1
    - Harvest-General: 3

  - Creep Parts
    - Default: [WORK, CARRY, MOVE]

- Level 2

  - Creep Builds - Total: 9

    - Builder: 2
    - Harvest-Controller: 2
    - Repairer: 2
    - Harvest-General: 3

  - Creep Parts

    - Default: [WORK, CARRY, MOVE]

- Level 3

  - Creep Builds - Total: 10

    - Builder: 2
    - harvest-controller: 2
    - Repairer: 2
    - Harvest-General: 4

  - Creep Parts

    - Builder, Repairer, harvest-general: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    - harvest-controller: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    -

- Level 4

#### TODO

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
  - Spawner: 300 Energy + 10 Extensions 50 Each = 800 Total
	- Keep the same parts as level 3

- Level 5
	- Needed
		- Controller Level 4
		- Max Extensions Built
	- Spawner: 300 Energy + 20 Extensions 50 Each = 1300 Total

# Functions and other scripts used

# General/Other TODO

Things I would like to get to, but might not

- Generate road builds between points

  - Ex: Spawn->Source, Source->Controller

- Generate structures: Extenders, towers
