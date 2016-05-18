<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
  'localhost' => array(
    'devMode' => true,
    'siteUrl' => 'http://127.0.0.1:8010',
    'environmentVariables' => array(
      'basePath' => '/users/rich/projects/tools/go-craft/public/',
      'baseUrl'  => 'http://127.0.0.1:8010/',
    ),
    'testToEmailAddress' => 'rich.cookson@gmail.com',
  ),
);
