console.log("index.js");
var client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')
client.on('connect', function () {
  console.log('connected')
  client.subscribe('romeo/messages', function (err) {
    if (!err) {
      client.publish('romeo/messages', 'Hello mqtt')
    }
  })
})
client.on('message', function (topic, message) {
  console.log(message.toString())

})

$(document).ready(function () {
  var temp = false
  $("#sub-button").on('click', function () {
    temp = true
    var topic = $("#sub-topic").val();
    client.subscribe(topic);
  })
  $("#pub-button").on('click', function () {
    var pub_topic = $("#pub-topic").val();
    var pub_payload = $("#pub-payload").val();
    var sub_topic = $("#sub-topic").val();
    if ((pub_topic == sub_topic) && (temp == true)) {
      $(".table").append("<tr><td>" + pub_topic + "</td><td>" + pub_payload + "</td></tr>")
    }
    client.publish(pub_topic, pub_payload);
  })
})
