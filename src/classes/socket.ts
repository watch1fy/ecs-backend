import type { EventHandler } from ".";

/**
 * @class
 * @abstract
 * Abstract class that acts as base class for creating
 * socketIO namespaces
 */
abstract class SocketNamespace {
  /**
   * @method
   * @abstract
   * Abstract method that will be implemented by the child class
   * @param eventHander - EventHandler Object
   */
  abstract addEventHandler(eventHander: EventHandler): void;

  /**
   * @method
   * @abstract
   * Abstract method that will be implemented by the child class
   */
  abstract listen(): void;
}

export default SocketNamespace;
