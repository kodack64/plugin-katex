Math typesetting plugin using KaTex for HonKit
==============

This plugin is forked from [gitbookIO `plugin-katex`]((https://github.com/GitbookIO/plugin-mathjax)) to compatible with several useful features. The plugin is tested in [HonKit](https://github.com/honkit/honkit).

## Usage

`package.json`:
```
{
  "devDependencies": {
    "gitbook-plugin-katex": "git+https://github.com/kodack64/plugin-katex.git",
    "honkit": "^3.6.20"
  },
}
```

`book.json`:
```
{
	"plugins": [
		"katex"
	],
}
```

then run `npm update` and `npx honkit serve`.

## Changes from original plugin

### Single-doller inline math

Single-doller inline math is enabled.
```
state1: $\ket{+}=(\ket{0}+\ket{1})/\sqrt{2}$.
state2: $$\ket{-}=(\ket{0}-\ket{1})/\sqrt{2}$$.
```

Note that block math needs double dollers.

### KaTeX is updated

`package.json` and contents in `static` folder are updated to katex 0.13.13. We can use recent features such as `\ket` macro or user-custom macro `\def`.

```
Math block:
$$
\def\dket#1{| {#1} \rangle \rangle}
\dket{\rho} = \ket{a}\bra{b}
$$
```

### Global macros

Since each function call of `katex.renderToString` is independent, we cannot share the defined macro between different math blocks. We can supply user-defined macros to global markdown files from `book.json` as follows.


```
{
	"pluginsConfig": {
		"katex": {
			"macros": {
                "\\rhomix": "\\mathinner{\\rho_{\\mathrm{mix}}}",
				"\\dbra": "\\mathinner{\\langle \\langle {#1}|}",
				"\\dket": "\\mathinner{|{#1} \\rangle \\rangle}"
			}
		}
	}
}
```

Then we can write
```
Pauli representation of maximally mixed state is $\dket{\rhomix}$.
```

Note that `pluginsConfig` in `book.json` is not automatically reloaded on live updates.


## Original usage

```
Inline math: $$\int_{-\infty}^\infty g(x) dx$$


Block math:

$$
\int_{-\infty}^\infty g(x) dx
$$

Or using the templating syntax:

{% math %}\int_{-\infty}^\infty g(x) dx{% endblock %}
```

## Reference

I've referred the following forked repositories and pull-requests.

- https://github.com/akuma/gitbook-plugin-katex-plus
- https://github.com/akuma/gitbook-plugin-katex-plus/pull/4
- https://github.com/gaoxiaosong/plugin-katex