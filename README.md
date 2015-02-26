# generator-deslight

> A [Yeoman](http://yeoman.io) generator for lightning fast web application development

## Getting Started

### What is Yeoman?

Yeoman scaffolds your projects using code generators.

#### Installing Yeoman

To install yeoman:

```bash
npm install -g yo
```

### Installing generator-deslight

To install this yeoman generator:

```bash
npm install -g generator-deslight
```

### Using the generator

Finally, initiate the generator:

Make sure the working directory is the same as your project, and execute:

```bash
yo deslight
```

Now you can run `gulp` to start the project!


### Using subgenerators

Currently there are two subgenerators, both for react:

1. react-component
2. react-route

To run the react-route subgenerator, execute this command:

```bash
yo deslight:react-route
```

Then follow the prompts. This will create a route file, as well as modify the main.js file (using hooks).

## License
The MIT License (MIT)

Copyright (c) 2015 Desmond Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Updates

0.4: Added lots of prompts to the generator, as well as react subgenerators.

0.3: bug fixes

0.2: added sass

