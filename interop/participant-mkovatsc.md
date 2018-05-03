# Participant Questionnaire for the WISHI Semantic Interoperability Test Event

Matthias Kovatsch (Siemens AG)

## Goals and Purpose
The purpose of this questionnaire is to build a collective plan for the Interop
- Collect information about entries and participants
- Facilitate discussion and coordination
- Enable exchange of scenario and role information to provide use case alignment
- Participants should document what they are doing for their interop contribution
- Participants should also document additional requirements and stretch goals

## Scenarios to enable interoperability testing
- Register things in a directory using a common format
- Applications discover things that others have registered
- Application can use information in discovery to learn how to adapt to thing protocols or find a translator
- Application can use connected things that others have brought, e.g. a motion sensor controlling a light
- Replace components of an application, e.g. a different Motion Sensor
- Develop client adaptations to diverse thing protocols
- Develop gateway translations between diverse protocols

## Application Scenarios
- What is the problem being solved?
  * 
- How does the application handle life cycle events and phases
  * Registration and Discovery
  * Configuration of resources
  * Operational Data Exchange
  * Shutdown and de-registration

## Functionality and Roles implemented
- Application (Client)
  * No concrete application, focus on building blocks
  * Scripted (mashup) clients
  * Web-frontend for generic status and control dashboards
- Connected Thing
  * Physical Things (server, brightness sensor and RGB lighting)
  * Simulated Things (client+server, free choice through scripting)
- Intermediary
  * Protocol proxies based on W3C WoT TD and Protocol Bindings (HTTP, CoAP, BACnet, Modbus, OPC UA)
- Thing Directory
  * Registration, lookups, semantic queries

## For anyone participating whether hands-on or not
Describe the system components you are providing and the role performed in
your application by each component. Provide some simple diagrams as needed.
- What components of the application are you providing?
  * node-wot (WoT Servient with multiple protocol bindings and Scripting API)
  * Thingweb Directory (CoRE RD-like frontend for TDs and triple store)
  * Thingweb WebUI (TD visualizer and status/control client)
  * Raspberry Pi with UnicornHAT RGB LED shield running node-wot
  * ESP8266 with CoAP server, TD, and Lua-based scripting
- What components of your application can be provided by other participants?
  * More Things
  * Alternative protocol bindings, e.g., LWM2M data model, MQTT transfer
  * Eventing solutions, e.g., Server-Sent Events, long-poll, WebSockets (with discussion of subprotocol used)

## Protocols
- Which protocols do your servers expose?
  * HTTP(S)
  * CoAP
- How are dynamic notifications on observable resources handled by your servers?
  * HTTP long-poll (work-in-progress)
  * CoAP Observe
  * (hopefully maybe more to come during hackathon)
- Which protocols does your client support?
  * HTTP
  * CoAP
  * BACnet
  * Modbus
  * OPC UA

## Semantic Integration
- What thing types and Capabilities will be exposed by your servers?
  * T.B.D.
- What interactions and data types will be exposed for each capability?
  * T.B.D.
- How does the client know what things, capabilities, and interactions to look for in discovery?
  * A priori shared knowledge based on application goals

## Thing Directory
- What resources and services will you register?
  * All that should be...
- What client discovery methods will you use?
  * Thing Directory look-up (simplified SPARQL or full SPARQL)
  * JSON Link Format
  * WoT Thing Description
- How will you augment the registrations with additional context metadata
  * iotschema.org
  * Custom context file (or wot-td-common)
- How will you do registration life cycle management?
  * CoRE RD lifetime mechanism with registration update (=Thing Directory mechanism)

## Intermediary/Proxy
- What protocols does your proxy consume?
  * see above
- What protocols does your proxy expose?
  * see above
- What other protocols are needed to interact with your proxy?
  * To expose things through the proxy?
    - Hackathon could look into the "Management Things", standardized interactions to register Things at proxies and let them re-expose them
  * To consume things through the proxy?
    - Consuming proxy Things is just like consuming normal Things
- How does your proxy interact with Directories for discovery of consumed things and registration of exposed things?
  * Proxies can have additional script logic to behave as wished for the proxied Thing in question.
- How does your proxy remap URIs?
  * Internally consumes Things and re-exposes a Thing with same Interactions and non-instance specific metadata; proxy Servient generates its own URIs for hosted Things

## Security
- What transport security methods are supported? **Example:** DTLS
  * TLS
- What access control features are implemented? **Example:** HTTP basic auth, kerberos tokens, ACLs
  * HTTP Basic Auth
  * OAuth 2.0 (Bearer)
- How is security material obtained and configured?
  * Config file that associates keying material with @id of consumed Thing
- What additional services are needed/provided such as Auth Server (AS)?
  * Something/someone providing the tokens required (no AS requests integrated yet)

## Accessibility
- What Accessibility scenario(s) are being modeled?
  * none
- What alternate modes of interaction are provided by the client and application?
  * none
- What are additional requirements on the Thing Directory, Server and Proxy to support your Accessibility Scenario?
  * n/a
