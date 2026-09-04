function handler(event) {
  var request = event.request;
  var host = request.headers.host && request.headers.host.value;

  if (host === "sozorock.com") {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: "https://www.sozorock.com" + request.uri },
        "cache-control": { value: "public, max-age=300" }
      }
    };
  }

  return request;
}
