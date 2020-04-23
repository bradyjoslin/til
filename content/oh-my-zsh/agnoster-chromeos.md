+++
title = "Agnoster Theme on Chrome OS"
+++

If you install Oh My Zsh on Chrome OS and use the [Agnoster theme](https://github.com/agnoster/agnoster-zsh-theme), the fonts won't display correctly, as some of the symbols are missing. This is true even if you install the [powerline fonts](https://github.com/wernight/powerline-web-fonts) in termina. This can be fixed by specifying a user css font.

In termina, press CTRL -> Shift -> P to open the Secure Shell App Profile Settings. Under `Custom CSS (URI)` enter `https://cdn.jsdelivr.net/gh/wernight/powerline-web-fonts@ba4426cb0c0b05eb6cb342c7719776a41e1f2114/PowerlineFonts.css`

In `Text Font Family` specify the font you'd wish to include, i.e. `"Hack","DejaVu Sans Mono"`.

![secure shell profile](../secure-shell-profile.png)

And now you should have a pretty prompt:

![oh my zsh](../oh-my-zsh.png)
