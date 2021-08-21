var katex = require("katex");

module.exports = {
    book: {
        assets: "./static",
        js: [],
        css: [
            "katex.min.css"
        ]
    },
    ebook: {
        assets: "./static",
        css: [
            "katex.min.css"
        ]
    },
    blocks: {
        math: {
            shortcuts: {
                parsers: ["markdown", "asciidoc", "restructuredtext"],
                start: "$$",
                end: "$$"
            },
            process: function(blk) {
                var tex = blk.body;
                let config = this.book.config.get('pluginsConfig.katex', {})
                let macros = config['macros'] || {}
                var isInline = !(tex[0] == "\n");
                var output = katex.renderToString(tex, {
                    displayMode: !isInline,
                    macros: macros
                });
                return output;
            }
        },
        math_inline: {
            shortcuts: {
                parsers: ['markdown', 'asciidoc', 'restructuredtext'],
                start: '$',
                end: '$'
            },
            process: function(blk) {
                var tex = blk.body;
                let config = this.book.config.get('pluginsConfig.katex', {})
                let macros = config['macros'] || {}
                var output = katex.renderToString(tex, {
                    displayMode: false,
                    macros: macros
                });
                return output;
            }
        }
    }
};