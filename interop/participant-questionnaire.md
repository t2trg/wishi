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
- How does the application handle life cycle events and phases
  * Registration and Discovery
  * Configuration of resources
  * Operational Data Exchange
  * Shutdown and de-registration

## Functionality and Roles implemented
See the diagram on slide 5 "Interop Schematic Diagram - Roles and Interactions":
https://github.com/t2trg/wishi/blob/master/slides/Wishi-Interop-19022018.pdf

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
- How are dynamic notifications on observable resources handled by your servers?
- Which protocols does your client support?

## Semantic Integration
- What thing types and Capabilities will be exposed by your servers?
- What interactions and data types will be exposed for each capability?
- How does the client know what things, capabilities, and interactions to look for in discovery?

## Thing Directory
- What resources and services will you register?
- What client discovery methods will you use?
  * Semantic queries, formats
- How will you augment the registrations with additional context metadata
  * Additional semantic annotation about context like location, purpose
- How will you do registration life cycle management?

## Intermediary/Proxy
- What protocols does your proxy consume?
- What protocols does your proxy expose?
- What other protocols are needed to interact with your proxy?
  * To expose things through the proxy?
  * To consume things through the proxy?
- How does your proxy interact with Directories for discovery of consumed things and registration of exposed things?
- How does your proxy remap URIs?

## Security
- What transport security methods are supported? **Example:** DTLS
- What access control features are implemented? **Example:** HTTP basic auth, kerberos tokens, ACLs
- How is security material obtained and configured?
- What additional services are needed/provided such as Auth Server (AS)?

## Accessibility
- What Accessibility scenario(s) are being modeled?
- What alternate modes of interaction are provided by the client and application?
- What are additional requirements on the Thing Directory, Server and Proxy to support your Accessibility Scenario?
