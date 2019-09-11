# UPIL Language

UPIL has several high-level entities to allow you to interact with a user. UPIL also includes other concepts for describing high-level business-logic including conditional logic, loading data from external sources, and external actions.

## User-Interaction

User interaction is performed using three main entities: `TEMPLATE`, `SELECT`, and `MULTI_SELECT`. All three entities send text to a user. A template 

### Template
A `TEMPLATE` entity is for displaying text to a user. `TEMPLATE`s can also request a user's input.

Example `TEMPLATE` for greeting the user with the text "Hi there!":
```
TEMPLATE
  "Hi there!"
/TEMPLATE
```

Example `TEMPLATE` with user input request:
```{3}
TEMPLATE
  "What is your name?"
  >>name
/TEMPLATE
```

## Logic control

### DIALOG

### IF/ELIF/ELSE

### RUN

## Application communication

### EXTERNAL

### ACTION

### Labels

