"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var gatsby_1 = require("gatsby");
var Art_1 = require("../components/post/Art");
var renderArticles = function (articles) {
    return (react_1["default"].createElement(Art_1["default"], { articles: articles }));
};
var ArticleTemplate = function (_a) {
    var count = _a.count;
    return (react_1["default"].createElement(gatsby_1.StaticQuery, { query: gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      query AllPost {\n        allMarkdownRemark {\n          nodes {\n            html\n            id\n            htmlAst\n            frontmatter {\n              subTitle\n              title\n              cover {\n                childImageSharp {\n                  resize(width: 300) {\n                    src\n                  }\n                }\n              }\n            }\n            fields {\n              prefix\n            }\n          }\n        }\n      }\n      "], ["\n      query AllPost {\n        allMarkdownRemark {\n          nodes {\n            html\n            id\n            htmlAst\n            frontmatter {\n              subTitle\n              title\n              cover {\n                childImageSharp {\n                  resize(width: 300) {\n                    src\n                  }\n                }\n              }\n            }\n            fields {\n              prefix\n            }\n          }\n        }\n      }\n      "]))), render: function (data) {
            var articles = [];
            var nodes = data.allMarkdownRemark.nodes;
            nodes.map(function (el) {
                articles.push({
                    id: el.id,
                    title: el.frontmatter.title,
                    content: el.html,
                    date: el.fields.prefix,
                    image: el.frontmatter.title
                });
            });
            if (count) {
                return renderArticles(count > 0
                    ? articles.slice(0, count < articles.length ? count : articles.length)
                    : articles);
            }
            else {
                return renderArticles(articles);
            }
        } }));
};
exports["default"] = ArticleTemplate;
var templateObject_1;
