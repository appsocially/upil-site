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

The `RUN` command specifies the `DIALOG` to start the scenario at.

The below two examples demonstrate how changing the `RUN` command changes which `DIALOG` is processed by the Engine:

Start at dialog `A`:

<UpilBot>
```
DIALOG B
  TEMPLATE
    "Hi from B"
  /TEMPLATE
/DIALOG

DIALOG A
  TEMPLATE
    "Hi from A"
  /TEMPLATE
/DIALOG

RUN label
  A
/RUN
```
</UpilBot>

Start at dialog `B`:

<UpilBot>
```
DIALOG B
  TEMPLATE
    "Hi from B"
  /TEMPLATE
/DIALOG

DIALOG A
  TEMPLATE
    "Hi from A"
  /TEMPLATE
/DIALOG

RUN label
  B
/RUN
```
</UpilBot>

## Application communication

UPIL includes three features to make it easy to communicate between a scenario and an application which utilizes UPIL: `EXTERNAL` and `ACTION` entities, and entity labels. These features allow a scenario writer to use high-level concepts, which a developer can then hook up to arbitrarily complex implementations. Ideally even after the implementation has been created, the scenario writer can freely update their scenario without having to rely on a developer to update the implementation. 

### EXTERNAL

The `EXTERNAL` entity allows the scenario to request that the application save data to a specific variable. The application can retreive the data from anywhere it wants. `EXTERNAL` entities must be declared at the beginning of a scenario, outside of `DIALOG` entities.

<UpilBot>
```
EXTERNAL currentTime

DIALOG A
  TEMPLATE
    "The current time is ${currentTime}"
  /TEMPLATE
/DIALOG

RUN label
  A
/RUN
```
</UpilBot>

### ACTION

An `ACTION` allows scenario writers to request that a side-effect happens in the implementation. This can include saving data, sending messages such as emails or push notifications, or making calls to external services. Unlike `EXTERNAL`, an `ACTION` cannot save its result in a variable. An `ACTION` must be placed inside of a `DIALOG`.

<UpilBot>
```
DIALOG A
  TEMPLATE
    "What is your email address?"
    >>email
  /TEMPLATE
  ACTION sendEmail
  TEMPLATE
    "Please check ${email} for your verification code!
    (just kidding, we didn't send one since this is an example)"
  /TEMPLATE
/DIALOG

RUN label
  A
/RUN
```
</UpilBot>

### Labels



