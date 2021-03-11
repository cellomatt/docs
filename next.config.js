const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");

module.exports = withPlugins([
  withMdxEnhanced({
    layoutPath: "layouts/mdxLayout",
    defaultLayout: true,
    fileExtensions: ["mdx", "md"],
    remarkPlugins: [
      require("remark-autolink-headings"),
      require("remark-slug"),
    ],
    rehypePlugins: [],
    extendFrontMatter: {
      process: (mdxContent, frontMatter) => {
        return {
          id: makeIdFromPath(frontMatter.__resourcePath),
          wordCount: mdxContent.split(/\s+/g).length,
        };
      },
    },
  })({
    images: {
      domains: ["user-images.githubusercontent.com", "knock.app"],
    },
  }),
]);

function makeIdFromPath(resourcePath) {
  return resourcePath.replace(".mdx", "").replace("/index", "");
}
