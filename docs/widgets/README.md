# Vue Widgets

The Vue UPIL plugin comes with several built-in widgets. Some widgets are only available in form-mode based scripts (form mode and wizard mode).

## Date 

::: warning
The `date` widget is currently only available in form-mode based scripts
:::

The `date` widget allows users to select a date from a calendar. To use it in your script, use a `TEMPLATE date` entity.
<br/>
<br/>

<FormMode>
```
DIALOG birthday
  TEMPLATE date
    {
      formText: "Birthdate"
    }
    "What is your birthday?"
    >>birthday
  /TEMPLATE
/DIALOG
RUN birthday
```
</FormMode>

<WizardMode hideScript>
```
DIALOG birthday
  TEMPLATE date
    {
      formText: "Birthdate"
    }
    "What is your birthday?"
    >>birthday
  /TEMPLATE
/DIALOG
RUN birthday
```
</WizardMode>

## Date-time

::: warning
The `date-time` widget is currently only available in form-mode based scripts
:::

The `date-time` widget allows users to select a date from a calendar, and a time on that date. To use it in your script, use a `TEMPLATE date-time` entity.
<br/>
<br/>

<FormMode>
```
DIALOG birthday
  TEMPLATE date-time
    {
      formText: "Birthday party"
    }
    "When is your birthday party?"
    >>birthday
  /TEMPLATE
/DIALOG
RUN birthday
```
</FormMode>

<WizardMode hideScript>
```
DIALOG birthday
  TEMPLATE date-time
    {
      formText: "Birthday party"
    }
    "When is your birthday party?"
    >>birthday
  /TEMPLATE
/DIALOG
RUN birthday
```
</WizardMode>

## Range

::: warning
The `range` widget is currently only available in form-mode based scripts
:::

The `range` widget lets users choose a number between `min` and `max` values that the scriptwriter chooses. The scriptwriter can also choose an optional `unit` label.
<br/>
<br/>

<FormMode>
```
DIALOG minutesQuestion
  TEMPLATE range
    {
      formText: "Minutes",
      min: 10,
      max: 20,
      unit: "分"
    }
  "How long did it take?"
  >>minutes
  /TEMPLATE
/DIALOG
RUN minutesQuestion
```
</FormMode>

<WizardMode hideScript>
```
DIALOG minutesQuestion
  TEMPLATE range
    {
      formText: "Minutes",
      min: 10,
      max: 20,
      unit: "分"
    }
  "How long did it take?"
  >>minutes
  /TEMPLATE
/DIALOG
RUN minutesQuestion
```
</WizardMode>