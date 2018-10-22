# Developing Kepler.gl

* [Development Setup](#setup)
* [Running Tests](#tests)
* [Coding Rules](#rules)
* [Commit Message Guidelines](#commits)
* [Writing Documentation](#documentation)

## <a name="setup"> Development Setup

This document describes how to set up your development environment to build and test Kepler.gl, and
explains the basic mechanics of using `git`, `node`, `yarn`.

### Installing Dependencies

Before you can build Kepler.gl, you must install and configure the following dependencies on your
machine:

* [Git](http://git-scm.com/): The [Github Guide to
  Installing Git][git-setup] is a good source of information.

* [Node.js v8.x (LTS)](http://nodejs.org): We use Node to generate the documentation, run a
  development web server, run tests, and generate distributable files. Depending on your system,
  you can install Node either from source or as a pre-packaged bundle.

  We recommend using [nvm](https://github.com/creationix/nvm) (or
  [nvm-windows](https://github.com/coreybutler/nvm-windows))
  to manage and install Node.js, which makes it easy to change the version of Node.js per project.

* [Yarn](https://yarnpkg.com): We use Yarn to install our Node.js module dependencies
  (rather than using npm). See the detailed [installation instructions][yarn-install].

### Forking Kepler.gl on Github

To contribute code to Kepler.gl, you must have a GitHub account so you can push code to your own
fork of Kepler.gl and open Pull Requests in the [GitHub Repository][github].

To create a Github account, follow the instructions [here](https://github.com/signup/free).
Afterwards, go ahead and [fork](http://help.github.com/forking) the
[main Kepler.gl repository][github].


### Building Kepler.gl

To build Kepler.gl, you clone the source code repository and use yarn to generate the non-minified
and minified Kepler.gl files:

```shell
# Clone your Github repository:
git clone https://github.com/<github username>/kepler.gl.git

# Go to the Kepler.gl directory:
cd kepler.gl

# Add the main Kepler.gl repository as an upstream remote to your repository:
git remote add upstream "https://github.com/uber/kepler.gl.git"

# Install JavaScript dependencies:
yarn install

# Build Kepler.gl:
yarn build
```


### <a name="local-server"></a> Running a Local Development Web Server

To debug code, run end-to-end tests, and serve the docs, it is often useful to have a local
HTTP server. For this purpose, we have made available a local web server based on Node.js.

1. To start the web server, run:
   ```shell
   yarn start
   ```

2. To access the local server, enter the following URL into your web browser:
   ```text
   http://localhost:8080/
   ```
   By default, it serves the contents of the Kepler.gl project directory.


## <a name="tests"> Running Tests

### <a name="unit-tests"></a> Running the Unit Test Suite

We write unit and integration tests with Tape and Enzime. To run all of the
tests once on Chrome run:

```shell
yarn test
```


## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more [specs][unit-testing].
* All public API methods **must be documented** with using jsdoc. To see how we document our APIs, please check
  out the existing source code and see the section about [writing documentation](#documentation)


## <a name="commits"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  But also,
we use the git commit messages to **generate the Kepler.gl change log**.

The commit message formatting can be added using a typical git workflow or through the use of a CLI
wizard ([Commitizen](https://github.com/commitizen/cz-cli)). To use the wizard, run `yarn run commit`
in your terminal after staging your changes in git.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header
of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit
being reverted.
A commit with this format is automatically created by the [`git revert`][git-revert] command.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change.

You can use `*` when the change affects more than a single scope.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
[reference GitHub issues that this commit closes][closing-issues].

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

## <a name="documentation"></a> Writing Documentation (THIS PART IS NOT AVAILABLE YET)

The Kepler.gl project uses [jsdoc](http://usejsdoc.org/)

This means that all the docs are stored inline in the source code and so are kept in sync as it
changes.

There is also extra content (the developer guide, error pages, the tutorial,
and misceallenous pages) that live inside the Kepler.gl repository as markdown files.

This means that since we generate the documentation from the source code, we can easily provide
version-specific documentation by simply checking out a version of Kepler.gl and running the build.

### Building and viewing the docs locally
The docs can be built from scratch using grunt:

```shell
yarn grunt docs
```

This defers the doc-building task to `gulp`.

Note that the docs app is using the local build files to run. This means you might first have to run
the build:

```shell
yarn grunt build
```

(This is also necessary if you are making changes to minErrors).

To view the docs, see [Running a Local Development Web Server](#local-server).

### Writing jsdoc
The ngdoc utility has basic support for many of the standard jsdoc directives.  But in particular it
is interested in the following block tags:

* `@name name` - the name of the ngdoc document
* `@param {type} name description` - describes a parameter of a function
* `@returns {type} description` - describes what a function returns
* `@property` - describes a property of an object
* `@description` - used to provide a description of a component in markdown
* `@link` - specifies a link to a URL or a type in the API reference.
  Links to the API have the following structure:

* `@example` - specifies an example.
* `@deprecated` - specifies that the following code is deprecated and should not be used.
  In The Kepler.gl docs, there are two specific patterns which can be used to further describe
  the deprecation: `sinceVersion="<version>"` and `removeVersion="<version>"`

The `type` in `@param` and `@returns` must be wrapped in `{}` curly braces, e.g. `{Object|Array}`.
Parameters can be made optional by *either* appending a `=` to the type, e.g. `{Object=}`, *or* by
putting the `[name]` in square brackets.
Default values are only possible with the second syntax by appending `=<value>` to the parameter
name, e.g. `@param {boolean} [ownPropsOnly=false]`.

Descriptions can contain markdown formatting.

### General documentation with Markdown

Any text in tags can contain markdown syntax for formatting. Generally, you can use any markdown
feature.

#### Headings

Only use *h2* headings and lower, as the page title is set in *h1*. Also make sure you follow the
heading hierarchy. This ensures correct table of contents are created.

#### Code blocks
In line code can be specified by enclosing the code in back-ticks (\`).
A block of multi-line code can be enclosed in triple back-ticks (\`\`\`) but it is formatted better
if it is enclosed in &lt;pre&gt;...&lt;/pre&gt; tags and the code lines themselves are indented.

[closing-issues]: https://help.github.com/articles/closing-issues-via-commit-messages/
[git-revert]: https://git-scm.com/docs/git-revert
[git-setup]: https://help.github.com/articles/set-up-git
[github-issues]: https://github.com/uber/kepler.gl/issues
[github]: https://github.com/uber/kepler.gl
[yarn-install]: https://yarnpkg.com/en/docs/install
