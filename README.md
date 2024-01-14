# [RMS] Remember me service

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![build][build-badge]][build]
![next-version]
![mongodb-version]
[![codecov](https://codecov.io/github/aromko/remember-me-service/branch/main/graph/badge.svg?token=O57HHEVT8D)](https://codecov.io/github/aromko/remember-me-service)

<img width="608" alt="Bildschirmfoto 2024-01-14 um 14 40 47" src="https://github.com/aromko/remember-me-service/assets/77496890/9fb5e128-5cac-4daa-aaa7-8b48091094dd">
<img width="381" alt="Bildschirmfoto 2024-01-14 um 14 47 01" src="https://github.com/aromko/remember-me-service/assets/77496890/3f3d4f92-8e9b-4b73-9dd3-699f116e19c4">


The remind me service, RMS for short, contains a small web application that allows you to manage reminders. These reminders are sent via push messages to Telegram (in the future, other interfaces will also be connected).
<br/><br/>

### What can you use the RMS for?

Let your imagination run wild :smirk:

You can install the RMS e.g. on a server in your home network. Each user can then create reminders. These are then sent on the execution date by push message to your phone. Great or?
<br/><br/>

## Technologies

![Next.js](/docs/icons/9073320_nextjs_icon.png)
![MongoDB](/docs/icons/1012822_code_development_logo_mongodb_programming_icon.png)

The RMS uses the React framework [next.js](https://nextjs.org/docs).
The NoSQL-[MongoDB](https://www.mongodb.com/docs/) is used as database.
<br/><br/>

## Prerequisites

### 1. Create your telegram bot

In order to use the RMS with all his features you need to create a telegram bot. To create this bot follow the following guide [BotFather](https://core.telegram.org/bots#6-botfather).
<br/><br/>

### 2. Create your mongoDB

After creating your [mongoDB](https://www.mongodb.com/cloud/atlas/lp/try2-de?utm_source=google&utm_campaign=gs_emea_germany_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624524&adgroup=115749704783&gclid=Cj0KCQjw8amWBhCYARIsADqZJoUgHNa73lhAowO1QxTTUkIzLGEo52iHA4t5QUR1jCB8w4OqX7ow15UaAvh9EALw_wcB) database click under Deployment -> Database **Connect** -> Connect your application and copy the connection string.

Note:

- use the **shared Cluster** to have a free mongoDB
- don't forgot to replace the **password** and add your **database name** <br>
  mongodb+srv://admin:< password >@cluster0.6xnyv.mongodb.net/< databaseName >?retryWrites=true&w=majority
  <br/><br/>

### 3. .env.local

Create an .env.local in your folder and add the following variables:

- NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=< add the generated token from BotFather >

- MONGODB_URI=< add the customized mongoDB uri>
  <br/><br/>

## How to run locally?

```
pnpm install
pnpm run dev
```

Open the browser under **localhost:3000**
<br/><br/>

## How to run in productive environment?

```
pnpm run build (build the application for production usage)
pnpm run start (start a Next.js production server)
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aromko"><img src="https://avatars.githubusercontent.com/u/77496890?v=4?s=100" width="100px;" alt="Marcel Köhler"/><br /><sub><b>Marcel Köhler</b></sub></a><br /><a href="https://github.com/aromko/remember-me-service/commits?author=aromko" title="Code">💻</a> <a href="#design-aromko" title="Design">🎨</a> <a href="https://github.com/aromko/remember-me-service/commits?author=aromko" title="Documentation">📖</a> <a href="#maintenance-aromko" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<!-- LINKS + BADGES -->

[build]: https://github.com/aromko/remember-me-service/actions/workflows/main.yml
[build-badge]: https://github.com/aromko/remember-me-service/actions/workflows/main.yml/badge.svg
[next-badge]: https://img.shields.io/badge/--000000?logo=nextdotjs&logoColor=white&style=flat
[next-version]: https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/aromko/remember-me-service/main/package.json&query=$.dependencies.next&label=next
[mongodb-version]: https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/aromko/remember-me-service/main/package.json&query=$.dependencies.mongodb&label=mongodb
