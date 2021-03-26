# Twilio Flex Supervisor Whisper Plugin

This plugin enables supervisors to not only listen in to calls, but optionally also speak to the agent without the customer noticing.

![Supervisor whisper extension screenshot](/pluginscreenshot.png?raw=true)

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## Requirements

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the Flex Plugin extension and the Flex Serverless extension for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
twilio plugins:install @twilio-labs/plugin-serverless
```

## Deployment

This repo consists of two parts:

- a Twilio Function, which modifies the conference to enable/disable whispering
- a Twilio Flex Plugin to give supervisors an interface to trigger the function

### Deploy the Twilio Function

1. Rename `/functions/.env.example` to `.env` and add your Twilio AccountSid and AuthToken
2. Run `twilio serverless:deploy` in your console
3. Keep the function URI (looks like https://functions-12345.twil.io/coachControl)

### Deploy the Twilio Flex Plugin

1. Rename `/plugin-coaching/.env.example` to `.env` and set `COACHING_FUNCTION` to the URI copied from step 3 of deploying your Twilio Function
2. Run `twilio flex:plugins:deploy --changelog "Initial release"` and follow the instructions to release the plugin

## Disclaimer

This plugin was written as an example to quickstart other developers with their own project. This plugin has not been tested extensively, especially not in a production environment, and should be treated as such. No guarantees are given, no liability is assumed.
