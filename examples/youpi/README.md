# YOUPI

YOUPI is a way to add information to a yang model in order to be able to parse
binary information and to convert it to another type like JSON or CBOR. It is
possible to add semantic information as well, so that JSON-LD is generated.

The latest editorial version of the draft is available [here][1]. For
contributions, feel free to create issues.

[1]: https://github.com/Acklio/youpi-draft

## Binary payload decoding

To play with this, you can see the `example.json` file in the current folder 
which contains base64 encoded binary data and base64 encoded yang model. Please
refer to `device.yang` for yang file example.

Example invocation:

```sh
curl -u ietf:t2trg --basic https://youpi-demo.acklio.app:8443/process -d @./examples/youpi/example.json
```

Example output:

```json
{"@context":{"approximative-temp":{"@id":"http://ackl.io/iot/vocab/m3-lite#ApproximateTemperature","@type":"http://data.nasa.gov/qudt/owl/unit#DegreeCelsius"},"battery":{"@id":"http://data.nasa.gov/qudt/owl/quantity#EnergyPerElectricCharge","@type":"http://data.nasa.gov/qudt/owl/unit#Volt"},"button-data":{"@id":"http://FIXME"},"period":{"@id":"http://pending.schema.org/repeatFrequency","@type":"http://data.nasa.gov/qudt/owl/unit#MinuteTime"}},"approximative-temp":12,"battery":4,"button-data":{"@context":{"temp":{"@id":"http://data.nasa.gov/qudt/owl/quantity#ThermodynamicTemperature","@type":"http://data.nasa.gov/qudt/owl/unit#DegreeCelsius"}},"major-version":1,"minor-version":12,"reed-state":false,"temp":22.25},"mode":"btn","msg-type":"btn","period":10}
```

## Payload encoding

To play with this, you can see the `encoding-example.json` file in the current
folder which contains base64 encoded binary data and base64 encoded yang model.
Please refer to `simple-encode.yang` for yang file example.

Example invocation:

```sh
curl -u ietf:t2trg --basic https://youpi-demo.acklio.app:8443/encode -d @/tmp/encode-example.json
```

Example output:

```json
{"output":"Kw=="}
```
