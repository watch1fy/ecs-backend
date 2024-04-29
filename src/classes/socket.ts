import type { ChatEventHandler, SyncEventHandler } from ".";

/**
 * @class
 * @abstract
 * Abstract class that acts as base class for creating
 * socketIO namespaces
 */
abstract class SocketNamespace {
  /**
   * Call this method only after adding all the event listners
   * Abstract method that will be implemented by the child class
   * @method
   * @abstract
   * @param eventHander - EventHandler Object
   */
  abstract addEventHandler(
    eventHander: ChatEventHandler | SyncEventHandler,
  ): void;

  /**
   * Call this method only after adding all the event listners
   * Abstract method that will be implemented by the child class
   * @method
   * @abstract
   */
  abstract listen(): void;
}

export default SocketNamespace;
