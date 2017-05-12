# Pubblico: publish a markdown file as Medium post from the command line

---

*an easy way to post on Medium with markdown files*

![image](https://cloud.githubusercontent.com/assets/3280300/25977271/c3982aae-36ba-11e7-915b-1b499f02691d.png)


## getting started

`pubblico` requires `node>=7`

```sh
git clone git@github.com:francescogior/pubblico.git && cd pubblico`
```

```sh
cp config.example.json config.json
```

and edit the fields `mediumApiToken` ([get it here](https://medium.com/me/settings)) and (optionally) `publication` (use name displayed in the url after medium.com/)

## usage

```sh
yarn run pubblico
```

### options
- `src` specify path of the file you want to post. If not specified, this README will be posted
- `publish` The post will be submitted as draft. You can specify `-publish` to post it as unlisted.
- `title` the title of the post, it defaults to `'Pubblico'`
- `tags` comma separated tags
- `personal` if you specify a publication in the config, `pubblico` will try to post in that publication, use `-personal` to override
- `publication` if you don't specify a publication in the config, or if you want to override it, use `-publication publication-name`


```sh
yarn run pubblico -- -src ~/path/to/srcFile -title 'My first Medium Post from command line' -tags 'Test, pubblico' -publish
```

## disclaimer
it doesn't basically handle errors at the moment, so just be nice :)