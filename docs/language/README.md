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

`EXTERNAL`, `RUN`, and `ACTION` entities have a simpler structure:
```
EXTERNAL currentTemp
```
```
ACTION sendEmail
```
```
RUN main
```

`TEMPLATE` entites also have a simple version:

Text only:
```
TEMPLATE "Hi there"
```

Label only:
```
TEMPLATE overrideThis
```

## User-Interaction

User interaction is performed using three main entities: `TEMPLATE`, `SELECT`, and `MULTI_SELECT`. All three entities can save user input to a variable with the `<<myVariable` syntax. This allows the user input to be referenced and used later on in the scenario.

### Template
A `TEMPLATE` entity is for displaying text to a user. `TEMPLATE`s can also request a user's input.

`TEMPLATE` for greeting the user with the text "Hi there!":

<UpilBot simple>
```
TEMPLATE "Hi there!"
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

### Selects

#### SELECT
A `SELECT` is used to request the user to select a single choice from a list of choices. It requires the user input to be saved to a variable.

<UpilBot simple>
```
SELECT
 "Please choose your favorite color"
  -("Red", "red")
  -("Blue", "blue")
  -("Green", "green")
  >>color
/SELECT
```
</UpilBot>

#### MULTI_SELECT
A `MULTI_SELECT` is similar to a `SELECT`, only it allows users to select more than one choice from a list

<UpilBot simple>
```
MULTI_SELECT
 "Please choose all of your favorite colors"
  -("Color red", "red")
  -("Color blue", "blue")
  -("Color green", "green")
  >>colors
/MULTI_SELECT
```
</UpilBot>

#### Options

There are several ways to write options in a `SELECT` or `MULTI_SELECT`

##### Default case
```
-("Color red", "red")
```

The default case presents the user with an option `Color red`, while saving `red` in the select's variable.

##### Simplified case
```
- "Red"
```

The simplified version would use `Red` both for the option text, and the value saved in the select's variable.

##### Value types

The value of an option can be a `literal` such as a string, number, or boolean:

String:
```
-("Color red", "red")
```

Number:
```
-("Five cars", 5)
```

Boolean:
```
-("Call taxi", true)
```

The value of an option can also come from a variable. This is specified by using a variable name without quotes. If the variable doesn't exist, then the UPIL engine will assume it should use the variable name as a string value.

Variable:
```
-("My car", usersCar)
```

Here is an example of using the above variable case:

```
EXTERNAL usersCar

SELECT
 "Which car do you want?"
  -("My car", usersCar)
  -("Default", "hondaAccord")
  >>carSelection
/SELECT
```

If the value of the `EXTERNAL` was set to "ferrari", then when a user chooses the `My car` option, the variable `carSelection` will be set with the value of the variable `usersCar` which is "ferrari"

## Business Logic 
The entities that interact with the user are wrapped and controlled by logic-control entites. This allows you to have a scenario that dynamically adjusts to user-input and/or external data. It also allows you to reuse the same user-interaction from several different places in a scenario.

### DIALOG

A `DIALOG` is a container that most entities must be wrapped in. The UPIL Engine runs the steps of a scenario in the order that they appear in a `DIALOG`:

<UpilBot>
```
DIALOG main
  TEMPLATE "I'm first"
  TEMPLATE "I'm second"
  TEMPLATE "I'm third"
/DIALOG
RUN main
```
</UpilBot>

A `DIALOG` can hold `TEMPLATE`, `SELECT`, `MULTI_SELECT`, `IF/ELIF/ELSE`, `ACTION`, and even other `DIALOG` entities. 

#### DIALOG Embedding
Using the `...<dialogLabel>` sytax, a `DIALOG` can embed another `DIALOG` inside of itself:

<UpilBot>
```{3}
DIALOG main
  TEMPLATE "OK lets start!"
  ...getUserName
  TEMPLATE "Nice to meet you ${name}"
/DIALOG

DIALOG getUserName
  TEMPLATE
    "What is your name?"
    >>name
  /TEMPLATE
/DIALOG

RUN main
```
</UpilBot>

A `DIALOG` can be embedded in as many other `DIALOG`s as you want. The order of `DIALOG`s don't matter. 

### Conditional logic
UPIL has `IF`, `ELIF`, and `ELSE` entities. You can use conditional logic to make scenarios that respond dynamically to user-input and external data:

<UpilBot>
```{10,12,14,16,25}
DIALOG main
  SELECT
    "Please choose your favorite color"
    -("Red", "red")
    -("Blue", "blue")
    -("Green", "green")
    -("Other", "other")
    >>color
  /SELECT
  IF color=="red"
    TEMPLATE "You must like roses!"
  ELIF color=="blue"
    TEMPLATE "You must like the ocean!"
  ELIF color=="green"
    TEMPLATE "You must like nature!"
  ELSE
    DIALOG
      TEMPLATE
        "Okay, what other color do you like?"
        >>otherColor
      /TEMPLATE
      TEMPLATE "I see. We'll have to think of a new witty response for when someone chooses '${otherColor}'!"
    /DIALOG
  /IF
/DIALOG

RUN main
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

The `EXTERNAL` entity allows a scenario writer to request that the implementation prepare a variable with some data so that the scenario may make use of it.

Basic example:

<UpilBot>
```{1}
EXTERNAL currentTime

DIALOG A
  TEMPLATE
    "The current time is ${currentTime}"
  /TEMPLATE
/DIALOG

RUN A
```
</UpilBot>

This example registers a hook in the Engine that a developer must use to prepare data that a scenario requires. This example's implementation saves either 'cloudy', 'sunny', or 'rainy' to the `weather` variable before the scenario begins:

<UpilBot>
```{1}
EXTERNAL weather

DIALOG weatherExplanation
  TEMPLATE "The weather is currently ${weather}"
  IF weather=="cloudy"
    TEMPLATE "It's going to be cool all day"
  ELIF weather=="sunny"
    TEMPLATE "Pack your sunscreen it's going to be hot!"
  ELIF weather=="rainy"
    TEMPLATE "Looks like you're going to need an umbrella today!"
  ELSE
    TEMPLATE "I can't even explain this weather..."
  /IF
/DIALOG

RUN weatherExplanation
```
</UpilBot>

### ACTION

An `ACTION` allows scenario writers to request that a side-effect happens in the implementation. This can include saving data, sending messages such as emails or push notifications, or making calls to external services. Unlike `EXTERNAL`, an `ACTION` cannot save its result in a variable. An `ACTION` must be placed inside of a `DIALOG`. When the Engine reaches an `ACTION` in the scenario, it tells the implementation about it. The implementation can decide whether or not to delay the scenario until the `ACTION` is complete. An example usecase for an `ACTION` is sending an email or a push message at a specific point in the scenario.

<UpilBot>
```{12}
DIALOG rainy
  TEMPLATE "Looks like you're going to need an umbrella today!"
  SELECT
    "Do you want me to call a taxi for you?"
    -("Yes", true)
    -("No", false)
    >>callTaxi
  /SELECT
  IF callTaxi==true
    DIALOG
      TEMPLATE "Okay, I'll get right on that!"
      ACTION callTaxi
    /DIALOG
  ELSE
    TEMPLATE "Drive safe!"
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
```{3}
DIALOG welcome
  TEMPLATE "Welcome to our site!"
  TEMPLATE brandImage
    "I'll be guiding you through our options today"
  /TEMPLATE
/DIALOG

RUN welcome
```
</UpilBot>

### Variables

Variables are where user input and input from `EXTERNAL` entities are stored. 

Example variable called `name`:
```{3}
TEMPLATE
  "What is your name?"
  >>name
/TEMPLATE
```

All variables are stored in a global namespace. This means if a single variable name is used multiple times, it will be overwritten each time. This also means that if a `DIALOG` is called multiple times from different parts of a scenario, variables created inside of it will be overwritten each time they are set. 

Example of variable `someVariable` being overwritten:

<UpilBot>
```{4,8,12}
DIALOG varTest
  TEMPLATE 
    "What is your favorite color?"
    >>someVariable
  /TEMPLATE
  TEMPLATE 
    "What is your favorite fruit?"
    >>someVariable
  /TEMPLATE
  TEMPLATE 
    "What is your hobby?"
    >>someVariable
  /TEMPLATE
  TEMPLATE "The value of 'someVariable' is ${someVariable}"
/DIALOG

RUN varTest
```
</UpilBot>
