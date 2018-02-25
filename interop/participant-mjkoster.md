# Participant Questionnaire for the WISHI Semantic Interoperability Test Event

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
Each participant provides components to build one or more application scenarios.
A participant may bring all of the components needed to create an application or
they may bring some components, expecting other participants to provide the rest of the
components needed to complete the application. Describe the application scenario(s) you
expect to participate in.
- What is the problem being solved?

  * How do we expose IoT resources for third party applications and services to
  easily interoperate with our platform and others?
  * How can we expose the functions of discovery and application configuration
  in a way that enables execution outside the platform through an API?
  * How do we abstract API details such that we can avoid low level version
  management problems as we evolve our API?

- How does the application handle life cycle events and phases
  * Registration and Discovery
    - Resource descriptions with capability metadata are stored in a directory
    - Discovery uses queries to the directory to match semantic tags in the
    metadata that describe the type of capability, according to what the application 
    requires, for example temperature sensing is required for a thermostat application
  * Configuration of resources
    - The application determines through metadata which resources provide the
    required capabilities relevant to the feature of interest (for example,
    a room of a house or location in a vehicle)
    - The application monitors resource state as inputs to its algorithm, and applies
    its outputs to resources to effect control actions
  * Operational Data Exchange
    - The application should use asynchronous notification methods such as web hooks,
    CoAP Observe, MQTT Subscription, HTTP EventSource, or other
    - The application will use PUT, POST, MQTT Publish, or other methods to update
    the state of control variables and actuators
  * Shutdown and de-registration
    - The registration in the Thing Directory controls availability of the thing to
    applications. There should be a lifetime applied to each registration, and a
    periodic refresh operation required to maintain visibiity in the directory.
    - There should also be a way to remove particular directory entries if a duplicate
    registration is needed (for example a thing that is reset and tries to
    register again before the lifetime of the previous entry expires).
    - Clients may cache discovered entries and use some mechanism to learn when
    a particular entry corresponding to a resource is expired ore removed.

## Functionality and Roles implemented
See the diagram on slide 5 "Interop Schematic Diagram - Roles and Interactions":
https://github.com/t2trg/wishi/blob/master/slides/Wishi-Interop-19022018.pdf

## For anyone participating whether hands-on or not
Describe the system components you are providing and the role performed in
your application by each component. Provide some simple diagrams as needed.
- What components of the application are you providing?
  * Connected things for smart home applications, including light bulbs, Motion
  sensors, illuminance sensors, other sensors, exposed through a proxy API with
  local and internet-reachable instances
  * A Thing Directory implementation with local and internet-reachable instances
  * A client for ad-hoc discovery and integration of simple applications, e.g.
  turning a light on when motion is detected, using Node-RED
- What components of your application can be provided by other participants?
  * The connected things could be provided by other participants
  * The application could be provided by others
  * The thing directory may be provided by others
  * Common standards or interworking schemes are required
- Describe functions and protocols involved in the various roles:
- Any particular role is optional
  * Connected Thing (Embedded Client)
  * Application Client
  * Proxy or other Intermediary
  * Directory

## Protocols
- Which protocols do your servers expose?
  * HTTP with a data model based on SenML
- How are dynamic notifications on observable resources handled by your servers?
  * MQTT broker will provide asynchronous notifications using topics derived from
  HTTP server paths
- Which protocols does your client support?
  * THe Client supports HTTP, MQTT, Websockets, and CoAP

## Semantic Integration
- What thing types and Capabilities will be exposed by your servers?
  * Light bulb(s) with on/off, brightness, and color control capabilities
  * Motion sensing with on/off output
  * Illuminance sensing with light level output
- What interactions and data types will be exposed for each capability?
  * on/off properties, illuminance level, motion state
  * turnOn, turnOff, setBrightness with ramp time, set color actions
  * Motion detected event
- How does the client know what things, capabilities, and interactions to look for in discovery?
  * The user creates or chooses a rule, action, recipe, behavior, or other algorithm
  * Semantic tags are used to identify capability types like on/off control
  * Additional metadata in the thing directory entry indicates which feature of interest
  * The user indicates which feature of interest they wish to use in the application
## Thing Directory
- What resources and services will you register?
- What client discovery methods will you use?
  * Semantic queries, formats
- How will you augment the registrations with additional context metadata
  * Additional semantic annotation about context like location, purpose
- How will you do registration life cycle management?

## Intermediary/Proxy
- What protocols does your proxy consume?
  * SmartThings Endpoint API protocol using HTTPS and web callbacks
- What protocols does your proxy expose?
  * W3C Web of Things Thing Description
  * HTTP API with SenML
  * MQTT for asynchronous notification
- What other protocols are needed to interact with your proxy?
  * To expose things through the proxy?
    - The proxy is not available for others to use
  * To consume things through the proxy?
- How does your proxy interact with Directories for discovery of consumed things and registration of exposed things?
  * The proxy registers exposed things in a nearby reachable directory
- How does your proxy remap URIs?
  * The proxy concatenates a device identifier to the path and obtains a suitable
  scheme+authority from its configuration

## Security
- What transport security methods are supported? **Example:** DTLS
  * none
- What access control features are implemented? **Example:** HTTP basic auth, kerberos tokens, ACLs
  * none
- How is security material obtained and configured?
- What additional services are needed/provided such as Auth Server (AS)?

## Accessibility
- What Accessibility scenario(s) are being modeled?
  * none
- What alternate modes of interaction are provided by the client and application?
- What are additional requirements on the Thing Directory, Server and Proxy to support your Accessibility Scenario?
