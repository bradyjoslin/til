+++
title = "Wi-Fi SSID and Passwords via CLI"
+++

Two built-in MacOS CLI utilities can be used to obtain the currently connected SSID and stored password. `airport` gets information on currently connected Wi-Fi, `security` is used to obtain password.

Using these tools I [built a CLI](https://github.com/bradyjoslin/wifi-password) in Rust that to quickly share Wi-Fi passwords and connection details, including QR codes that auto-configure iOS and Android devices, but below is how they work individually.

Default MacOS `airport` utility location:

`/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport`.

Sample usage to obtain SSID:

```bash
> airport -I | awk '/ SSID/ {print substr($0, index($0, $2))}'

Guest WiFi
```

`security` utility can obtain password associated with an SSID ([details](https://macromates.com/blog/2006/keychain-access-from-shell/)). Running `security` provides a login prompt to access keychain, as authentication is required in order to obtain the password.

```bash
> security find-generic-password \
-D 'AirPort network password' \
-ga "Guest WiFi" \
2>&1 >/dev/null

password: "HelloFriends!"
```

The System keychain record for that SSID can be updated so that `security` is always allowed access to the password. This requires sudo and should only be done for Wi-Fi passwords not considered secret, as will allow this app and others to read the password without being prompted for credentials.

```bash
sudo security add-generic-password -U -a <ssid> -D "AirPort network password" -T "/usr/bin/security" -s "AirPort"  /Library/Keychains/System.keychain
```
