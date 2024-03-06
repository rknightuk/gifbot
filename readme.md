# GifBot

GitBot runs [@initech](https://beep.town/@initech) and [@greatscott](https://beep.town/@greatscott).

[Read the blog post](https://rknight.me/blog/building-a-mastodon-gif-bot).

## Installation

- Confirm you have node v18.9.0 (`nvm install 18.9.0`) - `nvm use` should set it to 18.9.0
- `npm i` to install everything
- `cp .env.example .env`
- Get a new API key from `{your mastodon instance}/settings/applications/new`
- Choose a bot key - this is a unique idenfier for your bot. For example, `officespace`
- Pop that as the value for `officespace_TOKEN` in `.env`
- Add your gifs to `./data/officespace_gifs`
- Run `node index.js officespace` to post a new toot