# Vue Widgets

The Vue UPIL plugin comes with several built-in widgets. Some widgets are only available in form-mode based scripts (form mode and wizard mode).

## Date 

The `date` widget allows users to select a date from a calendar. To use it in your script, use a `TEMPLATE date` entity.
<br/>
<br/>

<UpilBot>
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
</UpilBot>

<FormMode hideScript>
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

The `date-time` widget allows users to select a date from a calendar, and a time on that date. To use it in your script, use a `TEMPLATE date-time` entity.
<br/>
<br/>

<UpilBot>
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
</UpilBot>

<FormMode hideScript>
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

The `range` widget lets users choose a number between `min` and `max` values that the scriptwriter chooses. The scriptwriter can also choose an optional `unit` label.
<br/>
<br/>

<UpilBot>
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
</UpilBot>

<FormMode hideScript>
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

## Dynamic-list

The `dynamic-list` widget lets users enter items into a list. The variable is stored as an array in the `UpilInstance`.
<br/>
<br/>

<UpilBot>
```
DIALOG jobsSearch
  TEMPLATE dynamic-list
  {
    formText: "Job Openings",
    i18n: {
      ja: {
        formText: "募集中の職種",
        text: "今回募集する職種を教えてください。",
        placeholder: "カンマで区切ると選択肢が出来上がります"
      }
    }
  }
  "Please list your available job types"
  >>jobTypes
  /TEMPLATE
  TEMPLATE 
  {
    i18n: {
      ja: {
        text: "${jobTypes}を見つけたらいいね！"
      }
    }
  }
  "I hope you find success in your search for ${jobTypes}!"
  /TEMPLATE
/DIALOG
RUN jobsSearch
```
</UpilBot>

<FormMode hideScript>
```
DIALOG jobsSearch
  TEMPLATE dynamic-list
  {
    formText: "Job Openings",
    i18n: {
      ja: {
        formText: "募集中の職種",
        text: "今回募集する職種を教えてください。",
        placeholder: "カンマで区切ると選択肢が出来上がります"
      }
    }
  }
  "Please list your available job types"
  >>jobTypes
  /TEMPLATE
  TEMPLATE 
  {
    i18n: {
      ja: {
        text: "${jobTypes}を見つけたらいいね！"
      }
    }
  }
  "I hope you find success in your search for ${jobTypes}!"
  /TEMPLATE
/DIALOG
RUN jobsSearch
```
</FormMode>

<WizardMode hideScript>
```
DIALOG jobsSearch
  TEMPLATE dynamic-list
  {
    formText: "Job Openings",
    i18n: {
      ja: {
        formText: "募集中の職種",
        text: "今回募集する職種を教えてください。",
        placeholder: "カンマで区切ると選択肢が出来上がります"
      }
    }
  }
  "Please list your available job types"
  >>jobTypes
  /TEMPLATE
  TEMPLATE 
  {
    i18n: {
      ja: {
        text: "${jobTypes}を見つけたらいいね！"
      }
    }
  }
  "I hope you find success in your search for ${jobTypes}!"
  /TEMPLATE
/DIALOG
RUN jobsSearch
```
</WizardMode>