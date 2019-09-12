# UPIL Language

UPIL has several high-level entities to allow you to interact with a user. UPIL also includes other concepts for describing high-level business-logic including conditional logic, loading data from external sources, and external actions.

## User-Interaction

User interaction is performed using three main entities: `TEMPLATE`, `SELECT`, and `MULTI_SELECT`. All three entities can save user input to a variable with the `<<myVariable` syntax. This allows the user input to be referenced and used later on in the scenario.

### Template
A `TEMPLATE` entity is for displaying text to a user. `TEMPLATE`s can also request a user's input.

Example `TEMPLATE` for greeting the user with the text "Hi there!":

```
TEMPLATE
  "Hi there!"
/TEMPLATE
```

Example `TEMPLATE` with user input request saved to the variable `name`:
```{3}
TEMPLATE
  "What is your name?"
  >>name
/TEMPLATE
```


### SELECT
A `SELECT` is used to request the user to select a single choice from a list of choices. It requires the user input to be saved to a variable.
```
SELECT
 "Please choose your favorite color"
  -("Color red", red)
  -("Color blue", blue)
  -("Color green", green)
  >>color
/SELECT
```

### MULTI_SELECT
A `MULTI_SELECT` is similar to a `SELECT`, only it allows users to select more than one choice from a list
```
MULTI_SELECT
 "Please choose all of your favorite colors"
  -("Color red", red)
  -("Color blue", blue)
  -("Color green", green)
  >>colors
/SELECT
```

## Logic control

### DIALOG

### IF/ELIF/ELSE

### RUN

## Application communication

### EXTERNAL

### ACTION

### Labels

