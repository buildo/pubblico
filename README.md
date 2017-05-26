# Pubblico: publish a markdown file as Medium post from the command line

---

*an easy way to post on Medium with markdown files*

![image](https://cloud.githubusercontent.com/assets/3280300/25977271/c3982aae-36ba-11e7-915b-1b499f02691d.png)


## getting started

`pubblico` requires `node>=7`

you can install it globally
```sh
yarn global add pubblico
//or
npm i -g pubblico
```

or in a project
```sh
yarn add pubblico
//or
npm i --save-dev pubblico
```

## usage

```sh
pubblico --src [PATH_TO_MARKDOWN_FILE] --medium-api-token [YOUR_TOKEN] --title [TITLE] --tags [TAGS] --publication [PUBLICATION]
```

### options

You can pass options inline or storing them in a `.pubblicorc` json file, located in the folder where you are calling the command

- `src` specify path of the file you want to post. REQUIRED
- `mediumApiToken` [get it here](https://medium.com/me/settings)). REQUIRED
- `publish` The post will be submitted as draft. You can specify `-publish` to post it as unlisted.
- `title` the title of the post, it defaults to `'Pubblico'`. NOT REQUIRED BUT RECOMMENDED
- `tags` comma separated tags, default to 'test, pubblico'. NOT REQUIRED BUT RECOMMENDED
- `personal` if you specify a publication in the `.pubblicorc`, `pubblico` will try to post in that publication, use `-personal` to override
- `publication` if you don't specify a publication in the config, or if you want to override it, use `-publication publication-name`

## disclaimer
it doesn't basically handle errors at the moment, so just be nice :)
