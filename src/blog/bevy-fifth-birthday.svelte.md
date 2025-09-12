---
title: Bevy's fifth birthday
description: The current state of the Bevy CLIs web features and how we got there.
author: Tim Jentzsch
date: 2025-09-08
published: false
---

The Bevy game engine is five years old.
As part of the Bevy CLI working group,
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
Luckily, we can reach for `trunk`, an amazing CLI tool for Rust web apps.

```sh
$ trunk watch
2025-09-12T08:20:52.597193Z  INFO 🚀 Starting trunk 0.21.14
2025-09-12T08:20:55.552734Z ERROR error getting the canonical path to the build target HTML file "/home/tim/dev/tests/blog_web_example/index.html"
2025-09-12T08:20:55.552751Z  INFO   1: No such file or directory (os error 2)
```

Oh, looks like we'll need an `index.html` after all.
