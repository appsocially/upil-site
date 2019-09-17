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

UPIL is designed to allow the scenario to communicate with the underlying implementation seamlessly. UPIL has three main features that allow for explicit communication to an underlying implementation so that custom behavior can be triggered by the scenario:

### EXTERNAL

The `EXTERNAL` entity allows a scenario writer to request that the implementation prepare a variable with some data so that the scenario may make use of it.

This example registers a hook in the Engine that a developer must use to prepare data that a scenario requires. This example's implementation saves either 'cloudy', 'sunny', or 'rainy' to the `weather` variable before the scenario begins. 

<UpilBot>
```{1}
EXTERNAL weather

DIALOG weatherExplanation
  TEMPLATE
    "The weather is currently ${weather}"
  /TEMPLATE
  IF weather=="cloudy"
    TEMPLATE
      "It's going to be cool all day"
    /TEMPLATE
  ELIF weather=="sunny"
    TEMPLATE
      "Pack your sunscreen it's going to be hot!"
    /TEMPLATE
  ELIF weather=="rainy"
    TEMPLATE
      "Looks like you're going to need an umbrella today!"
    /TEMPLATE
  ELSE
    TEMPLATE
      "I can't even explain this weather..."
    /TEMPLATE
  /IF
/DIALOG

RUN a
  weatherExplanation
/RUN
```
</UpilBot>

### ACTION

The `ACTION` entity requests that a side effect occur within a specific part of the scenario. An `ACTION` can be placed anywhere in a `DIALOG`. When the Engine reaches an `ACTION` in the scenario, it tells the implementation about it. The implementation can decide whether or not to delay the scenario until the `ACTION` is complete. An example usecase for an `ACTION` is sending an email or a push message at a specific point in the scenario.

<UpilBot>
```{17}
DIALOG rainy
  TEMPLATE
    "Looks like you're going to need an umbrella today!"
  /TEMPLATE
  SELECT
    "Do you want me to call a taxi for you?"
    -("Yes", yes)
    -("No", no)
    >>callTaxi
  /SELECT
  IF callTaxi=="yes"
    DIALOG
      TEMPLATE
        "Okay, I'll get right on that!"
      /TEMPLATE
      ACTION callTaxi
    /DIALOG
  ELSE
    TEMPLATE
      "Drive safe!"
    /TEMPLATE
  /IF
/DIALOG

RUN a
  rainy
/RUN
```
</UpilBot>

### Labels

Labels are required in many cases, such as when using an `ACTION` entity or when referring to a `DIALOG` from a `RUN` entity.  There are many cases however where optional labels are useful as well, for communicating with an underlying implementation.

Labels can be applied to a `TEMPLATE`, `SELECT`, or `MULTI_SELECT` entity in order to override the default behavior for a specific entity. For instance, instead of just showing text, an application may want to substitute in a complex widget such as a map, or a data table. By agreeing on a label name and overriding an entity when that name appears, scenario writers and developers can work together to create much more complex interactions than is possible with just exchanging text. 

Here is an example where the implementation is waiting to override an entity with the label `brandImage` with an embedded image of their brand in addition to the text:

<UpilBot>
```{5}
DIALOG welcome
  TEMPLATE
    "Welcome to our site!"
  /TEMPLATE
  TEMPLATE brandImage
    "I'll be guiding you through our options today"
  /TEMPLATE
/DIALOG

RUN a
  welcome
/RUN
```
</UpilBot>