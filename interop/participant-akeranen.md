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

  * How can we easily integrate LwM2M devices (clients) to a system that is using heterogeneous set of technologies; and in particular different ways for expressing the semantics of possible interactions.
  * How can iot.schema.org semantics be used to annotate LwM2M and IPSO models.

- How does the application handle life cycle events and phases
  * Registration and Discovery
    * LwM2M clients register to LwM2M Management Server; 
  * Configuration of resources
    * All LwM2M management and application resources are (eventually) exposed by clients
  * Operational Data Exchange
    * CoAP with text/plain
    * TDs with HTTP and JSON-LD
  * Shutdown and de-registration
    * Not implemented

## Functionality and Roles implemented
See the diagram on slide 5 "Interop Schematic Diagram - Roles and Interactions":
https://github.com/t2trg/wishi/blob/master/slides/Wishi-Interop-19022018.pdf

* Intermediary that translates LwM2M registration information into TD and registers it to Thing Directory
* Connected thing (standard Leshan LwM2M client)
* Standard Leshan LwM2M Management Server  
* Possibly Thing Directory (WoT Thingweb implementation)

## For anyone participating whether hands-on or not
Describe the system components you are providing and the role performed in
your application by each component. Provide some simple diagrams as needed.
- What components of the application are you providing?
- What components of your application can be provided by other participants?
- Describe functions and protocols involved in the various roles:
- Any particular role is optional
  * Connected Thing (Embedded Client)
  * Application Client
  * Proxy or other Intermediary
  * Directory

## Protocols
- Which protocols do your servers expose?
  * HTTP and CoAP by LwM2M Management Server
  * CoAP by LwM2M Client (CoAP server)
- How are dynamic notifications on observable resources handled by your servers?
  * LwM2M supports observe of resources
- Which protocols does your client support?

## Semantic Integration
- What thing types and Capabilities will be exposed by your servers?
- What interactions and data types will be exposed for each capability?
- How does the client know what things, capabilities, and interactions to look for in discovery?

## Thing Directory
- What resources and services will you register?
  * All resources exposed by the LwM2M client
- What client discovery methods will you use?
  * Semantic queries, formats
- How will you augment the registrations with additional context metadata
  * Additional semantic annotation about context like location, purpose
- How will you do registration life cycle management?

## Intermediary/Proxy
- What protocols does your proxy consume?
  * HTTP 
- What protocols does your proxy expose?
  * N/A
- What other protocols are needed to interact with your proxy?
  * To expose things through the proxy?
  * To consume things through the proxy?
- How does your proxy interact with Directories for discovery of consumed things and registration of exposed things?
- How does your proxy remap URIs?

## Security
- What transport security methods are supported? DTLS (for LwM2M client)
- What access control features are implemented? None
- How is security material obtained and configured? Static
- What additional services are needed/provided such as Auth Server (AS)?

## Accessibility
- What Accessibility scenario(s) are being modeled?
- What alternate modes of interaction are provided by the client and application?
- What are additional requirements on the Thing Directory, Server and Proxy to support your Accessibility Scenario?
