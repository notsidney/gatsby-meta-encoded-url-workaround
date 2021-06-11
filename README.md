# Gatsby Meta Encoded URL Workaround

React has [a bug](https://github.com/facebook/react/issues/13838) that encodes
special characters, such as `&` → `&amp;`, in the `meta` tag.

This becomes problematic for Open Graph meta images with URLs that have query
strings.

## Example: LinkedIn link previews broken

The Prismic imgix server does not recognise the query string on the following
URL:

```
https://images.prismic.io/antlerco/44b963ba-2aee-4ecc-8d9d-3f377160e29a_Team+Off+Script+-+STO+-+high+res.jpg?auto=compress,format&amp;rect=0,0,2000,1333&amp;w=1200&amp;h=800
```

The query string specifies that the server should resize the image to be 1200px
wide. It appears that LinkedIn rejects images that are too large, returning
[“No image found” on the Post Inspector](https://www.linkedin.com/post-inspector/inspect/https:%2F%2F60af3d9847fcd3b07f984da3--antler-2019.netlify.app%2Fplatform%2F).

When LinkedIn does receive a 1200px wide image, it
[displays correctly on the Post Inspector](https://www.linkedin.com/post-inspector/inspect/https:%2F%2Fantler.co%2Fplatform%2F)
and on the LinkedIn feed.

## The workaround

This works around the issue in Gatsby using a
[custom html.js](https://www.gatsbyjs.com/docs/custom-html/):

1. Render the React components to static markup using ReactDOMServer.
2. Replace encoded characters in the static markup, such as `&amp;` → `&`.
3. Render the static markup using `dangerouslySetInnerHTML`.

### [Code example →](src/html.js)

[HTML output →](public/index.html#L20)
