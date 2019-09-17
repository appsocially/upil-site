# UPIL Language

The UPIL language was designed to allow both developers and non-developers to describe "scenarios", or high-level flows of interaction between a user and an application. UPIL has several high-level entities to allow you to interact with a user. UPIL also includes other concepts for describing high-level business-logic including conditional logic, loading data from external sources, and external actions.

## Entity Structure

Most entities have the following structure:

```
<Entity Name> <Optional Label>
  <Entity Contents>
/<Entity Name>
```
For example:
```
TEMPLATE myLabel
  "Message to user"
/TEMPLATE
```

`EXTERNAL` and `ACTION` entities have a simpler structure:
```
EXTERNAL currentTemp
```
```
ACTION sendEmail
```

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

## Business Logic 
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

A `DIALOG` can hold `TEMPLATE`, `SELECT`, `MULTI_SELECT`, `IF/ELIF/ELSE`, `ACTION`, and even other `DIALOG` entities. 

#### DIALOG Embedding
Using the `...<dialogLabel>` sytax, a `DIALOG` can embed another `DIALOG` inside of itself:

<UpilBot>
```{12}
DIALOG getUserName
  TEMPLATE
    "What is your name?"
    >>name
  /TEMPLATE
/DIALOG

DIALOG main
  TEMPLATE
    "OK lets start!"
  /TEMPLATE
  ...getUserName
  TEMPLATE
    "Nice to meet you ${name}"
  /TEMPLATE
/DIALOG

RUN a
  main
/RUN
```
</UpilBot>

A `DIALOG` can be embedded in as many other `DIALOG`s as you want. To embed `DIALOG`-`A` into `DIALOG`-`B`, `A` must be placed higher in the scenario file than `B`. 

### Conditional logic
UPIL has `IF`, `ELIF`, and `ELSE` entities. You can use conditional logic to make scenarios that respond dynamically to user-input and external data:

<UpilBot>
```
DIALOG main
  SELECT
    "Please choose your favorite color"
    -("Red", red)
    -("Blue", blue)
    -("Green", green)
    -("Other", other)
    >>color
  /SELECT
  IF color=="red"
    TEMPLATE
      "You must like roses!"
    /TEMPLATE
  ELIF color=="blue"
    TEMPLATE
      "You must like the ocean!"
    /TEMPLATE
  ELIF color=="green"
    TEMPLATE
      "You must like nature!"
    /TEMPLATE
  ELSE
    DIALOG
      TEMPLATE
        "Okay, what other color do you like?"
        >>otherColor
      /TEMPLATE
      TEMPLATE
        "I see. We'll have to think of a new witty response for when someone chooses '${otherColor}'!"
      /TEMPLATE
    /DIALOG
  /IF
/DIALOG

RUN a
  main
/RUN
```
</UpilBot>

### RUN

The `RUN` entity tells the Engine where to begin a scenario from. It expects to be passed a `DIALOG`'s label.


The following command tells the Engine to start a scenario at the `DIALOG` with the label '`main`':
```
RUN a
  main
/RUN
```

## Application communication

### EXTERNAL

### ACTION

### Labels

