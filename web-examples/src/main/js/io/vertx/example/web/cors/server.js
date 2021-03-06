var Router = require("vertx-web-js/router");
var CorsHandler = require("vertx-web-js/cors_handler");
var StaticHandler = require("vertx-web-js/static_handler");

var router = Router.router(vertx);

router.route().handler(CorsHandler.create("*").allowedMethod('GET').allowedMethod('POST').allowedMethod('OPTIONS').allowedHeader("X-PINGARUNER").allowedHeader("Content-Type").handle);

router.get("/access-control-with-get").handler(function (ctx) {

  ctx.response().setChunked(true);

  Array.prototype.forEach.call(ctx.request().headers(), function(entry) {
    ctx.response().write(entry.getKey());
    ctx.response().write(entry.getValue());
    ctx.response().write("\n");
  });

  ctx.response().end();
});

router.post("/access-control-with-post-preflight").handler(function (ctx) {
  ctx.response().setChunked(true);

  Array.prototype.forEach.call(ctx.request().headers(), function(entry) {
    ctx.response().write(entry.getKey());
    ctx.response().write(entry.getValue());
    ctx.response().write("\n");
  });

  ctx.response().end();
});

// Serve the static resources
router.route().handler(StaticHandler.create().handle);

vertx.createHttpServer().requestHandler(router.accept).listen(8080);
