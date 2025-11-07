---
title: Bevy's fifth birthday
description: The current state of the Bevy CLIs web features and how we got there.
author: Tim Jentzsch
date: 2025-09-08
published: false
---

The Bevy game engine is five years old.
As part of the [Bevy CLI working group](https://discord.com/channels/691052431525675048/1278871953721262090),
I spent the last year to improve Bevy's tooling.

The Bevy CLI covers multiple areas:
Creating new Bevy projects from templates,
performing static analysis of your code with custom lints and
building and running Bevy applications.

In this post, I will focus on the last part, in particular our support for Bevy web apps.
But why was this work started, what impact does it have?

## The status quo

Let's say the Bevy CLI doesn't exist and you want to build a game with Bevy.
First, we create a new project:

```sh
$ cargo new awesome_web_game
$ cd awesome_web_game
$ cargo add bevy
```

And then we add some simple text to get started:

```rs
use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .run();
}

fn setup(mut commands: Commands) {
    commands.spawn(Camera2d);

    commands.spawn((
        Node {
            width: Val::Percent(100.),
            height: Val::Percent(100.),
            justify_content: JustifyContent::Center,
            align_items: AlignItems::Center,
            ..Default::default()
        },
        children![
            Text::new("hello world"),
            TextColor::WHITE,
            TextFont {
                font_size: 60.,
                ..Default::default()
            },
        ],
    ));
}
```

To test it out, we just use

```sh
$ cargo run
```

Et voilà!

[Insert screenshot]

Great, but not a web app.
To target a browser, our code needs to be able to run in the browser.
For that, we basically have two options: JavaScript and Wasm.
Let's... not compile to Rust to JavaScript (please don't).
So instead, we can use Wasm:

```sh
$ cargo run --target=wasm32-unknown-unknown
     Running `target/wasm32-unknown-unknown/debug/blog_web_example.wasm`
target/wasm32-unknown-unknown/debug/blog_web_example.wasm: 1: Syntax error: end of file unexpected
```

That didn't work.
We can't just run the Wasm binary directly, the browser needs some JavaScript glue to use it.
For that, we can reach to `wasm-bindgen`, an essential CLI tool which creates JavaScript bindings for our Rust code.

After a bit of searching, we find this incantation to create the bindings:

```sh
[TODO]
```

This creates a new Wasm file and a corresponding JavaScript file containing the bindings.
So... how do we run _that_?
Well, we need an `index.html` file as entry-point for the browser which then loads the Wasm file and then runs it via the JavaScript bindings.
These files need to be served with a local web server.

Fuck this, it's time to reach for some tooling to simplify this process.
Luckily, we can reach for [`trunk`](https://trunkrs.dev/), an amazing CLI tool for Rust web apps.

```sh
$ trunk serve
2025-09-12T08:20:52.597193Z  INFO 🚀 Starting trunk 0.21.14
2025-09-12T08:20:55.552734Z ERROR error getting the canonical path to the build target HTML file "/home/tim/dev/tests/blog_web_example/index.html"
2025-09-12T08:20:55.552751Z  INFO   1: No such file or directory (os error 2)
```

Oh, looks like we'll need an `index.html` after all, but that's simple to add:

```html
<html>
	<head>
		<link data-trunk rel="rust" />
	</head>
</html>
```

and finally:

```sh
$ trunk serve
2025-09-12T12:51:47.695886Z  INFO 🚀 Starting trunk 0.21.14
2025-09-12T12:51:48.730636Z  INFO 📦 starting build
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.31s
2025-09-12T12:52:17.935361Z  INFO applying new distribution
2025-09-12T12:52:17.955608Z  INFO ✅ success
2025-09-12T12:52:17.960380Z  INFO 📡 serving static assets at -> /
2025-09-12T12:52:17.960644Z  INFO 📡 server listening at:
2025-09-12T12:52:17.960652Z  INFO     🏠 http://127.0.0.1:8080/
2025-09-12T12:52:17.960656Z  INFO     🏠 http://[::1]:8080/
2025-09-12T12:52:17.960767Z  INFO     🏠 http://localhost.:8080/
```

And when we visit <http://localhost:8888>, we get to see our "game"!
Still, it leaves a bit to be desired:

- We get to stare at a blank white screen while the game is loading in,
- The Wasm is a chonky 173 MB binary, which takes a while to load,
- Trunk doesn't know about Bevy's `asset` folder, so out of the box they won't load.

## Time for a custom solution

While `trunk` is a great tool, there is only so much you can do when you aim to be general-purpose.
With the Bevy CLI prototype, we can make a lot more assumptions up-front.
Most Bevy projects are structured the same way and need a similar setup and compiler settings to work well for the web.
Good defaults matter, it's very frustrating to start out with Bevy and needing an hour or maybe even a day to figure out how to make the most simple web game run.
Instead, we can craft a tool to make 80% of games run, even run _well_, out of the box.

Let's take a look at how that looks like, by installing the current Bevy CLI prototype:

```sh
$ cargo install --git=https://github.com/TheBevyFlock/bevy_cli --tag=cli-v0.1.0-alpha.2 --locked bevy_cli
```

Now we can just execute

```sh
$ bevy run web --open
```

And the game will open in our browser!
Under the hood, a lot is taken care for you:

- Compiling the Rust program to Wasm
- Creating JS bindings for the Wasm binary
- Bundling your Bevy assets
- Hosting a local web server
- Serving an `index.html` if you didn't create one yourself

## Design philosophy

There are a couple of rules I try to follow when developing the Bevy CLI to make it a pleasant and consistent experience for users.

### Familiar API

Most users who want to work with Bevy, are already well familiar with Cargo.
Whenever possible, we try to align the command interface and terminology to analogue Cargo commands, so you don't have to look them up every time.

### Works out of the box

It shouldn't be a big hassle to make a Bevy app work on the web.
Of course, some features just don't work on the web that have native support.
But wherever possible, the CLI should be able to deal with apps that have no web-specific configuration.
A prime example of this is the default `index.html` and the automatic inclusion of the Bevy assets folder.

### Good defaults

The default Rust compiler configuration just doesn't work well for the web.
For example, binary size is just a lot more important, as it can cause big delays to being able to start the game.
The Bevy CLI provides different compilation profiles for Wasm by default, which are optimized for web usage out of the box.

### Configurable

While the default setup should work well for most users, especially when starting out, power users will want to optimize all settings to squeeze the most out of the game's performance and adjust everything to fit perfectly in their workflow.
This is why we try to make all defaults transparent to the user and customizable when needed.
All commands the CLI executes under the hood and all settings that are applied are logged in `--verbose` mode, so you can easily see what happens and even replace the Bevy CLI with a custom tool when you need full control.

## Bevy CLI features

With that out of the way, let me give you a more detailed overview of the features we have implemented so far for the web.

### Automatic tool installation

This is not specific to the web, but especially useful in this context.
We depend on many external tools like [`wasm-bindgen`](https://github.com/wasm-bindgen/wasm-bindgen) here, so making them easy to set up is very important for new users (and even convenient for experienced ones).
When something is missing, the CLI will ask you if it should perform the installation automatically for you.

### Custom feature configuration

With Bevy, you often want to use a different set of features on the web compared to native, in order to properly use functionality that is only supported on either platform.
Similarly, you often want to enable additional functionality on dev compared to release builds, such as FPS monitors, editors, debug overlays, etc.
This is a bit hard/annoying to do with Cargo itself, so we added additional support for it.

### Rustflag merging

Sometimes, your project needs specific Rustflags to work properly.
For example, in previous `getrandom` versions, you needed to configure the appropriate web backend via Rustflags.
Unfortunately, Cargo does not perform any merging of Rustflags, if you specify them in your project's `Cargo.toml`, it will overwrite any flags you set on your user's configuration.

With the Bevy CLI, you can specify Rustflags separately for dev/release and native/web and they will be merged with the Rustflags you configured in the usual Cargo configuration.

### Multi-threading support (experimental)

As an experimental feature, we're trying to make it easier to build multi-threaded apps for the web. Right now, Bevy web apps are single threaded by default and quite hard to make multi-threaded, causing performance problems.
Most noticeable, you can often get glitchy audio when the main thread is busy.
Some plugins, like [`bevy_seedling`](https://github.com/corvusprudens/bevy_seedling) are already experimenting with exposing multi-threaded functionality for the web to fix these issues.

Unfortunately, _using_ this functionality is already a big pain.
You have to set specific flags in Cargo, enable the correct Wasm features and configure the correct set of headers in your web server.
The Bevy CLI can do all of this automatically for you when you set the `--unstable multi-threading` flag, all you need is a nightly Rust toolchain!

## The future

I'm very happy where we are at with the current version of the Bevy CLI.
It already makes the development of a Bevy web app _a lot_ more approachable and less of a pain.

Still, we are far from done and have more than enough features that we want to add in the future.

### Automatic reloading

Potentially the most useful feature would be to automatically reload the game on changes.
This has multiple aspects to it and will likely be implemented in multiple iterations.

First, there are two types of reloads, _cold_ and _hot_ reloads.
With cold reloads, you use all state of the game, it's essentially the same as closing and re-opening the application.
This is relatively easy to implement and at least saves you from killing the app and re-executing the command every time.

Sometimes you can do even better though, with hot reloads.
They try to persist as much of your game state as possible.
You already know this from native Bevy development with the hot asset reloading.
Unfortunately, this is not available for Bevy web apps yet, but with the Bevy CLI we control the local web server and are hence able to implement this in the future.
Another very exciting development is [Dioxus' `subsecond`](https://docs.rs/subsecond/latest/subsecond/index.html) which even allows you to hot reload _Rust code_. This technology is still in an early stage, but already has Bevy integration and is being successfully tested by early adopters.
In the future, we also want to have this for web development, so we only need to fallback to cold reloads in rare cases.

### Hooks

No matter how many features we add, we will never be able to serve all possible use-cases that developers have out of the box.
Trunk has a neat system to still provide a lot of flexibility: [Hooks](https://trunkrs.dev/guide/build/hooks.html).
They are a way to add custom commands that are called in different stages of the compilation pipeline.
For example, you could define a hook to call a custom web app bundler after the JS bindings have been created and the assets bundled, to optimize them to be served on a web server.

## Reflecting back

Now I remembered that this was a birthday post, where we also reflect back on the last year.

### The good

Overall, I'm very happy where we are at with the current prototype.
I like the design of the command line interface and I think that the functionality we have built is already a big upgrade from the previous workflow.
Especially for game jams, the CLI can get you going quickly and makes it easy to publish a web version of your game, which will make it a lot easier for others to test your game.

It's also been a fun project to work on, with amazing people collaborating together.
There are many people that contributed and helped this project come together,
but I have to give a special shoutout to my co-maintainers [@BD103](https://github.com/BD103) and [@DaAlbrecht](https://github.com/DaAlbrecht) for giving very useful feedback and implementing a ton of features, while being a pleasure to work with in general.
Furthermore, special thanks go to the `bevy_new_2d` maintainers [@benfrankel](https://github.com/benfrankel) and [@janhohenheim](https://github.com/janhohenheim) who adopted the CLI prototype in its very early stages and helped to prioritize features and identify usability issues.

### The bad

Of course, not everything went perfectly.
It's safe to say that we suffered a lot from feature creep.
While it was an initial goal to build the "core architecture and at least one useful function",
we now have multiple major features (project scaffolding, linting, web apps) with a broad set of functionalities supported.

This will make the process of upstreaming harder.
On one hand, maintainers want to perform a detailed review of the functionality and code, to ensure that it aligns with the overall vision of the Bevy project.
On the other hand, we want to retain git history and code ownership as far as possible,
so that we keep credit even for one-time contributors and make it easier to identify bugs in the future.

Additionally, we probably could have done a better job following the intended purpose of working groups.
[@NthTensor](https://github.com/NthTensor) has written a [detailed blogpost about Bevy's working groups](https://internet.place/content/working-groups/), giving more background about what they are, why they are useful and what can still be improved.
Ours is running for a long time already and we should have pushed earlier to upstreaming and closing the working group.
While we had a design document and it was partially written by maintainers, we could have done a better job of making the approval more formal and to get newer features approved that were not included in the initial revision of the document.

## Conclusion

The Bevy CLI prototype makes it a lot easier to build and run web apps with Bevy.
If you want to try it out, please do and give us feedback:

```sh
$ cargo install --git https://github.com/TheBevyFlock/bevy_cli --tag cli-v0.1.0-alpha.2 --locked bevy_cli
```

It's also an easy project to contribute to:
It's just "normal", straightforward Rust.
Most of the CLI is just about calling other CLI tools with the correct arguments.
If you're interested, [join our working group](https://discord.com/channels/691052431525675048/1278871953721262090)!

For the next year, I'm hoping that we can upstream the CLI and make it an official tool.
See you then!
