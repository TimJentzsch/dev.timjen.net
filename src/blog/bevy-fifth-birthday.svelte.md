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
cargo new awesome_web_game
cd awesome_web_game
cargo add bevy
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
cargo run
```

Et voilà!

[Insert screenshot]
