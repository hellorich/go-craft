# go-craft

## Installation notes

To install on latest El Capitan - Version 10.11.5 (15F34) as of 18.05.2016

1. Upgrade to PHP 5.6 - `curl -s http://php-osx.liip.ch/install.sh | bash -s 5.6`

2. Install MCrypt using Homebrew:

```
// Uninstall Homebrew
[sudo] rm -rf /usr/local/Cellar /usr/local/.git && brew cleanup

// Reinstall Homebrea
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

// Install mcrypt
// If you're running a different version of php than 5.6 you will need to change
// this to the appropriate version. 
brew install php56-mcrypt

// Test mcrypt
mcrypt -v
// should result in 
// Mcrypt v.0.9.9 (i386-apple-darwin15.0.0)
// Linked against libmcrypt v.2.5.8
// Copyright (C) 1998-2002 Nikos Mavroyanopoulos (nmav@gnutls.org)
```

3. MySQL 5.7.5+ needs my.cnf setting up to avoid its default use of `sql_mode=only_full_group_by`

There's an example at `/usr/local/mysql/support-files/my-default.cnf`, so create `/etc/my.cnf` and paste the contents into there, then restart mysql.

## Known Issues

1. Need to use grunt go --force to bypass 500 errors

2. Need to use 127.0.0.1:8010 rather than Browsersync to avoid cross domain errors

3. Unknown error on personal settings modal in Craft.