# Introduction

Arbalet is a stylus library that provides various mixins. The main purpose is to reduce typing by using the magic of transparent mixins. It also provides utility mixins to make things easier such as debugging or built-in components

## Installation

```bash
npm i -D arbalet
```

# Utils

Note that when a mixin has `arguments` in it, you can put any args in the mixin although it's not explicitly written between the parentheses in the source code

## Icons

### `remixicon()` | `boxicon()`

Imports Remix Icons/Box Icons

source code:

```stylus
remixicon()
    @import url('https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css')

boxicon()
    @import url('https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css')
```

NOTE: this is not the most optimized method, for production consider adding the cdn with the `<link>` tag instead

## Debug

### `print(thing)` | `log(thing)`

Prints in the console whatever value you passed to it

source code:

```stylus
@import 'arbalet'

print(thing)
    p(thing)

log(thing)
    p(thing)
```

### `debug()`

Outlines all elements in black and replace the background to a semi-transparent green. This is useful to debug CSS to see where HTML tags are, how they behave together etc

### `debugLive`

To use this, you have to add a script to your top-level file app (index.tsx in React for example). It allows you to toggle the debug function on the HTML page directly, and also when you press <kbd>CTRL</kbd>, you will see the current element in red, the parent element in orange, and the siblings in blue.

```jsx
import "arbalet/scripts/debugLive";
```

To enable it, press <kbd>CTRL</kbd>+<kbd>\*</kbd>. You can also call the mixin `debugLive()` to show a toggle button. It can takes arguments, to position the button

```stylus
debugLive(bottom left) // defaults to bottom right
```

### `importfont(names, weights, type)`

Imports a font from Google Fonts

```stylus
@import 'arbalet'

// Example
importfont('Readex Pro', 400..700)
```

## Reset & globals

### `reset()`

Arbalet's reset for global CSS, just call the mixin in your global stylus file. Arbalet uses `@layer reset` for reset mixin

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
@import 'arbalet'

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
{margin} // optional, it adds space between the thumb and the track

// Example
scrollbar({
    size: 15px,
    thumb: #999,
    margin: 3px
})
```

### `selection(background, text-color)`

Sets the selection background & text color

```stylus
@import 'arbalet'

selection(#0048ff, white)
```

## Colors, backgrounds

### `clr()`

Shorthand for `color` property

```stylus
@import 'arbalet'

.myelement
    clr #0048ff
```

### `bgclr()`

Shorthand for `background-color` property

```stylus
@import 'arbalet'

.myelement
    bgclr #e7e7e7
```

### `bgimg()`

Shorthand for `background-image` property

```stylus
@import 'arbalet'

.myelement
    bgimg url("https://lapatrie.org/myimage.png")
```

### `lgradient()`

Shorthand for `background-image: linear-gradient(arguments)`

```stylus
@import 'arbalet'

.myelement
    lgradient to right, #0048ff, #ae00ff
```

### `rgradient()`

Shorthand for `background-image: radial-gradient(arguments)`

```stylus
@import 'arbalet'

.myelement
    rgradient circle, #0048ff, #ae00ff
```

### `textgradient()`

Adds a gradient to a text. Only works with linear gradient for now.

```stylus
@import 'arbalet'

.myelement
    textgradient to right, #0048ff, #ae00ff
```

### `bg()`

Shorthand for `background` property

```stylus
@import 'arbalet'

.myelement
    bg #232425
```

### `bgblur(value)`

Shorthand for `backdrop-filter: blur(value)` property. Now works on Firefox as well

```stylus
@import 'arbalet'

.myelement
    bgblur .5rem
```

### `bgclip()`

Shorthand for `background-clip` property.

```stylus
@import 'arbalet'

.myelement
    bgclip text
```

# Components

Arbalet uses `@layer components` for components mixins

### `cta()`

Creates a default styling for CTAs based on BEM naming convention

### `form()`

Creates a default styling form & form components based on BEM naming convention

# Layouts

## Width and height

w() for width, maxw() for max-width, minw() for min-width. Same thing for height, h(), maxh(), minh()

```stylus
@import 'arbalet'

// Defaults to % if no unit provided
body
    w 100 // 100%
    maxw calc(100% - 2rem) // no compilation
    minh 20rem // 20rem
```

### Position

```stylus
rel // relative
abs // absolute

// Example
@import 'arbalet'

.myelement
    pos rel // relative
```

### Flex

`dflex()` is one of the most complete and useful mixins because it allows you to chain arguments in whatever order you want. Arbalet is figuring out which arg is what and does the job for you. When you call it with or without argument, it automatically writes `display: flex;`

#### justify-content

```stylus
jcs // justify-content: start;
jcc // justify-content: center;
jce // justify-content: end;
sb // justify-content: space-between;

// Example
@import 'arbalet'

.myelement
    dflex sb // display: flex; justify-content: space-between
```

#### align-items

```stylus
ais // align-items: start;
aic // align-items: center;
aie // align-items: end;

// Example
@import 'arbalet'

.myelement
    dflex aic
```

#### flex-wrap

```stylus
w | wrap // flex-wrap: wrap;
wrev | wraprev // flex-wrap: wrap-reverse;
now | nowrap // flex-wrap: nowrap

// Example
@import 'arbalet'

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
@import 'arbalet'

.myelement
    dflex colrev
```

#### gap

`gap` is the only unit-typed argument, so just add it to the arguments list

```stylus
@import 'arbalet'

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
@import 'arbalet'

.myelement
    dflex grow

// compiles to:
.myelement > *
    flex-grow: 1;

```

Here is a complete example (yes, it saves so much keystrokes)

```stylus
// with arbalet
.myelement
    dflex aic 2rem w grow

// compiles to:
.myelement
    display flex
    align-items center
    gap 2rem
    flex-wrap wrap
    & > *
        flex-grow 1
```

### Grid

`dgrid()` is like the `dflex()` one, you can also chain arguments in whatever order you want

#### align-items / align-content

```stylus
ais // align-items: start;
aic // align-items: center;
aie // align-items: end;

acs // align-content: start;
acc // align-content: center;
ace // align-content: end;

// Example
@import 'arbalet'

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
@import 'arbalet'

.myelement
    dgrid pcc
```

#### gap

`gap` is the only unit-typed argument, so just add it to the arguments list

```stylus
@import 'arbalet'

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
@import 'arbalet'

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
@import 'arbalet'

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
@import 'arbalet'

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
@import 'arbalet'

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

### fs

```stylus
// Source
fs()
    font-size arguments

// Example
@import 'arbalet'

.myelement
    fs 1.5rem
```

### fclamp

```stylus
// Source
fclamp()
    font-size clamp(unquote(join(',', arguments)))

// Example
@import 'arbalet'

.myelement
    fclamp 1rem 12vw 1.5rem
```

### fw

```stylus
// Source
fw()
    font-weight arguments

// Example
@import 'arbalet'

.myelement
    fw 700
```

### ffam

```stylus
// Source
ffam()
    font-family arguments

// Example
@import 'arbalet'

.myelement
    ffam 'Readex Pro', sans-serif
```

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

1rem // if unit, font-size
#0048ff // if color, clr (color)
"Readex Pro" // if string, font-family
```

### underline(from)

This is probably not what you expect, it creates an underline animation when hovered, by using `::before` pseudo-element

```stylus
// Example
@import 'arbalet'

.link
    underline(left)
```

## Custom variables

You can directly access to the `variables.styl` file to implement your variables. Some variables are already defaulted (Soon)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

## TODO

- [ ] word-wrap mixin
- [ ] overflow mixins
- [ ] better folder structure/file naming
- [ ] fade-in/out opacity/pointer-events mixin?
