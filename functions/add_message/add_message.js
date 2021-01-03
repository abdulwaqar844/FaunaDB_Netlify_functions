
var faunadb = require('faunadb'),
q = faunadb.query;
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
if (event.httpMethod !== "POST") {
  return { statusCode: 405, body: "Method Not Allowed" };
}

try {
  const messageBody = JSON.parse(event.body);
  var adminClient = new faunadb.Client({ secret: "fnAD-lQpNYACAQFaKl8likdIykEOUw6GbmfztIe7" });
  const result = await adminClient.query(
    q.Create(
      q.Collection('posts'),
      { data: { detail:  messageBody.message} },
    )
  )
  return {
    statusCode: 200,
      body: JSON.stringify({ message:  result.ref.id}),
    // // more keys you can return:
    // headers: { "headerName": "headerValue", ... },
    // isBase64Encoded: true,
  }
} catch (error) {
  return { statusCode: 500, body: error.toString() }
}
}
