# Projects Blamer

This project will launch a process thar will get info from a series of projects and will trigger a notification to Slack w/ a report of the status of those projects

## `npm run notify`

This script launches a report on slack w/ the statuses of the projects
To launch this script the following ENV variables should be defined

```
PROMOTION=<%PROMOTION%>
WEBHOOK_URL=<%SLACK_WEBHOOK_URL%>
```

- **PROMOTION** → A value indicating the promotion to select the proper json in `data/projects` (Ex: 2016-02, 2017-04, ...)
- **WEBHOOK_URL** → A WebHook URL that can be got from `https://<%SLACK-CHANNEL%>.slack.com/apps/manage/custom-integrations`

## Data model

Data in `data/projects` folder should follow this structure

```
[
  {
    project: String,
    repo: String,
    demo: String,
    student: String,
    icon: Icon
  }
]
```
