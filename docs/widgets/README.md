# Vue Widgets

The Vue UPIL plugin comes with several built-in widgets. Some widgets are only available in form-mode based scripts (form mode and wizard mode).

## Date 

The `date` widget allows users to select a date from a calendar. To use it in your script, use a `TEMPLATE date` entity. The user's input is saved as a Javascript Date object in the UPIL state. 
<br/>
<br/>

<UpilBot>
```
DIALOG birthday
  TEMPLATE date
    {
      formText: "Birthdate",
      calendarType: "calendar"
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
      formText: "Birthdate",
      calendarType: "calendar"
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
      formText: "Birthdate",
      calendarType: "calendar"
    }
    "What is your birthday?"
    >>birthday
  /TEMPLATE
/DIALOG
RUN birthday
```
</WizardMode>

### Numeric mode
It also has a `numeric` mode, which uses selects instead of a calendar for inputting the date. There are several text overrides that can be used in `numeric` mode:

<br/>

These labels will continue showing after selecting a value:
* yearSelectLabel: The label for the year-select
* monthSelectLabel: The label for the month-select
* daySelectLabel: The label for the day-select

<br/>
<br/>

Placeholders disappear after a user selects a value:
* yearSelectPlaceholder: The placeholder for the year-select
* monthSelectPlaceholder: The placeholder for the month-select
* daySelectPlaceholder: The placeholder for the day-select

<br/>
<br/>

* unitYear: The unit that is shown to the right of the year-options inside of the select menu
* unitMonth: The unit that is shown to the right of the month-options inside of the select menu
* unitDay: The unit that is shown to the right of the day-options inside of the select menu
* unitSeparator: A seperator to be displayed between the year, month, and day select menus

<br/>

<UpilBot>
```
DIALOG birthday
  TEMPLATE date
    {
      formText: "Birthdate",
      calendarType: "numeric"
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
      formText: "Birthdate",
      calendarType: "numeric"
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
      formText: "Birthdate",
      calendarType: "numeric"
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

## Time-input

The `time-input` widget allows users to input a time. To use it in your script, use a `TEMPLATE time-input` entity.

The user's input is saved as an object with signature `{hours: Number, minutes: Number}` in the UPIL state. There are several label overrides that can be used as well:

<br/>
<br/>

* hoursSelectLabel: The label on the hours-dropdown select
* minutesSelectlabel: The label on the minutes-dropdown select
* unitHour: A unit that shows to the right of each hour in the select-menu
* unitMinute: A unit that shows to the right of each minute in the select-menu
* defaultNow: A boolean that defaults the widget's value to the current time

<br/>
<br/>

Additionally, `timeInputMin` and `timeInputMax` can be passed in to set inclusive minimum and maximum times that users can choose from. These expect an object with the same signature that is saved
by the time-input widget. This way the input of one time-input widget can be the min or max time used by another one.
<br/>
<br/>

<UpilBot withLocale>
```
DIALOG meetingTime
    TEMPLATE time-input
    {
      formText: "Meetings start time",
      timeInputMax: meetingsEnd,
      i18n: {
        ja: {
          formText: "ミーティング時間の開始",
          text: "ミーティング時間はいつから始まる？",
          hoursSelectLabel: "何時",
          unitHour: "時",
          minutesSelectlabel: "何分",
          unitMinute: "分"
        }
      }
    }
    "When do your meetings start?"
    >>meetingsStart
    /TEMPLATE
    TEMPLATE time-input
    {
      formText: "Meetings end time",
      timeInputMin: meetingsStart,
      i18n: {
        ja: {
          formText: "ミーティング時間のお終い",
          text: "ミーティング時間はいつまで続く？",
          hoursSelectLabel: "時間",
          unitHour: "時",
          minutesSelectlabel: "分",
          unitMinute: "分"
        }
      }
    }
    "When do your meetings end?"
    >>meetingsEnd
    /TEMPLATE
    TEMPLATE 
    {
      i18n: {
        ja: {
          text: "ミーティング時間が${meetingsStart}から${meetingsEnd}まではけっこう長いんでしょう～"
        }
      }
    }
    "From ${meetingsStart} to ${meetingsEnd} is a pretty long time don't you think?" 
    /TEMPLATE
  /DIALOG
  RUN meetingTime
```
</UpilBot>

<FormMode withLocale hideScript>
```
DIALOG meetingTime
    TEMPLATE time-input
    {
      formText: "Meetings start time",
      timeInputMax: meetingsEnd,
      i18n: {
        ja: {
          formText: "ミーティング時間の開始",
          text: "ミーティング時間はいつから始まる？",
          hoursSelectLabel: "何時",
          unitHour: "時",
          minutesSelectlabel: "何分",
          unitMinute: "分"
        }
      }
    }
    "When do your meetings start?"
    >>meetingsStart
    /TEMPLATE
    TEMPLATE time-input
    {
      formText: "Meetings end time",
      timeInputMin: meetingsStart,
      i18n: {
        ja: {
          formText: "ミーティング時間のお終い",
          text: "ミーティング時間はいつまで続く？",
          hoursSelectLabel: "時間",
          unitHour: "時",
          minutesSelectlabel: "分",
          unitMinute: "分"
        }
      }
    }
    "When do your meetings end?"
    >>meetingsEnd
    /TEMPLATE
    TEMPLATE 
    {
      i18n: {
        ja: {
          text: "ミーティング時間が${meetingsStart}から${meetingsEnd}まではけっこう長いんでしょう～"
        }
      }
    }
    "From ${meetingsStart} to ${meetingsEnd} is a pretty long time don't you think?" 
    /TEMPLATE
  /DIALOG
  RUN meetingTime
```
</FormMode>

<WizardMode withLocale hideScript>
```
DIALOG meetingTime
    TEMPLATE time-input
    {
      formText: "Meetings start time",
      timeInputMax: meetingsEnd,
      i18n: {
        ja: {
          formText: "ミーティング時間の開始",
          text: "ミーティング時間はいつから始まる？",
          hoursSelectLabel: "何時",
          unitHour: "時",
          minutesSelectlabel: "何分",
          unitMinute: "分"
        }
      }
    }
    "When do your meetings start?"
    >>meetingsStart
    /TEMPLATE
    TEMPLATE time-input
    {
      formText: "Meetings end time",
      timeInputMin: meetingsStart,
      i18n: {
        ja: {
          formText: "ミーティング時間のお終い",
          text: "ミーティング時間はいつまで続く？",
          hoursSelectLabel: "時間",
          unitHour: "時",
          minutesSelectlabel: "分",
          unitMinute: "分"
        }
      }
    }
    "When do your meetings end?"
    >>meetingsEnd
    /TEMPLATE
    TEMPLATE 
    {
      i18n: {
        ja: {
          text: "ミーティング時間が${meetingsStart}から${meetingsEnd}まではけっこう長いんでしょう～"
        }
      }
    }
    "From ${meetingsStart} to ${meetingsEnd} is a pretty long time don't you think?" 
    /TEMPLATE
  /DIALOG
  RUN meetingTime
```
</WizardMode>

## Range

The `range` widget lets users choose a number between `min` and `max` values that the scriptwriter chooses. The scriptwriter can also add an optional `default` value, and choose an optional `unit` label.
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

<br/>

With default value:

<UpilBot>
```{7}
DIALOG minutesQuestion
  TEMPLATE range
    {
      formText: "Minutes",
      min: 1,
      max: 200,
      default: 100,
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
      min: 1,
      max: 200,
      default: 100,
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
      min: 1,
      max: 200,
      default: 100,
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

The `dynamic-list` widget lets users enter items into a list. The variable is stored as an array in the `UpilInstance`. The scriptwriter can also pass an optional `placeholder` label.
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