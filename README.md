# Introduction

Arbalet is a stylus library that provides various mixins. The main purpose is to reduce typing by using the magic of transparent mixins. It also provides utility mixins to make things easier such as debugging or built-in components

## Installation

```bash
npm i -D arbalet
```

## Utils

Note that when a mixin has `arguments` in it, you can put any args in the mixin although it's not explicitly written between the parentheses

### `remixicon() | boxicon()`

Imports Remix Icons/Box Icons

source code:

```stylus
remixicon()
    @import url('https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css')

boxicon()
    @import url('https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css')
```

NOTE: this is not the most optimized method, for production consider adding the cdn with the <link> tag

### `print(thing) | log(thing)`

Prints in the console whatever value you passed to it

source code:

```stylus
print(thing)
    p(thing)

log(thing)
    p(thing)
```

### `debug()`

Outlines all elements in black and replace the background to a semi-transparent green

This is useful to debug CSS to see where HTML tags are, how they behave together etc

### `debugLive()`

To use this, you have to add a script, which is not available for now. It allows you to toggle the debug function on the HTML page directly

### `importfont(names, weights, type)`

### `reset()`

Arbalet's reset for top-level CSS. Arbalet uses `@layer reset` for reset mixin

### `focus()`

Compose your focus state, it will be applied to `a` tag, tabindex, `input`, `textarea`, `button`. It uses `:focus-visible` pseudo-class

```stylus
// Source
focus()
    a:focus-visible,
    [tabindex]:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    button:focus-visible
        outline 0
        {block}

// Example
focus()
    outline 2px solid #0048ff
    outline-offset .15em
```

### `scrollbar(params)`

Custom your scrollbar. Only works for Chrome for now

```stylus
{size} // width / height of the scrollbar
{track} // background color of the track
{thumb} // background color of the thumb
{hover} // background color of the thumb when hover. Defaults to darken(thumb, 10%)
{active} // background color of the thumb when active. Defaults to darken(thumb, 20%)


// Example
scrollbar({
    size: 4px,
    thumb: #999,
    margin: 3px
})
```

### `selection(background, text-color)`

Sets the selection background & text color

```stylus
// Example
selection(#0048ff, white)
```

### `clr()`

Shorthand for `color` property

```stylus
.myelement
    clr #0048ff
```

### `bgclr()`

Shorthand for `background-color` property

```stylus
// Example
.myelement
    bgclr #e7e7e7
```

### `bgimg()`

Shorthand for `background-image` property

```stylus
.myelement
    bgimg url("https://lapatrie.org/myimage.png")
```

### `JAR`

## Components

Arbalet uses `@layer components` for components mixins

### `cta()`

Creates a default styling for CTAs based on BEM naming convention

### `form()`

Creates a default styling form & form components based on BEM naming convention

## Layouts

### Width and height

w() for width, maxw() for max-width, minw() for min-width. Same thing for height, h(), maxh(), minh()

Use case

```stylus
// It defaults to % if no unit provided
body
    w 100 // 100%
    maxw calc(100% - 2rem)
    minh 20rem // 20rem
```

### Position

Use case

```stylus
.myelement
    pos rel // relative
    pos abs // absolute
    pos fixed // other ones
```

### Flex

`dflex()` is one of the most complete and useful mixins because it allows you to chain the arguments in whatever order you want. Arbalet is figuring out which arg is what and does the job for you. When you call it with or without argument, it automatically writes `display: flex;`

#### justify-content

```stylus
jcs // justify-content: start;
jcc // justify-content: center;
jce // justify-content: end;

sb // justify-content: space-between;

// Example
.myelement
    dflex sb
```

#### align-items

```stylus
ais // align-items: start;
aic // align-items: center;
aie // align-items: end;

// Example
.myelement
    dflex aic
```

#### flex-wrap

```stylus
w | wrap // flex-wrap: wrap;
wrev | wraprev // flex-wrap: wrap-reverse;
now | nowrap // flex-wrap: nowrap

// Example
.myelement
    dflex now
```

#### flex-direction

```stylus
col // flex-direction: column
colrev // flex-direction: column-reverse
row // flex-direction: row;
rowrev // flex-direction: row-reverse;

// Example
.myelement
    dflex colrev
```

#### gap

`gap` is the only unit-typed argument, so just add it to the arguments list

```stylus
.myelement
    dflex 2rem
```

#### flex-grow / flex-shrink

This one modify the direct children from the container where you call it

The source code looks like this:

```stylus
& > *
    flex-grow 1

```

```stylus
grow // flex-grow: 1;
shrink // flex-shrink: 1;

// Example
.myelement
    dflex grow

// compiles to:
.myelement > *
    flex-grow: 1;

```

### Grid

`dgrid()` is like the `dflex()` one, you can also chain the arguments in whatever order you want

#### align-items / align-content

```stylus
ais // align-items: start;
aic // align-items: center;
aie // align-items: end;

acs // align-content: start;
acc // align-content: center;
ace // align-content: end;

// Example
.myelement
    dgrid aic
```

#### place-content / place-items

```stylus
pcs // place-content: start;
pcc // place-content: center;
pce // place-content: end;

pis // place-items: start;
pic // place-items: center;
pie // place-items: end;

// Example
.myelement
    dgrid pcc
```

#### gap

`gap` is the only unit-typed argument, so just add it to the arguments list

```stylus
.myelement
    dgrid 2rem
```

### grid templates & areas

#### grid-template-columns / grid-template-rows

```stylus
// Source code
gtc()
    grid-template-columns arguments

gtr()
    grid-template-rows arguments

// Example
.myelement
    dgrid()
    gtr repeat(2, 1fr)

```

### grid areas

```stylus
// Source code
gta()
    grid-template-areas arguments

ga()
    grid-area arguments

// Example
.myelement
    dgrid 2rem
    gta "a b" "a c"
```

### self

`self()` is a special mixin, with a little different syntax but works the same

```stylus
as // align-self: start;
ac // align-self: center;
ae // align-self: end;

js // justify-self: start;
jc // justify-self: center;
je // justify-self: end;

start // place-self: start;
center // place-self: center;
end // place-self: end;
```

### block & none

Just call the dblock() and dnone() mixins

```stylus
// Example
.myelement
    dnone()
    &.visible
        dblock()
```

### border-radius

How many times have you tried to change the two top border radiuses with logical properties on first try? Now, use Arbalet's border-radius mixins

```stylus
// Global
rad()
    border-radius arguments

// Top left, top right
radtop()
    border-start-start-radius arguments
    border-start-end-radius arguments

// Bottom left, bottom right
radbottom()
    border-end-start-radius arguments
    border-end-end-radius arguments

// Top left, bottom left
radleft()
    border-start-start-radius arguments
    border-end-start-radius arguments

// Top right, bottom right
radright()
    border-start-end-radius arguments
    border-end-end-radius arguments
```

### lineclamp(lines)

Line clamp is no longer a nightmare. Use `lineclamp()` mixin

```stylus
// Example
.myelement
    lineclamp 5

// compiles to:
.myelement
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
```

### aspect-ratio

```stylus
ratio()
    aspect-ratio arguments
```

## Spacing

Arbalet encourages the use of logical properties, so it's all about "inline" or "block" according to the X and Y axis

### Margins & Paddings

```stylus
//// Margins
// block
mb()
    margin-block arguments

mbs()
    margin-block-start arguments

mbe()
    margin-block-end arguments


// inline
mi()
    margin-inline arguments

mis()
    margin-inline-start arguments

mie()
    margin-inline-end arguments

//// Paddings
// block
pb()
    padding-block arguments

pbs()
    padding-block-start arguments

pbe()
    padding-block-end arguments


// inline
pi()
    padding-inline arguments

pis()
    padding-inline-start arguments

pie()
    padding-inline-end arguments

```

## Typography

### txt | text

```stylus
i | italic // font-style: italic;

uc | uppercase // text-transform: uppercase;
lc | lowercase // text-transform: lowercase;
cc | capitalize // text-transform: capitalize;

u | underline // text-decoration: underline;
nodeco // text-decoration: none;

now | nowrap // white-space: nowrap;

left // text-align: left;
center // text-align: center;
right // text-align: right;



```

## Custom variables

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

// GPL v3 license??
[MIT](https://choosealicense.com/licenses/mit/)
