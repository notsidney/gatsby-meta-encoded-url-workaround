import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

export default function HTML(props) {
  const headComponents = (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {props.headComponents}
    </>
  );

  const headHtml = ReactDOMServer.renderToStaticMarkup(headComponents).replace(
    /&amp;/g,
    "&"
  );

  return (
    <html {...props.htmlAttributes}>
      <head dangerouslySetInnerHTML={{ __html: headHtml }} />
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
