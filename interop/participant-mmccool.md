# Participant Questionnaire for the WISHI Semantic Interoperability Test Event
For Michael McCool, Principal Engineer, Intel; W3C WoT WG Co-chair.

This will be an extension of the 
[scenarios I prepared for the recent W3C WoT plugfest](https://github.com/w3c/wot/blob/master/plugfest/2018-bundang/preparation-intel.md).  Note: the information provided on the above link was prepared under the W3C IP policy.
However, this material provides most of the input requested below, including a description of the devices and services,
and links to the Thing Descriptions used.

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
components needed to complete the application. 

Describe the application scenario(s) you expect to participate in.
- What is the problem being solved?
  * Provide a set of self-describing devices and services
  * Combine them to provide new services or to transform existing services, eg to improve accessibility.
- How does the application handle life cycle events and phases
  * Registration and Discovery
        - Devices and services will be provided with or generate Thing Descriptions using the latest (Bundang) W3C WoT proposal.
        - Thing Descriptions are in JSON-LD and can use external vocabularies
        - I have done preliminary markup using vocabulary from iot.schema.org
        - I can use other vocabularies for additional semantic annotation as well, eg for location
        - These Thing Descriptions will be (dynamically) registered with one or more Thing Directories
        - Dynamic registration means that they will time out and be removed if the device is powered off
        - Thing Directories will have HTTP APIs that will allows SPARQL queries
  * Configuration of resources
        - Hand-configured.  I will be focusing on operational state, not installation lifecycle
  * Operational Data Exchange
        - Generally data exchange is via JSON, using Schemas specified in the TDs
        - A few devices use JPEG images as well, but a pair of resources (a camera and an object identification service) allow the images to be "interpreted" using the object description service, which returns JSON
  * Shutdown and de-registration
        - Decommissioning is not supported
        - Thing Descriptions will have short 10s timeouts in the Thing Directories and so will be automatically removed once powered off or disconnected.

## Functionality and Roles implemented
See the diagram on slide 5 "Interop Schematic Diagram - Roles and Interactions":
https://github.com/t2trg/wishi/blob/master/slides/Wishi-Interop-19022018.pdf

## For anyone participating whether hands-on or not
Describe the system components you are providing and the role performed in
your application by each component. Provide some simple diagrams as needed.
- What components of the application are you providing?
     * See the above link for diagrams...
     * Application Clients (node-wot application both consuming and exposing services)
     * Connected Things (sensors and actuators) acting as servers.   OCF devices and custom devices (camera, speech output)
     * Services (virtual devices that act as endpoints, eg servers, but are just software running on a gateway, providing services like data analysis).
     * Proxies (to provide secure HTTPS access to unsecured HTTP services available behind a NAT or firewall, specifically)
     * Thing Directory (semantic search over registered Thing Descriptions)
- What components of your application can be provided by other participants?
     * All, although the proxies require hand-configuration.
     * Other OCF devices, if available on the same network and not using security, will also be visible to my IoT REST API server (OCF CoAP/HTTP bridge service)
- Describe functions and protocols involved in the various roles:
     * HTTP or HTTPs generally.
     * CoAP is used for some OCF devices but those have HTTP bridges.
- Roles: all.
  * Connected Thing (Embedded Client)
  * Application Client
  * Proxy or other Intermediary
  * Directory

## Protocols
- Which protocols do your servers expose?
    1. HTTP(S) and CoAP(S).  The CoAP devices are however generally bridged through HTTP so I will focus on the latter.
- How are dynamic notifications on observable resources handled by your servers?
    1. CoAP will use Observe events.
    2. HTTP servers will use Long Polling on interactions marked with the appropriate "rel" category specified in the W3C WoT Thing Description.
- Which protocols does your client support?
    1. HTTP primarily.  I will use node-wot for clients, with Postman for testing.
    2. Node-wot also supports CoAP, so as a stretch goal I will look into direct interaction with OCF devices.

## Semantic Integration
- What thing types and Capabilities will be exposed by your servers?
    1. Endpoint sensors and actuators based on the OCF Smart Home: buttons, knobs, lights, motion sensors, etc. 
    2. Speech output
    3. Camera (still image grabbing)
    4. Processin (object identification)
- What interactions and data types will be exposed for each capability?
    1. JSON generally, but some devices will use JPEG input (object identification) and output (camera) as well for some interactions.
- How does the client know what things, capabilities, and interactions to look for in discovery?
    1. Things will be described using iot.schema.org capabilities in a W3C WoT Thing Description.

## Thing Directory
- What resources and services will you register?
      1. A set of OCF devices from the Smart Home demo, both actual and simulated.
- What client discovery methods will you use?
      1. Semantic queries using SPARQL on the thingweb implementation of the Thing Directory using WoT.
- How will you augment the registrations with additional context metadata
      1. Additional semantic annotation about sensory modalities for alerts; see accessibility scenarios below.
      2. If additional context information is provided by others (eg location), then for these accessibility scenarios I will want to transform it into speech.
- How will you do registration life cycle management?
      1. I intend to use timeouts on my Thing Directory registration and Thing Descriptions will be automatically generated based on OCF discovery.  Therefore, if the devices are turned on and off, they will appear/disappear in the Thing Directory (with some delay).   Of course, if is a device is turned off but the TD in the Directory has not yet expired, the TD may exist and show up in a search but the device may not respond.   The user of the services therefore needs to be able to deal with non-responding devices.
      2. I will not deal with other stages of the lifecycle, eg onboarding.
      3. Devices will automatically register with their TDirs when they are powered on.   It is assumed they have already been "onboarded" and so have knowledge of the locations of their Thing Directories.

## Intermediary/Proxy
- What protocols does your proxy consume?
    HTTP
- What protocols does your proxy expose?
    HTTPS
- What other protocols are needed to interact with your proxy?
    None.   It is pre-configured with a table of incoming and outgoing ports.   However, for the purpose of the 
    plugfest, I am considering extending it with a control API.
- How does your proxy interact with Directories for discovery of consumed things and registration of exposed things?
    It currently does not.  Registration with Directories is the responsibility of the devices themselves.
- How does your proxy remap URIs?
    It currently does not, although I may implement this feature for the plugfest.
    
I should mention I am also using another proxy, the "IoT REST API Server",
which is a standard part of an OCF gateway system.
This remaps CoAP to HTTP for bridging OCF devices (using CoAP) to HTTP.
It does not have a management API; it just scans the (local) network for OCF devices using OCF discovery mechanisms.

## Security
- What transport security methods are supported? 
   HTTPS
- What access control features are implemented? 
   HTTP basic auth and HTTP digest auth.  Stretch goal: bearer tokens and psk (self-signed certs).
- How is security material obtained and configured?
   Certificates available on publically accessible sites have been obtained through LetsEncrypt.
   Self-signed certs are also used for local HTTPS and will also be used for PSK, if implemented.
- What additional services are needed/provided such as Auth Server (AS)?
   If bearer tokens are used (stretch goal), then a simple AS will be implemented.

## Accessibility
- What Accessibility scenario(s) are being modeled?
   - I am looking at providing three services that are useful for accessibility scenarios: a speech output device
     (standalone; no external web service used), a camera, and an object identification service.  Generally, I want to 
     explore supporting the following two general scenarios with semantic markup:
         1. Search for devices that expose alerts in one sensory modality (say, visual) and remap these alerts to another sensory modality (say, auditory).   As a model problem, I intend to set up a service using an event source (implemented using a button triggering an OCF event) and a visible alert (a flashing LED) which I will search for and transform into an auditory alert (spoken description of the alert).   The target scenario would be a security system, and the button is a standin for an intrusion alert.
         2. Provide a service to identify objects and voice those identifications audibly (one could imagine this installed above a kitchen counter using a downward-facing camera in a blind person's residence)
- What alternate modes of interaction are provided by the client and application?
      Sensory modality conversion: audio to vision (for the deaf) and vice versa (for the blind).
- What are additional requirements on the Thing Directory, Server and Proxy to support your Accessibility Scenario?
      Semantic markup that identifies alerts and the sensory modalities they use.  This may also require devices to add events
      corresponding to "local" UI alerts (eg devices should not just display data and alerts their local UIs, they should make corresponding
      data available on the network interface).
