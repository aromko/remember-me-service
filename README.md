# [RMS] Remember me service

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
- don't forgot to replace the **password** and add your  **database name** <br>
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