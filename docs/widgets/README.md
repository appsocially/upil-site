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