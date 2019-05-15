# Geovistory

This is a project by KleioLab GmbH.

Those folders contain the substantial parts of the code
- /server : node.js server logic
- /common : some code shared by server and client
- /client : angular web app
- /deploy : scripts used for deployment process

## Server

The Node.js Server (LoopBack) provides:
- DB connector (using models)
- ACL (logic using roles and permissions)
- Email service using KleioLab email-server at hostpoint.ch
- REST API server
- REST API documentation "/explorer"
- Access to data using WebSockets
- Generator for Angular-Client-SDK (loopback-cli generates angular code based on common models)
- Webserver for angular client (html, js, css etc.)

## Common

The common files provide:
- The definition of models used by both server and client.

## Client

The Angular client:
- GUI including app routing (so all urls are mapped by client)
- (In terms of SEO we may need to enable angular server side rendering, so that search engines get static html pages)