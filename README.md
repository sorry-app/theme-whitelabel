# Theme - Whitelabel

> This the default theme used for [Sorry](http://www.sorryapp.com) status page's. You can use this to make minor tweaks and ammendments, as a basis for your own theme, or as a learning resource.
>
> **For more details on theme development, read our [Theme documenation](http://docs.sorryapp.com/themes)**.

## Getting The Theme

1. <a href="https://github.com/sorry-app/theme-whitelabel/archive/master.zip">Download</a> the latest version
2. or clone the git repo: <code>git clone git@github.com:supporttime/theme-whitelabel.git</code>

## Manual Deployment

The simplest option if you don't wish to make any changes to the theme is to upload the [zip file found in the dist folder](dist/theme.zip) through your user interface of your Sorry account.

**If you make any changes you'll need to rezip your theme before you upload it, [as per the Sorry docs](http://docs.sorryapp.com/themes/getting-started/deploying-your-theme.html).**

## Automatic Deployment with Grunt

To make development and deployment of the theme even easier you can use the included Grunt deployment tasks.

These tasks take the themes source code, bundle it into a deployable zip and upload it to your status page through the Sorry API.

### Installing Grunt

From the command line:

1. Navigate to the root of this downloaded theme project
2. Run `npm install`. 

npm will look at [package.json](package.json) and automatically install the necessary local dependencies listed there.

**Unfamiliar with `npm`? Don't have node installed?** That's a-okay. npm stands for [node packaged modules](http://npmjs.org/) and is a way to manage development dependencies through node.js. [Download and install node.js](http://nodejs.org/download/) before proceeding.

### Authenticating with Sorry

We need somewhere to keep your Sorry login credentials. In the root of your project create a file called `sorry.json` which contains your access token - don't worry, this will NOT be commited to your repo as we've included it in `.gitignore`.

```json
{
  "accessToken": "your access tokens go here."
}
```

### Deploying Your Theme

Now we have your authentication details in place we should be ready to deploy the theme. **However, as per our docs [we suggest you create a demo page for testing your theme](http://docs.sorryapp.com/themes/getting-started/deploying-your-theme.html), rather than deploying to your live page.**

When you're ready to deploy, use the `deploy` task from the command line:

```
grunt deploy --sorry-page="YOUR PAGE ID HERE"
```

*You can find your page ID in the address bar of your Sorry account. A page URL of `http://app.sorryapp.com/pages/my-page` suggests the page ID is `my-page`.*

### Other Grunt Tasks

#### Watch - `grunt watch --sorry-page="YOUR PAGE ID HERE"`

This is a convenience method for watching all the core HTML, CSS and JS assets in your theme, whenever you make a change to these files grunt will automaticly bundle and deploy your theme as above.

#### Release - `grunt release <:patch | :minor | :major>`

Bumps the [version number](#versioning) and creates a new git tag for the theme. You can append the release command with patch, minor or major depending on the version number increment you wish to make.

*You don't need to use the release task, it can just be handy to organise released versions of the theme.*

## Language Support

This theme supports multiple languages (`English (en)`, `Danish (da)`, `French (fr)` and `Swedish (sv)`) using various [locale files](https://docs.sorryapp.com/themes/getting-started/the-locales-folder.html) - to contribute your own translation make a copy of the `en.json` file and rename it with the correct [ISO 639-2 two character code](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes).

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

Once you are happy that your contribution is ready for production please send us a pull request, at which point we'll review the code and merge it in.

## Versioning

For transparency and insight into our release cycle, and for striving to maintain backward compatibility, This project will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit <http://semver.org/>.

## Authors & Contributors

**Robert Rawlins**

+ <http://twitter.com/sirrawlins>
+ <https://github.com/SirRawlins>

**Robin Geall**

+ <http://twitter.com/robingeall>

## Copyright

&copy; Copyright 2014 - See [LICENSE](LICENSE) for details.