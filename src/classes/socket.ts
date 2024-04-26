import type { EventHandler } from ".";

abstract class SocketNamespace {
  abstract addEventHandler(eventHander: EventHandler): void;
  abstract listen(): void;
}

export default SocketNamespace;
