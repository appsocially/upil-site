# UPIL Language

UPIL has several high-level entities to allow you to interact with a user. UPIL also includes other concepts for describing high-level business-logic including conditional logic, loading data from external sources, and external actions.

## User-Interaction

User interaction is performed using three main entities: `TEMPLATE`, `SELECT`, and `MULTI_SELECT`. All three entities can save user input to a variable with the `<<myVariable` syntax. This allows the user input to be referenced and used later on in the scenario.

### Template
A `TEMPLATE` entity is for displaying text to a user. `TEMPLATE`s can also request a user's input.

`TEMPLATE` for greeting the user with the text "Hi there!":

<UpilBot simple>
```
TEMPLATE
  "Hi there!"
/TEMPLATE
```
</UpilBot>

Example `TEMPLATE` with user input request saved to the variable `name`:

<UpilBot simple>
```{3}
TEMPLATE
  "What is your name?"
  >>name
/TEMPLATE
```
</UpilBot>

### SELECT
A `SELECT` is used to request the user to select a single choice from a list of choices. It requires the user input to be saved to a variable.

<UpilBot simple>
```
SELECT
 "Please choose your favorite color"
  -("Red", red)
  -("Blue", blue)
  -("Green", green)
  >>color
/SELECT
```
</UpilBot>

### MULTI_SELECT
A `MULTI_SELECT` is similar to a `SELECT`, only it allows users to select more than one choice from a list

<UpilBot simple>
```
MULTI_SELECT
 "Please choose all of your favorite colors"
  -("Color red", red)
  -("Color blue", blue)
  -("Color green", green)
  >>colors
/MULTI_SELECT
```
</UpilBot>

## Logic control
The entities that interact with the user are wrapped and controlled by logic-control entites. This allows you to have a scenario that dynamically adjusts to user-input and/or external data. It also allows you to reuse the same user-interaction from several different places in a scenario.

### DIALOG

A `DIALOG` is a container that most entities must be wrapped in. The UPIL Engine runs the steps of a scenario in the order that they appear in a `DIALOG`:

<UpilBot>
```
DIALOG main
  TEMPLATE
    "I'm first"
  /TEMPLATE
  TEMPLATE
    "I'm second"
  /TEMPLATE
  TEMPLATE
    "I'm third"
  /TEMPLATE
/DIALOG
RUN a
  main
/RUN
```
</UpilBot>

### IF/ELIF/ELSE
UPIL has `IF`, `ELIF`, and `ELSE` entities 

### RUN

## Application communication

### EXTERNAL

### ACTION

### Labels

